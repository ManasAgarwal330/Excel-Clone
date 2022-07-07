// let sheetDb = [];
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let alignElements = document.querySelectorAll(".align");
let leftAlignElem = alignElements[0];
let centerAlignElem = alignElements[1];
let rightAlignElem = alignElements[2];
let fontColorElem = document.querySelector(".font-color");
let fontColorElemInp = document.querySelector(".font-color-input");
let backgroundColorElem = document.querySelector(".background-color");
let backgroundColorElemInp = document.querySelector(".background-color-input");
let fontFamilyElem = document.querySelector(".font-family");
let fontSizeElem = document.querySelector(".font-size");
let formulaBarElem = document.querySelector(".formula-bar");
let activeElem = "red";
let inactiveElem = "black";


cells.forEach((cell) => handle(cell));
function handle(cell){
  cell.addEventListener("click",function(e){
    let address = addressBarElem.value;
    handleCellPropChange(address);
  })
}

boldElem.addEventListener("click", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.bold = !cellProp.bold;
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
  boldElem.style.color = cellProp.bold ? activeElem : inactiveElem;
});

italicElem.addEventListener("click", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italicElem.style.color = cellProp.bold ? activeElem : inactiveElem;
});

underlineElem.addEventListener("click", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underlineElem.style.color = cellProp.underline ? activeElem : inactiveElem;
});

leftAlignElem.addEventListener("click", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.align = "left";
  leftAlignElem.style.color = activeElem;
  rightAlignElem.style.color = inactiveElem;
  centerAlignElem.style.color = inactiveElem;
  cell.style.textAlign = cellProp.align;
});

centerAlignElem.addEventListener("click", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.align = "center";
  leftAlignElem.style.color = inactiveElem;
  rightAlignElem.style.color = inactiveElem;
  centerAlignElem.style.color = activeElem;
  cell.style.textAlign = cellProp.align;
});

rightAlignElem.addEventListener("click", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.align = "right";
  leftAlignElem.style.color = inactiveElem;
  rightAlignElem.style.color = activeElem;
  centerAlignElem.style.color = inactiveElem;
  cell.style.textAlign = cellProp.align;
});

fontColorElemInp.addEventListener("change", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.fontColor = fontColorElemInp.value;
  cell.style.color = cellProp.fontColor;
  fontColorElem.style.color = cellProp.fontColor;
});

backgroundColorElemInp.addEventListener("change", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.backgroundColor = backgroundColorElemInp.value;
  cell.style.backgroundColor = cellProp.backgroundColor;
  backgroundColorElem.style.color = cellProp.backgroundColor === "transparent" ?"black" : cellProp.backgroundColor;
});

fontFamilyElem.addEventListener("change", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.fontFamily = fontFamilyElem.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamilyElem.value = cellProp.fontFamily;
});

fontSizeElem.addEventListener("change", function (e) {
  let [cell, cellProp] = getCellAndCellProp(addressBarElem.value);
  cellProp.fontSize = fontSizeElem.value;
  cell.style.fontSize = cellProp.fontSize + "px";
  fontFamilyElem.value = cellProp.fontSize;
});

function getCellAndCellProp(address) {
  let [rid, cid] = decodeAddress(address);
  let cellProp = sheetDb[rid][cid];
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);

  return [cell, cellProp];
}

function decodeAddress(str) {
  let row = Number(str.slice(1)) - 1;
  let col = str.charCodeAt(0) - 65;

  return [row, col];
}

function handleCellPropChange(address) {
  let [cell, cellProp] = getCellAndCellProp(address);
  boldElem.style.color = cellProp.bold ? activeElem : inactiveElem;
  italicElem.style.color = cellProp.italic ? activeElem : inactiveElem;
  underlineElem.style.color = cellProp.underline ? activeElem : inactiveElem;
  leftAlignElem.style.color =
    cellProp.align === "left" ? activeElem : inactiveElem;
  centerAlignElem.style.color =
    cellProp.align === "center" ? activeElem : inactiveElem;
  rightAlignElem.style.color =
    cellProp.align === "right" ? activeElem : inactiveElem;
  fontColorElem.style.color = cellProp.fontColor;
  backgroundColorElem.style.color = cellProp.backgroundColor === "transparent" ?"black" : cellProp.backgroundColor;
  fontFamilyElem.value = cellProp.fontFamily;
  fontSizeElem.value = cellProp.fontSize;
  formulaBarElem.value = cellProp.formula;

  cell.innerText = cellProp.value;
  cell.style.fontWeight = cellProp.bold;
  cell.style.fontStyle = cellProp.italic;
  cell.style.textDecoration = cellProp.underline;
  cell.style.textAlign = cellProp.align;
  cell.style.fontFamily = cellProp.fontFamily;
  cell.style.backgroundColor = cellProp.backgroundColor;
  cell.style.color = cellProp.fontColor;
  cell.style.fontSize = cellProp.fontSize;
}
