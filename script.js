function onPageLoaded() {
    // Write your javascript code here
    console.log("page loaded");
    
}

var mid =["ก","จ","ด","ต","บ","ป","อ"]; //middle consonants
var single_low_consonants = ["ง","ญ","น","ย","ณ","ร","ว","ม","ฬ","ล"];
var paired_low_consonants = ["ค","ช","ซ","ท","พ","ฟ","ฮ"];//simple consonants no repeeated sounds
var paired_high_consonants = ["ข","ฉ","ส","ถ","ผ","ฝ","ห"];
var consonants = mid;
var tones =["","่","้","๊","๋"];
var vowels =["า","อ"];
var div = document.getElementById("answers");
var choices = [];
var correct ="";
var score = 0;
var alreadyWrong = false;
var streak = 0;
var options = ["mid", "single low", "paired", "all"];
var selected_option = "mid";
var selected_consonants = consonants;
var curr_level = "mid";
var c=0;

function generateChoiceButton(answer, _id){ //create the buttons
    var x = document.createElement("BUTTON");
    var t = document.createTextNode(answer);
    x.appendChild(t);
    x.id = _id;
    x.onclick = function(){checkAnswer(_id);};
    div.appendChild(x);
}

function generateAnswerChoices(){ //randomize which consonants and vowel to use
    
    c = Math.floor(Math.random() * consonants.length);
    while (div.firstChild) {
        div.firstChild.remove();//clear answer choices from previous round
    }
    choices = [];
    
    var v = Math.floor(Math.random() * vowels.length);
    generateTones(consonants[c],vowels[v]);
    
}

function generateTones(consonant,vowel){
    
    var word = "";
     var _id = "";
    if(curr_level==="mid"){
        for(let i=0; i< tones.length; i++){
            word = buildWord(consonant, tones[i], vowel);
            
        }
    }
   
    else if(curr_level==="single"){
        
        word = buildWord(consonant,"",vowel);   
        word = buildWord("ห"+consonant,"่",vowel);
        word = buildWord(consonant,"่",vowel);
        document.getElementById(word).innerHTML+="/"+"ห"+consonant+"้"+vowel;
        word = buildWord(consonant,"้",vowel);
        word = buildWord("ห"+consonant,"",vowel);      
        
    }
    
    else if(curr_level==="paired"){
        word = buildWord(consonant, "", vowel);
        word = buildWord(paired_high_consonants[c],"่",vowel);
        word = buildWord(consonant,"่",vowel);
        document.getElementById(word).innerHTML+="/"+paired_high_consonants[c]+"้"+vowel;
        word = buildWord(consonant,"้",vowel);
        
        
        word = buildWord(paired_high_consonants[c],"",vowel);    
    }
    
    
}

function buildWord(c, t,v){
    var consonant_map={
        "ง": "ง",
        "ญ": "ย",
        "น": "น",
        "ย": "ย",
        "ณ": "น",
        "ร": "ร",
        "ว": "ว",
        "ม": "ม",
        "ฬ":"ล",
        "ล":"ล",
        "ก":"ก",
        "จ":"จ",
        "ด":"ด",
        "ต":"ต",
        "บ":"บ",
        "ป":"ป",
        "อ":"อ"
    };
    var word = c+t+v;
    var _id = "";
    if(c.length>1){
        if(c[0]==="ห"){
            _id = "ห"+consonant_map[c.slice(-1)]+t+v;
        }
    }
    else if(c.length===1){
        if(consonant_map[c]){
           _id = consonant_map[c]+t+v; 
        }
        else{
            _id=word;
        }
    }
    choices.push(_id);
    generateChoiceButton(word,_id);
    return _id;
}

function selectLevel(level){
    document.getElementById(curr_level).className ="options";
    document.getElementById(level).className = "selectedOption";
    curr_level = level;
    if(level==="mid"){
        consonants = mid;
    }
    else if(level === "single"){
        consonants = single_low_consonants;
    }
    else if(level === "paired"){
        consonants = paired_low_consonants;
    }
    startGame();
}

