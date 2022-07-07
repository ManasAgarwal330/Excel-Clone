cells.forEach((cell) => {
  handleBlur(cell);
});

function handleBlur(cell) {
  cell.addEventListener("blur", function (e) {
    let value = e.target.innerText === "" ? "" : Number(e.target.innerText);
    let address = addressBarElem.value;
    let [rid, cid] = decodeAddress(address);
    if (value !== sheetDb[rid][cid].value) {
      sheetDb[rid][cid].value = value;
      removeParentChildrenRelation(sheetDb[rid][cid].formula);
      sheetDb[rid][cid].formula = "";
      updateChildren(sheetDb[rid][cid].children);
    }
  });
}

function updateChildren(children) {
  for (let i = 0; i < children.length; i++) {
    let [cell, cellProp] = getCellAndCellProp(children[i]);
    let newValue = evaluateFormula(cellProp.formula);
    cellProp.value = newValue;
    cell.innerText = cellProp.value;
    updateChildren(cellProp.children);
  }
}

formulaBarElem.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    let expression = formulaBarElem.value;
    let address = addressBarElem.value;
    let [cell, cellProp] = getCellAndCellProp(address);
    createParentChildRelation(expression);
    let isCyclic = isGraphCyclic();
    let cnd;
    if(isCyclic){
      cnd = confirm("Cycle Detected do you want to trace the cycle path");
    }
    while(isCyclic && cnd) {
      await isGraphCyclicTrace(isCyclic);
      cnd = confirm("Cycle Detected do you want to trace the cycle path");
    }
    if(isCyclic){
      removeParentChildrenRelation(expression);
      return;
    }
    if (cellProp.formula !== expression) {
      removeParentChildrenRelation(cellProp.formula);
      cellProp.formula = expression;
      let value = evaluateFormula(expression);
      cellProp.value = value;
      updateChildren(cellProp.children);
      cell.innerText = cellProp.value;

      createParentChildRelation(expression);
    }
  }
});
function removeParentChildrenRelation(expression) {
  expression = expression.split(" ");
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i].charCodeAt(0);
    if (char >= 65 && char <= 90) {
      let [rid, cid] = decodeAddress(expression[i]);
      let children = sheetDb[rid][cid].children;
      let idx = children.findIndex((child) => child === addressBarElem.value);
      children.splice(idx, 1);

      //graphStorage
      let [crid, ccid] = decodeAddress(addressBarElem.value);
      let graphStorageChildren = graphStorage[rid][cid];
      let graphIdx = graphStorageChildren.findIndex(
        (elem) => elem[0] === crid && elem[1] === ccid
      );
      graphStorageChildren.splice(graphIdx, 1);
    }
  }
}

function createParentChildRelation(expression) {
  expression = expression.split(" ");
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i].charCodeAt(0);
    if (char >= 65 && char <= 90) {
      let [rid, cid] = decodeAddress(expression[i]);
      if (findChild(sheetDb[rid][cid].children, addressBarElem.value)) return;
      sheetDb[rid][cid].children.push(addressBarElem.value);
      let [crid, ccid] = decodeAddress(addressBarElem.value);
      graphStorage[rid][cid].push([crid, ccid]);
    }
  }
}

function findChild(children, child) {
  return children.find((elem) => elem === child);
}

function evaluateFormula(expression) {
  expression = expression.split(" ");
  for (let i = 0; i < expression.length; i++) {
    let char = expression[i].charCodeAt(0);
    if (char >= 65 && char <= 90) {
      let [rid, cid] = decodeAddress(expression[i]);
      let value = sheetDb[rid][cid].value;
      expression[i] = value;
    }
  }
  expression = expression.join(" ");
  let calValue = eval(expression);
  return calValue;
}
