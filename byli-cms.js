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
    // Empty the thumbnail image directory
    await fs.emptyDir(entryPath);
    fs.mkdir(imagesDir, { recursive: true }, (error) => {
      if (error) {
        console.error('Error creating directories:', error);
      } else {
        console.log(`Directory ${imagesDir} successfully created`);
      }
    });
    console.log(`Directory ${entryPath} successfully emptied.`);
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
function createManifest(fileNames, metadataFilePath) {
  function validateJson(jsonObj) {
    const requiredAttributes = [
      'title',
      'author',
      'route',
      'thumb',
      'year',
      'tags'
    ];
  
    for (const attribute of requiredAttributes) {
      if (!(attribute in jsonObj)) {
        throw new Error(`Missing required attribute: ${attribute}`);
      }
    }
  
    if (typeof jsonObj.title !== 'string' ||
        typeof jsonObj.author !== 'string' ||
        typeof jsonObj.route !== 'string' ||
        typeof jsonObj.thumb !== 'string' ||
        typeof jsonObj.year !== 'number' ||
        !Array.isArray(jsonObj.tags)) {
      throw new Error(`Invalid JSON object: ${jsonObj}`);
    }
  
    console.log('JSON object is valid.');
  }
  const idx_all = {};
  const idxByTags = {};
  const menuTags = {};
  // Loop through each Markdown file and extract YAML metadata
  fileNames.forEach(fileName => {
    const filePath = path.join(mdPath, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    validateJson(data);
    data.thumb = imagesDir.replace('./src','') +'/thumb_' + data.thumb;
    const uuid = uuidv4();
    data.md = entryPath.replace('./src','') + '/' + uuid;
    data.time= 2; //todo get time from md
    const route = data.route;
    data.route = undefined;
    idx_all[route] = data;

    // Create index by tags
    data.tags.forEach(tag => {
      if (!idxByTags[tag]) {
        idxByTags[tag] = {};
      }
      idxByTags[tag][route] = data;
    });

    // Copy the clean Markdown content to another directory
    const cleanMdContent = matter(fileContent).content.replace(/\(\.\/images/g, '('+imagesDir.replace('./src', ''));
    const cleanMdFilePath = path.join(entryPath, uuid);
    fs.ensureFileSync(cleanMdFilePath);
    fs.writeFileSync(cleanMdFilePath, cleanMdContent, 'utf8');
  });

  //create all content
  const uuid = uuidv4();
  menuTags['all'] = idxTagFilePath.replace('{uuid}', uuid).replace('./src','');
  const jsonData = JSON.stringify(idx_all, null, 2);
  fs.writeFileSync(idxTagFilePath.replace('{uuid}',uuid), jsonData, 'utf8');
  console.log(`JSON file ${idxTagFilePath} created successfully.`);

  //create tags
  Object.keys(idxByTags).forEach(tag => {
    const uuid = uuidv4();
    menuTags[tag] = idxTagFilePath.replace('{uuid}', uuid).replace('./src','');

    const jsonData = JSON.stringify(idxByTags[tag], null, 2);
    fs.writeFileSync(idxTagFilePath.replace('{uuid}', uuid), jsonData, 'utf8');
    console.log(`JSON file ${idxTagFilePath.replace('{uuid}', uuid)} created successfully.`);
  });
  //create menu.json
  const jsonDataMenu = JSON.stringify(menuTags, null, 2);
  fs.writeFileSync(menuByTags, jsonDataMenu, 'utf8');
  console.log(`JSON file ${menuByTags} created successfully.`);
}
/**
 * Image processing script.
 */
function processImageDirectory(directory, outputDirectory, sizes, prefix = '') {
  fs.readdir(directory, (error, files) => {
    if (error) {
      console.error('Error reading image directory:', error);
      return;
    }

    files.forEach((file) => {
      const imagePath = `${directory}/${file}`;

      sizes.forEach((size) => {
        const newImagePath = `${outputDirectory}/${prefix}${file}`;

        sharp(imagePath)
          .resize(size)
          .toFile(newImagePath, (error) => {
            if (error) {
              console.error(`Error generating ${size}px image:`, error);
            } else {
              console.log(`${newImagePath} generated successfully.`);
            }
          });
      });
    });
  });
}

/**
 * Byli CMS builder.
 */
purge().then(() => {
  processImageDirectory(imgSrc, imagesDir, [250, 200], 'thumb_');
  processImageDirectory(imgSrc, imagesDir, [800]);
  createManifest(getMarkdownFiles(mdPath), idxTagFilePath);
});