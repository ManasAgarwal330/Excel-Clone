let rowAddressElem = document.querySelector(".row-address-cont");
let colAddressElem = document.querySelector(".col-address-cont");
let cellElem = document.querySelector(".cell-box");
let rows = 100;
let cols = 26;
let addressBarElem = document.querySelector(".address-bar");


for (let i = 0; i < rows; i++) {
  let divElem = document.createElement("div");
  divElem.setAttribute("class", "row-address-cell");
  divElem.innerText = i + 1;
  rowAddressElem.appendChild(divElem);
}

for (let i = 0; i < cols; i++) {
  let divElem = document.createElement("div");
  divElem.setAttribute("class", "col-address-cell");
  divElem.innerText = String.fromCharCode(65 + i);
  colAddressElem.appendChild(divElem);
}

for (let i = 0; i < rows; i++) {
  let rowElem = document.createElement("div");
  rowElem.setAttribute("class", "cell-holder");
  for (let j = 0; j < cols; j++) {
    let divElem = document.createElement("div");
    divElem.setAttribute("contenteditable", true);
    divElem.setAttribute("spellcheck", false);
    divElem.setAttribute("class", "cell");
    divElem.setAttribute("rid", i);
    divElem.setAttribute("cid", j);
    rowElem.appendChild(divElem);
  }
  cellElem.appendChild(rowElem);
}

let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  handleClick(cell);
});


function handleClick(cell) {
  cell.addEventListener("click", (e) => {
    let cellRow = Number(e.target.getAttribute("rid")) + 1;
    let cellCol = String.fromCharCode(
      Number(e.target.getAttribute("cid")) + 65
    );
    let address = `${cellCol}${cellRow}`;
    addressBarElem.value = address;
  });
}

