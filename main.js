const rangeInputs = document.querySelectorAll("input[type=range]");
const code = document.querySelector(".code");
let root = window.getComputedStyle(document.documentElement);
let rotation = 0;

let radius = [
  root.getPropertyValue("--radius-1"),
  root.getPropertyValue("--radius-2"),
  root.getPropertyValue("--radius-3"),
  root.getPropertyValue("--radius-4"),
  "/ " + root.getPropertyValue("--radius-5"),
  root.getPropertyValue("--radius-6"),
  root.getPropertyValue("--radius-7"),
  root.getPropertyValue("--radius-8")
];

code.innerHTML = "border-radius: " + radius.join(' ') + ";";
rangeInputs.forEach((el, index) => {
  el.addEventListener("input", (e) => {
    updateRadius(el, index, e.target.value);
  });
});

function updateRadius(input, index, value) {
  document.documentElement.style.setProperty("--radius-" + (index + 1), value + "%");
  input.setAttribute("data-value", value + "%");
  if (index === 4) {
    radius[index] = "/ " + value + "%";
  } else {
    radius[index] = value + "%";
  }
  code.innerHTML = "border-radius: " + radius.join(' ') + ";";
}

/**
 * Updates all inputs with a random value
 */
function randomizeBlob() {
  handleRotation();
  rangeInputs.forEach((input, index) => {
    updateRadius(input, index, getRandomValue());
  });
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
 * Generates a random integer between 20 and 90, ideal
 * values to maintaine a somewhat organic shape
 * @returns integer
 */
function getRandomValue() {
  return Math.floor(Math.random() * (90 - 20) + 20);
}