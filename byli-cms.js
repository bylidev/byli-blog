const sharp = require('sharp');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

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
  const requiredAttributes = ['title', 'author', 'route', 'thumb', 'year', 'tags'];

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
    typeof jsonObj.year !== 'number' ||
    !Array.isArray(jsonObj.tags)
  ) {
    throw new Error(`Invalid JSON object: ${jsonObj}`);
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
  data.time = 2; // todo: get time from md

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

  for (const fileData of fileDataArray) {
    const { data, filePath, uuid, route, fileContent } = fileData;

    idx_all[route] = data;

    // Create index by tags
    for (const tag of data.tags) {
      if (!idxByTags[tag]) {
        idxByTags[tag] = {};
      }
      idxByTags[tag][route] = data;
    }

    // Copy the clean Markdown content to another directory
    const cleanMdContent = matter(fileContent).content.replace(/\(\.\/images/g, '(' + imagesDir.replace('./src', ''));
    const cleanMdFilePath = path.join(entryPath, uuid);
    await fs.ensureFile(cleanMdFilePath);
    await fs.writeFile(cleanMdFilePath, cleanMdContent, 'utf8');
  }

  const uuid = uuidv4();
  menuTags['home'] = idxTagFilePath.replace('{uuid}', uuid).replace('./src', '');
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

      for (const size of sizes) {
        const newImagePath = path.join(outputDirectory, prefix + file);

        try {
          await sharp(imagePath).resize(size).toFile(newImagePath);
          console.log(`${newImagePath} generated successfully.`);
        } catch (error) {
          console.error(`Error generating ${size}px image:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading image directory:', error);
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