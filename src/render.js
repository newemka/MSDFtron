const form = document.getElementById('myForm');
const intro = document.getElementById('intro');
const font = document.querySelector('#font');
const filename = document.querySelector('#filename');
const outputfolder = document.querySelector('#outputfolder');

const container = document.getElementById('container');

const convertBtn = document.getElementById('convertbtn');


const charedit = document.querySelector('#charedit');
const fileSelect = document.getElementById('fileSelect');
const loadFileBtn = document.getElementById('loadFileBtn');

//options
const fontSize = document.querySelector('#FontSize');
const distanceRange = document.querySelector('#DistanceRange');
const texturePadding = document.querySelector('#TexturePadding');
const textureSize = document.querySelector('#TextureSize');

// Assume you have a reference to the HTML element where you want to display the message
const messageElement = document.getElementById('message');
const elemI = document.querySelector("#FeedBack");
const feedbackStyle = 'selected';
const noneStyle = 'noStyle';


function handleFileSelection() {
    const selectedFile = fileSelect.value;
    charsetter.char(selectedFile).then(content => {
        console.log(content);
        charedit.value = content;
    }).catch(error => {
        console.error('Error fetching file content:', error);
        charedit.value = '';
    });
};

document.addEventListener('DOMContentLoaded', handleFileSelection);
fileSelect.addEventListener('change', handleFileSelection);


function loadFont(e) {
    const file = e.target.files[0];
    const filePath = file.path;
    // Extract folder path from file path
    const folderPath = font.files[0].path;


    console.log(filePath + ' loaded');
    container.style.visibility = 'visible';
    intro.style.display = 'none';
    filename.innerHTML = file.name;
    outputfolder.innerHTML = path.dirname(file.path); // Extract folder path from file path
    elemI.className = feedbackStyle;
    elemI.innerHTML = 'Font selected ✓';
    // Set a timer to remove the feedback after 5 seconds
    setTimeout(() => {
        elemI.className = noneStyle;
    }, 3100);
}

// send Font data to main
function sendFont(e) {

    e.preventDefault();
    const charsetpathvalue = charedit.value;
    const fontSizeValue = fontSize.value;
    const fontPath = font.files[0].path;
    const distanceRangeValue = distanceRange.value;
    const texturePaddingValue = texturePadding.value;
    const textureSizeValue = [+textureSize.value, +textureSize.value];
    //Send to main using ipcRenderer
    ipcRenderer.send('font:convert', {

        fontPath,
        charset: charsetpathvalue,
        fontSize: fontSizeValue,
        distanceRange: +distanceRangeValue,
        texturePadding: +texturePaddingValue,
        textureSize: textureSizeValue,

    });

};

// Make sure it's a font file
function isFileFont(file) {
    const acceptedFontTypes = ['font/ttf'];
    return file && acceptedFontTypes.includes(file['type']);
}

font.addEventListener("change", loadFont);


const information = document.getElementById('info');

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// Function to log the opt object
function logOpt() {
    console.log('opt updated:', fontSize);
}

// Form submit listener
convertBtn.addEventListener('click', sendFont);

window.indexBridge.somethinghappened((event, feedback, feedbackStyle) => {
    elemI.className = feedbackStyle;
    elemI.innerHTML = feedback;

})