function checkAnswer(txt){
      
    if(txt === correct){
        //var t = document.createTextNode("correct");
        //document.body.appendChild(t);
        document.getElementById(txt).style.background='#00ff00';
        if(!alreadyWrong){
            score ++;
            streak ++;
            document.getElementById("score").textContent = "Score: "+score;
            document.getElementById("streak").textContent = "Streak: "+streak;

            //update local storage
            updateToneLocalStorage(correct, false);
            updateStreakToneLocalStorage(streak)
        }
        else{
            streak = 0;
            document.getElementById("streak").textContent = "Streak: "+streak;
        }
        alreadyWrong = false;
        setTimeout(() => startGame(),700);
        current_tone = 0;
        document.getElementById("helper").textContent = "click here to hear all tones";
    }
    else{
        //var ti = document.createTextNode("wrong");
        //document.body.appendChild(ti);
        document.getElementById(txt).style.background='#ff3333';
        alreadyWrong = true;

        //update local storage
        updateToneLocalStorage(correct, true);
    }
}
function createQuestion(){
    var correctIndex = Math.floor(Math.random() * choices.length);
    correct = choices[correctIndex];
    
    var src = curr_level+"/"+correct+".mp3";
    var audio = document.getElementById('audio');

    var source = document.getElementById('audioSource');
    source.src = src;
    audio.load();
    audio.play();
    //var t = document.createTextNode(src);
    //document.body.appendChild(t);
}

function startGame(){
    generateAnswerChoices();
    createQuestion();
    
}

var current_tone = 0;
function resetWhite(){
            for(let i = 0;i<choices.length;i++){
            document.getElementById(choices[i]).style.background='#ffffff';
        }
}
function playAllTones(){
    
    document.getElementById("helper").textContent = "play next";
    var button = choices[current_tone];
    document.getElementById(button).style.background='#00a5f6';
    var src = curr_level+"/"+button+".mp3";
    
    var audio = document.getElementById('helper_audio');

    var source = document.getElementById('helper_audioSource');
    source.src = src;
    audio.load();
    audio.play();
    current_tone ++;
    if(current_tone===choices.length){
        current_tone = 0;
        document.getElementById("helper").textContent = "click here to hear all tones";
        setTimeout(() => resetWhite(),700);
        
    }
    
}

function updateToneLocalStorage(txt, wrong){
    let toneMap = {
        0 : "Neutral",
        1 : "First",
        2 : "Second",
        3 : "Third",
        4 : "Fourth"
    }

    try{
        let parentDiv = document.getElementById("answers");
        let childButtons = parentDiv.getElementsByTagName('button');

        // Convert HTMLCollection to an array and extract IDs.
        const buttonIdsInDOM = Array.from(childButtons).map(button => button.id); 

        for(let i = 0; i < buttonIdsInDOM.length; i++){

            if(txt === buttonIdsInDOM[i]){
                //found the correct answer
                //console.log("found: " + toneMapping[i])

                //update all local storage
                if(wrong){
                    incrementLocalStorage("All TonesW")

                    let toneKey = toneMap[i] + "W"
                    incrementLocalStorage(toneKey)
                }else{
                    incrementLocalStorage("All TonesC")
                    let toneKey = toneMap[i] + "C"
                    incrementLocalStorage(toneKey)
                }
            }
        }
    }
    catch(error){
        console.error(`Parent div with ID "${answers}" not found.`);
        return;
    }
}

function incrementLocalStorage(key){

    let gameData = localStorage.getItem(key)

    if(!gameData){
        //initialize it
        gameData = "0"
    }

    //turn string into Number and increment
    gameData = Number(gameData)
    gameData = gameData + 1                    
    localStorage.setItem(key, gameData.toString())
}


function updateStreakToneLocalStorage(streak){

    let gameData = localStorage.getItem("All TonesStreak")

    if(!gameData){
        //initialize it
        gameData = "0"
    }

    //turn string into Number and increment
    gameData = Number(gameData)
    gameData = streak > gameData ? streak : gameData                   
    localStorage.setItem("All TonesStreak", gameData.toString())

}

function openIframePopup(url) {

    //create local storage info
    localStorage.setItem("TonesGame", "All Tones,Neutral,First,Second,Third,Fourth")

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '80vw'; // Example width
    iframe.style.height = '80vh'; // Example height
    iframe.style.border = 'none';

    // Get the content div and append the iframe
    const popupContent = document.getElementById('popupContent');
    popupContent.insertBefore(iframe, popupContent.firstChild); // Insert before the close button

    // Display the popup container
    document.getElementById('popupContainer').style.display = 'block';
}

function closePopup() {
    const popupContainer = document.getElementById('popupContainer');
    const popupContent = document.getElementById('popupContent');
    const iframe = popupContent.querySelector('iframe');

    if (iframe) {
        popupContent.removeChild(iframe); // Remove the iframe when closing
    }
    popupContainer.style.display = 'none';
}


startGame();
document.getElementById("helper").onclick = function(){playAllTones();};
document.getElementById("mid").onclick = function(){selectLevel("mid");};
document.getElementById("single").onclick = function(){selectLevel("single");};
document.getElementById("paired").onclick = function(){selectLevel("paired");};
