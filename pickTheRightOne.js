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
var answer_map = null;
var limit_choices = null;
var correctIndex = 0;
var miss = 0;
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
    if(limit_choices===null){
        for(let i=0; i< consonants.length; i++){
        var word = consonants[i];
        choices.push(word);
        generateChoiceButton(word);
    }
    }
    else{
        RandomizeChoices();
        for(let i=0; i< choices.length; i++){
        var wo = choices[i];
        generateChoiceButton(wo);
    }
    }
    
    
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function RandomizeChoices(){
    var r = Math.floor(Math.random() * consonants.length/limit_choices + 1);
    for(let i = 0; i<limit_choices;i++){
        choices.push(consonants[(correctIndex+(i*r))%consonants.length]);
    }
    shuffleArray(choices);
    
    
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
            try{
                var celebrate = document.getElementById("celebrate");
                celebrate.value = streak;
                celebrate.click();
            }
            catch{
                console.log("no celebrate");
            }
        }
        else{
            streak = 0;
            document.getElementById("streak").textContent = "Streak: "+streak;
        }
            
        alreadyWrong = false;
        setTimeout(() => startGame(),700);
        current_tone = 0;
        document.getElementById("helper").textContent = "click here to hear all choices";
    }
    else{
        //var ti = document.createTextNode("wrong");
        //document.body.appendChild(ti);
        miss++;
        try{
           var disappointment = document.getElementById("d");
        disappointment.value = miss;
        disappointment.click(); 
        }
        catch{
            console.log("no d");
        }
        document.getElementById(txt).style.background='#ff3333';
        alreadyWrong = true;
    }
}
function createQuestion(){
    correctIndex = Math.floor(Math.random() * choices.length);
    correct = choices[correctIndex];
    if(type_of_choices === "consonant"){
        src = folder+correct+"อ"+".mp3";
    }
    else if(type_of_choices === "words"){
        src = folder+correct+".mp3";
    }
    else if(answer_map!=null){
        src = folder+answer_map[correct]+".mp3";
    }
    
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
    if(type_of_choices === "consonant"){
        src = folder+button+"อ"+".mp3";
    }
    else if(type_of_choices === "words"){
        src = folder+button+".mp3";
    }
    else if(answer_map!=null){
        src = folder+answer_map[button]+".mp3";
    }
    
    var audio = document.getElementById('helper_audio');

    var source = document.getElementById('helper_audioSource');
    source.src = src;
    audio.load();
    audio.play();
    current_tone ++;
    if(current_tone===choices.length){
        current_tone = 0;
        document.getElementById("helper").textContent = "click here to hear all choices";
        for(let i = 0;i<choices.length;i++){
            document.getElementById(choices[i]).style.background='#ffffff';
        }
    }
    
}

function setupGame(_folder, _list_of_choices, _type_of_choices = "words", _answer_map = null, _limit_choices = null){
    folder = _folder;
    consonants = _list_of_choices;
    type_of_choices = _type_of_choices;
    answer_map = _answer_map;
    limit_choices = _limit_choices;
    startGame();
}

document.getElementById("helper").onclick = function(){playAllTones();};