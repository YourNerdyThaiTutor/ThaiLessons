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
var l;
var div = document.getElementById("answers");
var choices = [];
var selected_word = "";
var correct ="";
var score = 0;
var alreadyWrong = false;
var streak = 0;
var groups ={
    "ค่ะ":["ตรงไป","สวัสดี","ห้องน้ำอยู่ข้างหน้า","อยู่ชั้นหนึ่ง","เลี้ยวซ้ายแล้วตรงไป","ไม่มีตังค์","ขอบคุณ"],
    "คะ":["ห้องน้ำอยู่ไหน","เท่าไหร่","ร้านอาหารอยู่ไหน","ยี่สิบบาทนะ","ไม่มีนะ","ใช่ไหม"],
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
    for(let i = 0; i<l.length;i++){
        generateChoiceButton(l[i]);
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
            var celebrate = document.getElementById("celebrate");
            celebrate.value = streak;
            celebrate.click();
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
    var correctIndex = Math.floor(Math.random() * l.length);
    correct = l[correctIndex];
    var end_sound = groups[correct]; //ending group
    var e = Math.floor(Math.random() * end_sound.length);
    selected_word = end_sound[e];
    document.getElementById("word").innerHTML = selected_word;
    //var t = document.createTextNode(src);
    //document.body.appendChild(t);
}

function startGame(){
    
    createQuestion();
    generateAnswerChoices();
    
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

function setupGame(_list_of_choices){
    groups = _list_of_choices;
    l = Object.keys(groups);
    startGame();
}

document.getElementById("helper").onclick = function(){playAllTones();};