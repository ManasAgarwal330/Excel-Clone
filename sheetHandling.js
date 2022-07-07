let sheetAddElem = document.querySelector(".sheet-icon");
let sheetContElem = document.querySelector(".sheet-folder-cont");
let sheetStorage = [];
let graphDbStorage = [];
let sheetDb = [];
let graphStorage = [];

sheetAddElem.addEventListener("click", function (e) {
  let divElem = document.createElement("div");
  divElem.setAttribute("class", "sheet");
  let sheets = document.querySelectorAll(".sheet");
  divElem.setAttribute("id", sheets.length);
  divElem.innerText = `Sheet${sheets.length + 1}`;

  sheetContElem.appendChild(divElem);
  handleSheetDb();
  handleGraphDb();
  handleSheet(divElem);
  handleDelete(divElem);
  divElem.click();
  divElem.scrollIntoView();
});

function handleDelete(elem) {
  elem.addEventListener("mousedown", function (e) {
    if (e.button !== 2) return;
    let sheets = document.querySelectorAll(".sheet");
    if (sheets.length == 1) {
      alert("You cannot remove this file");
      return;
    }

    let response = confirm(
      "The folder will be deleted permanently,Are you Sure?"
    );

    if(!response)return;
    let index = Number(elem.getAttribute("id"));
    elem.remove();
    graphDbStorage.splice(index, 1);
    sheetStorage.splice(index, 1);
    sheets = document.querySelectorAll(".sheet");
    sheets.forEach((sheet, idx) => {
        // console.log(idx);
      sheet.innerText = `Sheet${idx + 1}`;
      sheet.setAttribute("id", idx);
    });

    sheets[0].click();
  });
}

{
  sheetAddElem.click();
  setSheetDbAndGraphStorage(0);
  let cell = document.querySelector(".cell");
  cell.click();
}

function handleSheet(sheet) {
  sheet.addEventListener("click", function (e) {
    if(sheet.style.color === 'red')return;
    setSheetDbAndGraphStorage(Number(sheet.getAttribute("id")));
    let sheets = document.querySelectorAll(".sheet");
    sheets.forEach((sheet) => (sheet.style.color = "black"));
    sheet.style.color = "red";
  });
}

function setSheetDbAndGraphStorage(index) {
  sheetDb = sheetStorage[index];
  graphStorage = graphDbStorage[index];

  handleSheetProperties();
}

function handleSheetProperties() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.click();
    }
  }
}

function handleSheetDb() {
  let sheetDb = [];
  for (let i = 0; i < rows; i++) {
    let r = [];
    for (let j = 0; j < cols; j++) {
      let cellObj = {
        bold: false,
        italic: false,
        underline: false,
        align: "left",
        fontColor: "#000000",
        fontSize: "14",
        fontFamily: "monospace",
        backgroundColor: "transparent",
        formula: "",
        value: "",
        children: [],
      };
      r.push(cellObj);
    }
    sheetDb.push(r);
  }
  sheetStorage.push(sheetDb);
}

function handleGraphDb() {
  let graphStorage = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push([]);
    }
    graphStorage.push(row);
  }
  graphDbStorage.push(graphStorage);
}
