var consonants =["ก","จ","ด","ต","บ","ป","อ"]; //middle consonants
var single_low_consonants = ["ง","ญ","น","ย","ณ","ร","ว","ม","ฬ","ล"];
var paired_low_consonants = ["ค","ช","ซ","ท","พ","ฟ","ฮ"];//simple consonants no repeeated sounds
var paired_high_consonants = ["ข","ฉ","ส","ถ","ผ","ฝ","ห"];
var tones =["","่","้","๊","๋"];
var vowels =["า","อ"];
var choices = ["ะ","า","ุ","ู","ิ","ี","เ","แ","โ","ึ"];
var correct ="";
var score = 0;
var alreadyWrong = false;
var streak = 0;
var miss =0;
var folder = "";
var type_of_choices = "words";
var input = document.getElementById("numb");
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("myBtn").click();
        }
    });

function checkAnswer(txt){
    
    
    if(txt === correct){
        //var t = document.createTextNode("correct");
        //document.body.appendChild(t);
        document.getElementById("myBtn").style.background='#00ff00';
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
        miss++;
        var disappointment = document.getElementById("d");
        disappointment.value = miss;
        disappointment.click();
        document.getElementById("myBtn").style.background='#ff3333';
        alreadyWrong = true;
    }
}
function createQuestion(){
    var correctIndex = Math.floor(Math.random() * choices.length);
    correct = choices[correctIndex];
    var src;
    
    if(type_of_choices === "consonant"){
        src = folder+correct+"อ"+".mp3";
    }
    else if(type_of_choices === "words"){
        src = folder+correct+".mp3";
    }
    
    var audio = document.getElementById('audio');

    var source = document.getElementById('audioSource');
    source.src = src;
    audio.load();
    audio.play();
    //var t = document.createTextNode(src);
    //document.body.appendChild(t);
}

function SubmitAnswer() {
  // Get the value of the input field with id="numb"
  let x = document.getElementById("numb").value;
    document.getElementById("numb").focus();
    document.getElementById("numb").select();
  // If x is Not a Number or less than one or greater than 10
   x.replace(/\s/g, '');
   checkAnswer(x);
}

function startGame(){
    document.getElementById("numb").focus();
    document.getElementById("numb").select();
    document.getElementById("myBtn").style.background='#ffffff';
    createQuestion();
}

function setupGame(_folder, _list_of_choices, _type_of_choices = "words"){
    folder = _folder;
    choices = _list_of_choices;
    type_of_choices = _type_of_choices;
    startGame();
}
