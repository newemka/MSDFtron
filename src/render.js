const form = document.getElementById('myForm');
const font = document.querySelector('#font');
const filename = document.querySelector('#filename');
const outputPath = document.querySelector('#output-path');
//options

const fontSize = document.querySelector('#FontSize');
const distanceRange = document.querySelector('#DistanceRange');
const texturePadding = document.querySelector('#TexturePadding');
const textureSize = document.querySelector('#TextureSize');

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

// send Font data to main
function sendFont(e) {
    
    e.preventDefault();
    const fontSizeValue = fontSize.value;
    const fontPath = font.files[0].path;
    const distanceRangeValue = distanceRange.value;
    const texturePaddingValue = texturePadding.value;
    const textureSizeValue = [+textureSize.value,+textureSize.value];
    //Send to main using ipcRenderer
    ipcRenderer.send('font:convert', {
        fontPath,
        fontSize: fontSizeValue,
        distanceRange: +distanceRangeValue, 
        texturePadding: +texturePaddingValue,
        textureSize: textureSizeValue,

    });

};

// Make sure it's a font file
function isFileFont(file){
    const acceptedFontTypes = ['font/ttf'];
    return file && acceptedFontTypes.includes(file['type']);
}

font.addEventListener("change", loadFont);

   
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// Function to log the opt object
function logOpt() {
    console.log('opt updated:', fontSize);
}

// Form submit listener
form.addEventListener('submit', sendFont); 

