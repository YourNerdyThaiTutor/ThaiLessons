function onPageLoaded() {
    // Write your javascript code here
    console.log("page loaded");
    
}

var consonants =["ก","จ","ด","ต","บ","ป","อ"]; //middle consonants
var single_low_consonants = ["ง","ญ","น","ย","ณ","ร","ว","ม","ฬ","ล"];
var paired_low_consonants = ["ค","ช","ซ","ท","พ","ฟ","ฮ"];//simple consonants no repeeated sounds
var paired_high_consonants = ["ข","ฉ","ส","ถ","ผ","ฝ","ห"];
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

function generateChoiceButton(answer){
    var x = document.createElement("BUTTON");
    var t = document.createTextNode(answer);
    x.appendChild(t);
    x.id = answer;
    x.onclick = function(){checkAnswer(answer);};
    div.appendChild(x);
}

function generateAnswerChoices(){
    var c = Math.floor(Math.random() * consonants.length);
    while (div.firstChild) {
        div.firstChild.remove();//clear answer choices from previous round
    }
    choices = [];
    //var c = "ก";
    //var t = Math.floor(Math.random() * consonants.length);
    var v = Math.floor(Math.random() * vowels.length);
    for(let i=0; i< tones.length; i++){
        var word = consonants[c] + tones[i] + vowels[v];
        choices.push(word);
        generateChoiceButton(word);
    }
    
}

function generateTones(){
    
    
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
        }
        else{
            streak = 0;
            document.getElementById("streak").textContent = "Streak: "+streak;
        }
        alreadyWrong = false;
        setTimeout(() => startGame(),700);
    }
    else{
        //var ti = document.createTextNode("wrong");
        //document.body.appendChild(ti);
        document.getElementById(txt).style.background='#ff3333';
        alreadyWrong = true;
    }
}
function createQuestion(){
    var correctIndex = Math.floor(Math.random() * choices.length);
    correct = choices[correctIndex];
    var src = "audios/"+correct+".mp3";
    
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
function playAllTones(){
    
    document.getElementById("helper").textContent = "play next";
    var button = choices[current_tone];
    document.getElementById(button).style.background='#00a5f6';
    var src = "audios/"+button+".mp3";
    
    var audio = document.getElementById('helper_audio');

    var source = document.getElementById('helper_audioSource');
    source.src = src;
    audio.load();
    audio.play();
    current_tone ++;
    if(current_tone===choices.length){
        current_tone = 0;
        document.getElementById("helper").textContent = "click here to hear all tones";
        for(let i = 0;i<choices.length;i++){
            document.getElementById(choices[i]).style.background='#ffffff';
        }
    }
    
}


startGame();
document.getElementById("helper").onclick = function(){playAllTones();};