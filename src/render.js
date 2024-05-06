//modules
//const electron = require('electron');
//const ipcMain = electron.ipcMain;
//const generateBMFont = require('msdf-bmfont-xml');
//const fs = require('fs');

//options
const form = document.getElementById('myForm');

// Define the opt object
const opt = {
    charset_path: 'charsets/eascii.txt',
    fieldType: 'msdf',
    fontSize: form.elements['FontSize'].value, // Initialize with initial value
    textureSize: [form.elements['TextureSize'].value, form.elements['TextureSize'].value], // Initialize with initial value
    distanceRange: form.elements['DistanceRange'].value, // Initialize with initial value
    texturePadding: form.elements['TexturePadding'].value // Initialize with initial value
};

// Function to log the opt object
function logOpt() {
    console.log('opt updated:', opt);
}

// Add event listener to the form's input event
form.addEventListener('input', () => {
    // Update opt properties based on form inputs
    opt.fontSize = form.elements['FontSize'].value;
    opt.textureSize = [form.elements['TextureSize'].value, form.elements['TextureSize'].value];
    opt.distanceRange = form.elements['DistanceRange'].value;
    opt.texturePadding = form.elements['TexturePadding'].value;

    // Log the updated opt object to the console
    logOpt();
});


