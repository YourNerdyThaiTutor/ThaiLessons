
document.getElementById("table-body")


function startDashboard(){
    try{
        let tableBody = document.getElementById("table-body")

        const urlParams = new URLSearchParams(window.location.search);
        const game = urlParams.get('game');

        createRows(game, tableBody);
    }catch{
        console.log("failed to load table")
    }
}

function createRows(game, tableBody){
    let rowKeys = localStorage.getItem(game)
    let rowKeysArr = rowKeys.split(",")

    for(let i = 0; i < rowKeysArr.length; i ++){
        try{
            let myRow = tableBody.insertRow()   
            insertCells(rowKeysArr[i], myRow, i)
        }catch{
            console.log("failed to insert row")
        }
    }
}

function insertCells(key, myRow, index){
    insertFirstCell(key, myRow)
    insertSecondCell(key, myRow)
    insertThirdCell(key, myRow, index)
}

function insertFirstCell(key, myRow){
    //Insert Row name
    let firstCell = myRow.insertCell()
    let firstcellText = document.createTextNode(key)
    firstCell.appendChild(firstcellText)
}

function insertSecondCell(key, myRow){
    //do math on Correct(C) and Wrong(W)
    let wrong = localStorage.getItem(key + "W") ? localStorage.getItem(key + "W") : 0
    let correct = localStorage.getItem(key + "C") ? localStorage.getItem(key + "C") : 0

    let successRate = Number(correct)/(Number(correct) + Number(wrong)) ?
                            Number(correct)/(Number(correct) + Number(wrong)) :
                            0;
    
    successRate = successRate * 100

    let myCell = myRow.insertCell()
    let cellText = document.createTextNode(successRate.toFixed(2) + "%") 
    myCell.appendChild(cellText)
}

function insertThirdCell(key, myRow, index){

    let firstCell = myRow.insertCell()
    let firstcellText


    if(index !== 0){
        firstcellText = document.createTextNode("--")
    }else{
        let streak = localStorage.getItem(key + "Streak") ? localStorage.getItem(key + "Streak") : 0
        firstcellText = document.createTextNode(streak)
    }

    firstCell.appendChild(firstcellText)
}

startDashboard()