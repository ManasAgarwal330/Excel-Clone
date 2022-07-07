

function isGraphCyclic(){
    let visited = [];
    let dfsVisited = [];

    for(let i=0;i<rows;i++)
    {
        let row = [];
        for(let j=0;j<cols;j++)
        {
            row.push(false);
        }
        visited.push(row);
        dfsVisited.push(row);
    }
    let isCycle = helper(visited,dfsVisited);
    
    return isCycle;
}

function helper(visited,dfsVisited){
    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<rows;j++){
            if(visited[i][j] === false)
            {
                let response =  dfs(i,j,visited,dfsVisited);
                if(response)return {i,j};
            }
        }
    }
    return "";
}

function dfs(row,col,visited,dfsVisited){
    visited[row][col] = true;
    dfsVisited[row][col] = true;

    let children = graphStorage[row][col];
    for(let i=0;i<children.length;i++)
    {
        let cRow =children[i][0];
        let cCol = children[i][1];
        if(visited[cRow][cCol] === false)
        {
           let response =  dfs(cRow,cCol,visited,dfsVisited);
           if(response)return true;
        }else if(visited[cRow][cCol] === true && dfsVisited[cRow][cCol] === true)
        {
            return true;
        } 
    }

    dfsVisited[row][col] = false;
    return false;
}