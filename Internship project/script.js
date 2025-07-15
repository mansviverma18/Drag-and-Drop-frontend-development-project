const canvas = document.getElementById("canvas");
const editor = document.getElementById("editor");
const form = document.getElementById("editForm");
let selectedElement = null;

const contentInput = document.getElementById("content");
const fontSizeInput = document.getElementById("fontSize");
const colorInput = document.getElementById("color");
const fontFamilyInput = document.getElementById("fontFamily");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");

const boldCheckbox = document.getElementById("bold");
const italicCheckbox = document.getElementById("italic");
const underlineCheckbox = document.getElementById("underline");

document.querySelectorAll('.draggable').forEach(elem => {
  elem.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('type', e.target.dataset.type);
  });
});

canvas.addEventListener('dragover', e => e.preventDefault());

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  let newElem;

  switch(type) {
    case 'text':
      newElem = document.createElement('p');
      newElem.textContent = "Editable Text";
      newElem.style.fontSize = "16px";
      newElem.style.fontWeight = "normal";
      newElem.style.fontStyle = "normal";
      newElem.style.textDecoration = "none";
      newElem.style.fontFamily = "Arial";
      break;
    case 'image':
      newElem = document.createElement('img');
      newElem.src = "https://tse3.mm.bing.net/th/id/OIP.rP8rVBHbib26vSd5owGD4gHaEo?pid=Api&P=0&h=220";
      newElem.style.width = "100px";
      break;
    case 'button':
      newElem = document.createElement('button');
      newElem.textContent = "Click Me";
      newElem.style.display = "block";
      newElem.style.margin = "0 auto";
      break;
  }

  newElem.style.margin = "10px 0"; 
  newElem.style.cursor = "pointer";
  newElem.addEventListener('click', () => openEditor(newElem));
  canvas.appendChild(newElem);
  document.querySelector(".placeholder")?.remove();
});

function openEditor(elem) {
  selectedElement = elem;
  editor.style.display = 'block';

  const computedStyle = window.getComputedStyle(elem);

  contentInput.value = elem.tagName === 'IMG' ? elem.src : elem.textContent;
  fontSizeInput.value = parseInt(computedStyle.fontSize) || 16;
  colorInput.value = elem.style.color || '#000000';

  if (elem.tagName !== 'IMG') {
    fontFamilyInput.value = computedStyle.fontFamily.replace(/["']/g, "").split(",")[0];
    boldCheckbox.checked = computedStyle.fontWeight === "700" || computedStyle.fontWeight === "bold";
    italicCheckbox.checked = computedStyle.fontStyle === "italic";
    underlineCheckbox.checked = computedStyle.textDecorationLine.includes("underline");
  }

  const isImage = elem.tagName === 'IMG';
  document.getElementById('widthLabel').style.display = isImage ? 'block' : 'none';
  document.getElementById('heightLabel').style.display = isImage ? 'block' : 'none';

  if (isImage) {
    widthInput.value = parseInt(elem.style.width) || elem.naturalWidth;
    heightInput.value = parseInt(elem.style.height) || elem.naturalHeight;
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!selectedElement) return;

  if (selectedElement.tagName === 'IMG') {
    selectedElement.src = contentInput.value;
    selectedElement.style.width = widthInput.value + "px";
    selectedElement.style.height = heightInput.value + "px";
  } else {
    selectedElement.textContent = contentInput.value;

    // Apply styles individually
    selectedElement.style.fontWeight = boldCheckbox.checked ? "bold" : "normal";
    selectedElement.style.fontStyle = italicCheckbox.checked ? "italic" : "normal";
    selectedElement.style.textDecoration = underlineCheckbox.checked ? "underline" : "none";

    selectedElement.style.fontFamily = fontFamilyInput.value;
  }

  selectedElement.style.fontSize = fontSizeInput.value + "px";
  selectedElement.style.color = colorInput.value;
});
