const sharp = require('sharp');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const { create, fragment } = require('xmlbuilder2');
const imgSrc = './cms/images';
const mdPath = './cms';

const imagesDir = './src/assets/blog/images';
const entryPath = './src/assets/blog';
const idxTagFilePath = './src/assets/blog/{uuid}.json';
const menuByTags = './src/assets/blog/menu.json';

/**
 * Clean script.
 */
async function purge() {
  try {
    await fs.emptyDir(entryPath);
    await fs.mkdir(imagesDir, { recursive: true });
    console.log(`Directory ${entryPath} successfully emptied.`);
    console.log(`Directory ${imagesDir} successfully created`);
  } catch (error) {
    console.error('Error emptying directories:', error);
  }
}

/**
 * Metadata extractor.
 */
function getMarkdownFiles(mdPath) {
  return fs.readdirSync(mdPath).filter(file => path.extname(file) === '.md');
}

function validateJson(jsonObj) {
  const requiredAttributes = ['title', 'author', 'route', 'thumb', 'date', 'tags'];
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para validar el formato yyyy-mm-dd

  for (const attribute of requiredAttributes) {
    if (!(attribute in jsonObj)) {
      throw new Error(`Missing required attribute: ${attribute}`);
    }
  }

  if (
    typeof jsonObj.title !== 'string' ||
    typeof jsonObj.author !== 'string' ||
    typeof jsonObj.route !== 'string' ||
    typeof jsonObj.thumb !== 'string' ||
    typeof jsonObj.date !== 'string' ||
    !dateRegex.test(jsonObj.date) || // Validar el formato de la fecha
    !Array.isArray(jsonObj.tags)
  ) {
    throw new Error(`Invalid JSON object: ${JSON.stringify(jsonObj)}`);
  }

  console.log('JSON object is valid.');
}

async function processFile(filePath, imagesDir, entryPath) {
  const fileContent = await fs.readFile(filePath, 'utf8');
  const { data } = matter(fileContent);
  validateJson(data);

  data.thumb = path.join(imagesDir.replace('./src', ''), 'thumb_' + data.thumb);
  const uuid = uuidv4();
  data.md = path.join(entryPath.replace('./src', ''), uuid);
  data.time = Math.ceil(fileContent.length/1000); // todo: get time from md

  const route = data.route;
  data.route = undefined;

  return {
    data,
    filePath,
    uuid,
    route,
    fileContent,
  };
}

async function processMarkdownFiles(mdPath, imagesDir, entryPath) {
  const fileNames = getMarkdownFiles(mdPath);
  const processingPromises = fileNames.map(fileName =>
    processFile(path.join(mdPath, fileName), imagesDir, entryPath)
  );
  return Promise.all(processingPromises);
}

async function createManifest(fileDataArray, idxTagFilePath) {
  const idx_all = {};
  const idxByTags = {};
  const menuTags = {};

  // Ordenar el arreglo fileDataArray por fecha de creación descendente
  const sortedFileDataArray = fileDataArray.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);
    return dateB - dateA;
  });

  for (const fileData of sortedFileDataArray) {
    const { data, filePath, uuid, route, fileContent } = fileData;

    idx_all[route] = data;

    // Crear índice por tags
    for (const tag of data.tags) {
      if (!idxByTags[tag]) {
        idxByTags[tag] = {};
      }
      idxByTags[tag][route] = data;
    }

    // Copiar el contenido Markdown limpio a otro directorio
    const cleanMdContent = matter(fileContent).content.replace(/\(\.\/images/g, '(' + imagesDir.replace('./src', ''));
    const cleanMdFilePath = path.join(entryPath, uuid);
    await fs.ensureFile(cleanMdFilePath);
    await fs.writeFile(cleanMdFilePath, cleanMdContent, 'utf8');
  }

  await createSitemapWithKeywords(idx_all);

  const uuid = uuidv4();
  menuTags['all'] = idxTagFilePath.replace('{uuid}', uuid).replace('./src', '');
  const jsonData = JSON.stringify(idx_all, null, 2);
  await fs.writeFile(idxTagFilePath.replace('{uuid}', uuid), jsonData, 'utf8');
  console.log(`JSON file ${idxTagFilePath} created successfully.`);
  for (const tag of Object.keys(idxByTags)) {
    const uuid = uuidv4();
    menuTags[tag] = idxTagFilePath.replace('{uuid}', uuid).replace('./src', '');
    const jsonData = JSON.stringify(idxByTags[tag], null, 2);
    await fs.writeFile(idxTagFilePath.replace('{uuid}', uuid), jsonData, 'utf8');
    console.log(`JSON file ${idxTagFilePath.replace('{uuid}', uuid)} created successfully.`);
  }

  const jsonDataMenu = JSON.stringify(menuTags, null, 2);
  await fs.writeFile(menuByTags, jsonDataMenu, 'utf8');
  console.log(`JSON file ${menuByTags} created successfully.`);
}
/**
 * Image processing script.
 */
