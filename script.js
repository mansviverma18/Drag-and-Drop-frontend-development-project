const canvas = document.getElementById("canvas");
const editor = document.getElementById("editor");
const form = document.getElementById("editForm");
let selectedElement = null;

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
      break;
    case 'image':
      newElem = document.createElement('img');
      newElem.src = "https://tse3.mm.bing.net/th?id=OIP.oio3iON25wMggu1fbXExYwAAAA&pid=Api&P=0&h=220";
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
  form.content.value = elem.tagName === 'IMG' ? elem.src : elem.textContent;
  form.fontSize.value = parseInt(window.getComputedStyle(elem).fontSize) || 16;
  form.color.value = elem.style.color || '#000000';
  const isImage = elem.tagName === 'IMG';
  document.getElementById('widthLabel').style.display = isImage ? 'block' : 'none';
  document.getElementById('heightLabel').style.display = isImage ? 'block' : 'none';

  if (isImage) {
    form.width.value = parseInt(elem.style.width) || elem.naturalWidth;
    form.height.value = parseInt(elem.style.height) || elem.naturalHeight;
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!selectedElement) return;

  if (selectedElement.tagName === 'IMG') {
    selectedElement.src = form.content.value;
    selectedElement.style.width = form.width.value + "px";
    selectedElement.style.height = form.height.value + "px";
  } else {
    selectedElement.textContent = form.content.value;
  }

  selectedElement.style.fontSize = `${form.fontSize.value}px`;
  selectedElement.style.color = form.color.value;
});

