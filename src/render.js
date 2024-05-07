const form = document.getElementById('myForm');
const font = document.querySelector('#font');
const filename = document.querySelector('#filename');
const outputPath = document.querySelector('#output-path');
//options


// Define the opt object
//textureSize: [form.elements['TextureSize'].value, form.elements['TextureSize'].value], // Initialize with initial value
const opt = {
    charset_path: 'charsets/eascii.txt',
    fieldType: 'msdf',
    fontSize: form.elements['FontSize'].value, // Initialize with initial value
    textureSize: [form.elements['TextureSize'], form.elements['TextureSize'].value],
    distanceRange: form.elements['DistanceRange'].value, // Initialize with initial value
    texturePadding: form.elements['TexturePadding'].value // Initialize with initial value
};

function loadFont(e) {
    const file = e.target.files[0];

   /*  if (!isFileFont(file)) {
        console.log('Please select a font');
        return;
    } */

    console.log(file + 'Success');
    form.style.display = 'block';
    filename.innerHTML = font.files[0].path ; 
    outputPath.innerText = path.join(os.homedir(), 'MsdfFonts')

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

// send Font data to main
function sendFont(e) {
    e.preventDefault();

    const fontPath = font.files[0].path;

    //Send to main using ipcRenderer
    ipcRenderer.send('font:convert', {
        fontPath,
        opt

    })
};

// Make sure it's a font file
function isFileFont(file){
    const acceptedFontTypes = ['font/ttf'];
    return file && acceptedFontTypes.includes(file['type']);
}

font.addEventListener("change", loadFont);




   
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`


document.getElementById('generateButton').addEventListener('click', () =>
{
    electronAPI.generateMsdf();
});



// Function to log the opt object
function logOpt() {
    console.log('opt updated:', opt);
}



// Form submit listener
form.addEventListener('submit', sendFont); 

