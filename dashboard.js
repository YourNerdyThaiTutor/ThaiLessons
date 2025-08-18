
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
    insertThirdCell(key, myRow)
    insertFourthCell(key, myRow)
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

function insertThirdCell(key, myRow){
    //put the streak in
    let firstCell = myRow.insertCell()
    let firstcellText

    let streak = localStorage.getItem(key + "Streak") ? localStorage.getItem(key + "Streak") : 0
    firstcellText = document.createTextNode(streak)
    
    firstCell.appendChild(firstcellText)
}

function insertFourthCell(key, myRow){
    //put Masterred progress bar in
    let firstCell = myRow.insertCell();

    // Get streak value from localStorage (default to 0)
    let streak = localStorage.getItem(key + "Streak") || 0;
    streak = Number(streak); // ensure it's a number

    // Set a goal or max value for the progress (e.g., 100)
    let maxStreak = 100;

    // Create a container div for the progress bar
    let progressContainer = document.createElement("div");
    progressContainer.style.width = "100%";
    progressContainer.style.backgroundColor = "#eee";
    progressContainer.style.borderRadius = "5px";
    progressContainer.style.height = "16px";
    progressContainer.style.overflow = "hidden";
    progressContainer.style.marginTop = "4px";

    // Create the progress bar itself
    let progressBar = document.createElement("div");
    progressBar.style.width = `${Math.min((streak / maxStreak) * 100, 100)}%`;
    progressBar.style.height = "100%";

    // Choose progress bar color based on streak
    let barColor;
    switch (true) {
        case (streak < 10):
            barColor = "#ff0000";
            break;
        case (streak < 25):
            barColor = "#ff8000";
            break;
        case (streak < 50):
            barColor = "#ffcc00";
            break;
        case (streak < 100):
            barColor = "#77dd77";
            break;
        default:
            barColor = "#77dd77";
            break;
    }

    progressBar.style.backgroundColor = barColor; // pastel green
    progressBar.style.transition = "width 0.3s ease";

    if(streak >= 100){
        let cellText = document.createTextNode("👑") 
        firstCell.appendChild(cellText)
    }

    // Assemble the bar
    progressContainer.appendChild(progressBar);
    firstCell.appendChild(progressContainer);
    

}

startDashboard()