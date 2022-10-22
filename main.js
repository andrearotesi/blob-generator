/**
 * Collection of border range inputs
 */
let borderInputs = document.querySelectorAll('input[type=range]');

/**
 * Generated CSS on page
 */
const bordersCopy = document.querySelector('.code');

let root = window.getComputedStyle(document.documentElement);

let rotation = 0;

let radius = [
  root.getPropertyValue('--radius-1'),
  root.getPropertyValue('--radius-2'),
  root.getPropertyValue('--radius-3'),
  root.getPropertyValue('--radius-4'),
  '/ ' + root.getPropertyValue('--radius-5'),
  root.getPropertyValue('--radius-6'),
  root.getPropertyValue('--radius-7'),
  root.getPropertyValue('--radius-8')
];

updateText();
borderInputs.forEach((input, index) => {
  input.addEventListener('input', (e) => {
    updateRadius(input, index, e.target.value);
  });
});

document.getElementById('blob').style.transition = '.75s ease';

/**
 * Updates all inputs with a random value
 */
function randomizeBlob() {
  handleRotation();
  borderInputs.forEach((input, index) => {
    input.value = getRandomValue();
    updateRadius(input, index, input.value);
  });
}

/**
 * Updates border radiuses and refreshes the code
 * @param input actual slider
 * @param index index of the slider
 * @param value slider value
 */
 function updateRadius(input, index, value) {
  document.documentElement.style.setProperty('--radius-' + (index + 1), value + '%');
  input.setAttribute('data-value', value + '%');
  if (index === 4) {
    radius[index] = '/ ' + value + '%';
  } else {
    radius[index] = value + '%';
  }
  updateText();
}

/**
 * Calculates and applies a rotation to the randomize icon
 */
function handleRotation() {
  rotation ? rotation = 0 : rotation = 180;
  document.getElementById('casino').style.transform = `rotate(${rotation}deg)`;
  document.getElementById('casino').style.transition = '.5s ease';
}

/**
 * Generates a random integer to use as a radius value
 * @returns integer
 */
function getRandomValue() {
  return Math.floor(Math.random() * (100 - 1) + 1);
}

function updateText() {
  bordersCopy.innerHTML = 'border-radius: ' + radius.join(' ') + ';';
}

/**
 * Copies the generated CSS to clipboard
 */
function copyToClipboard() {
  navigator.clipboard.writeText(
    '.blob {' 
    + bordersCopy.innerHTML + '\n'
    + '}'
  );
  document.getElementById('copy').innerHTML = 'copied!';
  setTimeout(() => {
    document.getElementById('copy').innerHTML = 'copy to clipboard';
  }, 1000);
}