var consonants =["ก","จ","ด","ต","บ","ป","อ","ง","ญ","น","ย","ณ","ร","ว","ม","ฬ","ล","ค","ช","ซ","ท","พ","ฟ","ฮ","ข","ฉ","ส","ถ","ผ","ฝ","ห"]; //middle consonants
var tones =["","่","้"];
var vowels=["ั","า","ุ","ู","ิ","ี","เ","แ","โ","ึ","ื"];
var vowels_map ={
    "ั":"after",
    "า":"after",
    "ุ":"after",
    "ู":"after",
    "ิ":"above",
    "ี":"above",
    "เ":"before",
    "แ":"before",
    "โ":"before",
    "ึ":"above",
    "ื":"above"

};
var div = document.getElementById("answers");
var choices = ["ก","ด","บ","น"];
var correct ="";
var score = 0;
var alreadyWrong = false;
var streak = 0;
var groups ={
    "ก":["ก","ข","ค","ฆ"],
    "ด":["จ","ด","ต","ถ","ท","ธ","ฎ","ฏ","ฑ","ฒ","ช","ซ","ศ","ษ","ส"],
    "บ":["บ","ป","พ","ภ","ฟ"],
    "น":["น","ณ","ญ","ร","ล","ฬ"]    
};

//FUN STUFF
var miss = 0;
var sassy_mode = false;

function generateChoiceButton(answer){
    var x = document.createElement("BUTTON");
    var t = document.createTextNode(answer);
    x.appendChild(t);
    x.id = answer;
    x.onclick = function(){checkAnswer(answer);};
    div.appendChild(x);
}

function generateAnswerChoices(){
    
    while (div.firstChild) {
        div.firstChild.remove();//clear answer choices from previous round
    }
    //var c = "ก";
    //var t = Math.floor(Math.random() * consonants.length);
    var v = Math.floor(Math.random() * vowels.length);
    for(let i=0; i< choices.length; i++){
        var word = choices[i];
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
        miss ++;
        var disappointment = document.getElementById("d");
        disappointment.value = miss;
        disappointment.click();
        alreadyWrong = true;
    }
}
function createQuestion(){
    var correctIndex = Math.floor(Math.random() * choices.length);
    correct = choices[correctIndex];
    var c = Math.floor(Math.random() * consonants.length);
    var v = Math.floor(Math.random() * vowels.length);
    var t = Math.floor(Math.random() * tones.length);
    var _vowel = vowels[v];
    var _consonant = consonants[c];
    var end_sound = groups[correct]; //ending group
    var e = Math.floor(Math.random() * end_sound.length);
    var _end = end_sound[e];
    var _tone = tones[t];
    var q_word = "";
    if(vowels_map[_vowel]==="before"){
        q_word = _vowel+_consonant+_end;
    }
    else if(vowels_map[_vowel]==="after"){
        q_word = _consonant+_vowel+_end;
    }
    else{
        q_word = _consonant+_vowel+_end;
    }
    document.getElementById("word").innerHTML = q_word;
    //var t = document.createTextNode(src);
    //document.body.appendChild(t);
}

function startGame(){
    generateAnswerChoices();
    createQuestion();
    
}

var current_tone = 0;
function playAllTones(){
    
    //TODO show ending consonant table
      var x = document.getElementById("etable");
      if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("helper").innerHTML = "close table";
      } else {
        x.style.display = "none";
        document.getElementById("helper").innerHTML = "click here to see the table";
      }

    
}


startGame();
document.getElementById("helper").onclick = function(){playAllTones();};