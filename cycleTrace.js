async function isGraphCyclicTrace(args) {
  let visited = [];
  let dfsVisited = [];

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    visited.push(row);
    dfsVisited.push(row);
  }
  return await dfsTrace(Number(args.i),Number(args.j),visited, dfsVisited);
}


function delay() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function dfsTrace(row, col, visited, dfsVisited) {
  visited[row][col] = true;
  dfsVisited[row][col] = true;
  let cell = document.querySelector(`.cell[rid="${row}"][cid="${col}"]`);
  cell.style.backgroundColor = "lightblue";
  await delay();
  let children = graphStorage[row][col];
  for (let i = 0; i < children.length; i++) {
    let cRow = children[i][0];
    let cCol = children[i][1];
    if (visited[cRow][cCol] === false) {
      let response = await dfsTrace(cRow, cCol, visited, dfsVisited);
      if (response) {
        cell.style.backgroundColor = "transparent";
        await delay();
        return Promise.resolve(true);
      }
    } else if (
      visited[cRow][cCol] === true &&
      dfsVisited[cRow][cCol] === true
    ) {
      let newCell = document.querySelector(
        `.cell[rid="${cRow}"][cid="${cCol}"]`
      );
      newCell.style.backgroundColor = "orange";
      await delay();
      newCell.style.backgroundColor = "transparent";
      await delay();

      cell.style.backgroundColor = "transparent";
      await delay();

      return Promise.resolve(true);
    }
  }

  dfsVisited[row][col] = false;
  return Promise.resolve(false);
}
