const rangeInputs = document.querySelectorAll("input[type=range]");
const code = document.querySelector(".code");
let root = window.getComputedStyle(document.documentElement);

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
  rangeInputs.forEach((input, index) => {
    updateRadius(input, index, getRandomValue());
  });
}

/**
 * Generates a random integer between 1 and 100
 * @returns integer
 */
function getRandomValue() {
  return Math.floor(Math.random() * (100 - 1));
}