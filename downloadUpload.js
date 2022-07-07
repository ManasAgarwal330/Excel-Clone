let downloadBtn = document.querySelector(".download");
let uploadBtn = document.querySelector(".upload");

downloadBtn.addEventListener("click",function(e){
    let downloadObj = JSON.stringify([sheetDb,graphStorage]);
    let a = document.createElement("a");
    let file = new Blob([downloadObj],{type:"application/json"});
    a.href = URL.createObjectURL(file);;
    a.download = "SheetJSON";
    a.click();
})

uploadBtn.addEventListener("click",function(e){
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",function(e){
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load",function(e){
            let uploadObj = JSON.parse(fr.result);
            sheetAddElem.click();

            sheetDb = uploadObj[0];
            graphStorage = uploadObj[1];

            sheetStorage[sheetStorage.length-1] = uploadObj[0];
            graphDbStorage[graphDbStorage.length-1] = uploadObj[1];

            handleSheetProperties();
        })
    })

    
})