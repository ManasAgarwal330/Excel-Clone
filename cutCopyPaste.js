let cutBtn = document.querySelector(".cut");
let copyBtn = document.querySelector(".copy");
let pasteBtn = document.querySelector(".paste");

let ctrKey = false;

document.addEventListener("keydown", (e) => {
  ctrKey = e.ctrlKey;
});

document.addEventListener("keyup", (e) => {
  ctrKey = e.ctrlKey;
});

let storage = [];
cells.forEach((cell) => {
  handleCell(cell);
});

function handleCell(cell) {
  cell.addEventListener("click", function (e) {
    if (!ctrKey) return;
    if (storage.length >= 2) {
      removeSelectedCellsBorder();
      storage = [];
    }
    let row = Number(cell.getAttribute("rid"));
    let col = Number(cell.getAttribute("cid"));

    cell.style.border = "2px solid #218c74";
    storage.push([row, col]);
  });
}

function removeSelectedCellsBorder() {
  for (let i = 0; i < storage.length; i++) {
    let cell = document.querySelector(
      `.cell[rid="${storage[i][0]}"][cid="${storage[i][1]}"]`
    );
    cell.style.border = "1px solid lightgrey";
  }
}

let copy = [];
copyBtn.addEventListener("click", function (e) {
  if (storage.length !== 2) return;
  copy = [];
  let sr = Math.min(storage[0][0], storage[1][0]);
  let sc = Math.min(storage[0][1], storage[1][1]);
  let er = Math.max(storage[0][0], storage[1][0]);
  let ec = Math.max(storage[0][1], storage[1][1]);

  for (let i = sr; i <= er; i++) {
    let row = [];
    for (let j = sc; j <= ec; j++) {
      let cellProp = sheetDb[i][j];
      row.push(cellProp);
    }
    copy.push(row);
  }
});

cutBtn.addEventListener("click", function (e) {
  if (storage.length !== 2) return;
  copy = [];
  let sr = Math.min(storage[0][0], storage[1][0]);
  let sc = Math.min(storage[0][1], storage[1][1]);
  let er = Math.max(storage[0][0], storage[1][0]);
  let ec = Math.max(storage[0][1], storage[1][1]);

  for (let i = sr; i <= er; i++) {
    let row = [];
    for (let j = sc; j <= ec; j++) {
      let cellObj = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      row.push(JSON.parse(JSON.stringify(sheetDb[i][j])));
      sheetDb[i][j].bold = false;
      sheetDb[i][j].italic = false;
      sheetDb[i][j].underline = false;
      sheetDb[i][j].fontColor = "#000000";
      sheetDb[i][j].fontSize = "14";
      sheetDb[i][j].align = "left";
      sheetDb[i][j].fontFamily = "monospace";
      sheetDb[i][j].backgroundColor = "transparent";
      sheetDb[i][j].value = "";

      cellObj.click();
    }
    copy.push(row);
  }
  removeSelectedCellsBorder();
});

pasteBtn.addEventListener("click", function (e) {
  let address = addressBarElem.value;
  let [cell, cellProp] = getCellAndCellProp(address);
  let rowDiff = Math.abs(storage[0][0] - storage[1][0]);
  let colDiff = Math.abs(storage[0][1] - storage[1][1]);
  let [sr, sc] = [
    Number(cell.getAttribute("rid")),
    Number(cell.getAttribute("cid")),
  ];


  for (let i = sr, r = 0; r <= rowDiff; i++, r++) {
    for (let j = sc, c = 0; c <= colDiff; j++, c++) {
      if (i >= sheetDb.length || j >= sheetDb[0].length) continue;
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

      let cellObj = sheetDb[i][j];
      let copyObj = copy[r][c];
      cellObj.bold = copyObj.bold;
      cellObj.italic = copyObj.italic;
      cellObj.underline = copyObj.underline;
      cellObj.fontColor = copyObj.fontColor;
      cellObj.fontSize = copyObj.fontSize;
      cellObj.align = copyObj.align;
      cellObj.fontFamily = copyObj.fontFamily;
      cellObj.backgroundColor = copyObj.backgroundColor;
      cellObj.value = copyObj.value;

      cell.click();
    }
  }
  removeSelectedCellsBorder();
});