async function processImageDirectory(directory, outputDirectory, sizes, prefix = '') {
  try {
    const files = await fs.readdir(directory);

    for (const file of files) {
      const imagePath = path.join(directory, file);
      const imageInfo = await sharp(imagePath).metadata();
      const originalWidth = imageInfo.width;

      for (const size of sizes) {
        const newImagePath = path.join(outputDirectory, prefix + file);

        if (originalWidth > size) {
          try {
            await sharp(imagePath).resize(size).toFile(newImagePath);
            console.log(`${newImagePath} generated successfully.`);
          } catch (error) {
            console.error(`Error generating ${size}px image:`, error);
          }
        } else {
          try {
            const backgroundColor = { r: 0, g: 0, b: 0, alpha: 0 }; // Fondo transparente
            await sharp({
              create: {
                width: size,
                height: imageInfo.height,
                channels: 4, // RGBA
                background: backgroundColor
              }
            }).composite([{ input: imagePath, gravity: 'center' }])
              .png()
              .toFile(newImagePath);
            console.log(`${newImagePath} with transparent background generated successfully.`);
          } catch (error) {
            console.error(`Error generating ${size}px image with transparent background:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading image directory:', error);
  }
}
/**
 * Site.xml generation.
 */
async function createSitemapWithKeywords(urlObjectMap) {
  const xml = create({ encoding: 'UTF-8' }).ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  for (const [route, obj] of Object.entries(urlObjectMap)) {
    const { title, author, thumb, date, tags } = obj;
    const loc = `https://byli.dev/${route}`; // Reemplaza 'example.com' con tu dominio real o URL base
    const lastmod = date; // Asignamos la fecha de última modificación directamente

    const urlElement = xml.ele('url');
    urlElement.ele('loc').txt(loc);
    urlElement.ele('lastmod').txt(lastmod);

    if (tags && tags.length > 0) {
      const keywordsElement = urlElement.ele('keywords');
      for (const tag of tags) {
        keywordsElement.ele('keyword').txt(tag);
      }
    }

    if (title) {
      urlElement.ele('title').txt(title);
    }

    if (author) {
      urlElement.ele('author').txt(author);
    }

    if (thumb) {
      urlElement.ele('thumb').txt(thumb);
    }
  }

  const sitemapContent = xml.end({ prettyPrint: true });

  try {
    await fs.writeFile('./src/sitemap.xml', sitemapContent, 'utf8');
    console.log('Sitemap file "sitemap.xml" created successfully.');
  } catch (error) {
    console.error('Error creating sitemap:', error);
  }
}
/**
 * Byli CMS builder.
 */
async function buildCMS() {
  try {
    await purge();
    await processImageDirectory(imgSrc, imagesDir, [250, 200], 'thumb_');
    await processImageDirectory(imgSrc, imagesDir, [800]);
    const fileDataArray = await processMarkdownFiles(mdPath, imagesDir, entryPath);
    await createManifest(fileDataArray, idxTagFilePath);
  } catch (error) {
    console.error('Error building Byli CMS:', error);
  }
}

buildCMS();