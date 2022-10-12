let borderInputs = [];
document.querySelectorAll("input[type=range]").forEach((range) => {
  if (!(range.id == "width" || range.id == "height")) {
    borderInputs.push(range);
  }
});

const code = document.querySelector(".code");
const height = document.querySelector(".height");
const width = document.querySelector(".width");
let root = window.getComputedStyle(document.documentElement);
let rotation = 0;

let heightInput = document.getElementById('height');
let widthInput = document.getElementById('width');

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
borderInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    updateRadius(input, index, e.target.value);
  });
});

height.innerHTML = "height: " + root.getPropertyValue("--height");
heightInput.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--height", e.target.value + 'px');
  heightInput.setAttribute("data-value", e.target.value + "px");
  height.innerHTML = "height: " + root.getPropertyValue("--height");
});

width.innerHTML = "width: " + root.getPropertyValue("--width");
widthInput.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--width", e.target.value + 'px');
  widthInput.setAttribute("data-value", e.target.value + "px");
  width.innerHTML = "width: " + root.getPropertyValue("--width");
});

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
 * Calculates and applies a rotation to the randomize icon
 */
function handleRotation() {
  rotation ? rotation = 0 : rotation = 180;
  document.getElementById('casino').style.transform = `rotate(${rotation}deg)`;
  document.getElementById('casino').style.transition = '.5s ease';
}

/**
 * Generates a random integer between 20 and 90, ideal
 * values to maintain a somewhat organic shape
 * @returns integer
 */
function getRandomValue() {
  return Math.floor(Math.random() * (90 - 20) + 20);
}