// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const path = require('node:path');
const generateBMFont = require('msdf-bmfont-xml');
const fs = require('fs');


// Define the opt object
const opt = {
    charset_path: 'charsets/eascii.txt',
    fieldType: 'msdf',
    fontSize: 80, // Initialize with initial value
    textureSize: [512,512], // Initialize with initial value
    distanceRange: 4, // Initialize with initial value
    texturePadding: 4 // Initialize with initial value
  };

  generateBMFont(path.join(__dirname, 'ALLEGRON.TTF'), opt, (error, textures, font) => {
    if (error) {
        console.error('Error generating bitmap font:', error);
        return;
    }

    // Write the texture spritesheet to disk
    textures.forEach((texture, index) => {
        const filename = texture.filename + '.png';
        fs.writeFileSync(filename, texture.texture);
    });

    // Write the BMFont data to disk
    fs.writeFileSync(font.filename, font.data);

    console.log('Bitmap font generated successfully!');
});