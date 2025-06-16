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
var current_tone=0;
var type_of_choices = "words";
var phrase_test = false;
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
        
        if(phrase_test){
                try{
               current_tone = 0;
                place = false;
               document.getElementById("helper").textContent = "click here to play each word separately"; 
            }
            catch{
                console.log("no helper");
            }
        }
        
        
        setTimeout(() => startGame(),700);
        
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
    else if(type_of_choices === "combovowel"){
        
        src = folder+correct+".mp3";
        correct = correct.replace("-","อ");
        
        
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
   x.replace(",","");
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

function toggleHelp(){
    
    //TODO show ending consonant table
      var x = document.getElementById("etable");
    var letters = "";
    for(let i = 0; i< correct.length;i++){
        letters+=correct[i]+",";
    }
    x.src = "https://yournerdythaitutor.github.io/ThaiKeyboard.html?product="+letters;
      if (x.style.display === "none") {
        x.style.display = "block";
        document.getElementById("helper").innerHTML = "close table";
      } else {
        x.style.display = "none";
        document.getElementById("helper").innerHTML = "click here for help";
      }

    
}

var place = false;
function playNumber(){
    phrase_test = true;
    var _map = {
        "1": "หนึ่ง",
        "2":"สอง",
        "3":"สาม",
        "4":"สี่",
        "5":"ห้า",
        "6":"หก",
        "7":"เจ็ด",
        "8":"แปด",
        "9":"เก้า",
        "20":"ยี่สิบ",
        "10":"สิบ",
        "1+":"เอ็ด"
    };
    var _place_map={
        1:"สิบ",
        2:"ร้อย",
        3:"พัน",
        4:"หมื่น",
        5:"แสน",
        6:"ล้าน"
    };
    document.getElementById("helper").textContent = "play next";
    var button;
    if(!place){
        var b = correct[current_tone];
        if(b!="0"){
            place = true;
            if(correct.length - current_tone -1 === 1 && b==="2"){
                b = 20;
                place = false;
                current_tone ++;
            }
            else if(correct.length - current_tone -1 === 1 && b==="1"){
                b = 10;
                place = false;
                current_tone ++;
            }
            else if(correct.length - current_tone -1 === 0){
                if(b==="1"){
                    b = "1+";
                }
                current_tone++;
            }
            
            button = _map[b];
        }
        else{
            place = false;
            current_tone ++;
        }
        
        
    }
    else if(current_tone!=correct.length){
        
        var p = correct.length - current_tone -1;
        button = _place_map[p];
        place = false;
        current_tone ++;
    }
    
    src = "https://yournerdythaitutor.github.io/Lessons/audios/vocab/"+button+".mp3";
    
    var audio = document.getElementById('helper_audio');

    var source = document.getElementById('helper_audioSource');
    source.src = src;
    audio.load();
    audio.play();
    
    
    if(current_tone===correct.length){
        current_tone = 0;
        place = false;
        document.getElementById("helper").textContent = "click here to play each word separately";
    }
    
}
