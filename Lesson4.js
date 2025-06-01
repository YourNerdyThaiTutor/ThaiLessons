var consonants =["ก","จ","ด","ต","บ","ป","อ"]; //middle consonants
var single_low_consonants = ["ง","ญ","น","ย","ณ","ร","ว","ม","ฬ","ล"];
var paired_low_consonants = ["ค","ช","ซ","ท","พ","ฟ","ฮ"];//simple consonants no repeeated sounds
var paired_high_consonants = ["ข","ฉ","ส","ถ","ผ","ฝ","ห"];
var tones =["","่","้","๊","๋"];
var vowels =["า","ู","ี","เ","แ","โ"];
var ending_consonants = ["ง","ม","ย","ว","น"];
var div = document.getElementById("answers");
var v_div = document.getElementById("vowels");
var e_div = document.getElementById("endings");
var t_div = document.getElementById("tones");
var c_ans ="";
var v_ans ="";
var e_ans = "";
var choices = ["กาง","กาย","กาว","แกง","แกน","โกง","โกน","จาง","จาน","จาม","จึน","จูง","แจว","ดาว","แดน","โดน","ตาม","ตีน","บาง","บาน","ปูน","อาน","เอน"];
var correct ="";
var score = 0;
var alreadyWrong = false;
var streak = 0;
var options = ["mid", "single low", "paired", "all"];
var selected_option = "mid";
var selected_consonants = consonants;
var mid_words = [""];
var components = 3;

function generateChoiceButton(answer, _div, _type){
    var x = document.createElement("BUTTON");
    var t = document.createTextNode(answer);
    x.appendChild(t);
    x.id = answer;
    x.onclick = function(){checkAnswer(answer,_type);};
    _div.appendChild(x);
}

function generateAnswerChoices(_div, _list,_type){
    while (_div.firstChild) {
        _div.firstChild.remove();//clear answer choices from previous round
    }
    for(let i=0; i<_list.length; i++){
        var word = _list[i];
        generateChoiceButton(word, _div,_type);
    }
    
}

function generateSpellingSet(){
    generateAnswerChoices(div,consonants,"c");
    generateAnswerChoices(v_div,vowels,"v");
    generateAnswerChoices(e_div, ending_consonants,"e");
    
    
}

function checkAnswer(txt,_type){
    
    showWord(txt,_type);
    if(correct.includes(txt)){
        
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
        components--;
        if(components<=0){
            alreadyWrong = false;
            components = 3;
            c_ans ="";
            v_ans ="";
            e_ans = "";
            setTimeout(() => startGame(),700);
            
            
        }
       
    }
    else{
        //var ti = document.createTextNode("wrong");
        //document.body.appendChild(ti);
        document.getElementById(txt).style.background='#ff3333';
        alreadyWrong = true;
    }
    
}
function showWord(txt,_type){
    if(_type==="c"){
        c_ans=txt;
    }
    else if(_type==="v"){
        v_ans=txt;
    }
    else if(_type==="e"){
        e_ans=txt;
    }
    
    var vowel_map = {
         "ี":"above",
         "เ":"left",
         "แ":"left",
         "า":"right",
         "ู":"under",
         "โ":"left"
    };
    var your_word;
    if(vowel_map[v_ans]==="left"){
        your_word = v_ans+c_ans+e_ans;
    }
    else{
        your_word = c_ans+v_ans+e_ans;
    }
    document.getElementById('your_word').innerHTML = your_word;
    
}
function createQuestion(){
    var correctIndex = Math.floor(Math.random() * choices.length);
    correct = choices[correctIndex];
    var src = "./spelling_audios/"+correct+".mp3";
    
    var audio = document.getElementById('audio');

    var source = document.getElementById('audioSource');
    source.src = src;
    audio.load();
    audio.play();
    //var t = document.createTextNode(src);
    //document.body.appendChild(t);
}

function startGame(){
    generateSpellingSet();
    createQuestion();
    
}

var current_tone = 0;
function playAllTones(){
    
    document.getElementById("helper").textContent = "play next";
    var button = choices[current_tone];
    document.getElementById(button).style.background='#00a5f6';
    var src = "mid/"+button+"อ"+".mp3";
    
    var audio = document.getElementById('helper_audio');

    var source = document.getElementById('helper_audioSource');
    source.src = src;
    audio.load();
    audio.play();
    current_tone ++;
    if(current_tone===choices.length){
        current_tone = 0;
        document.getElementById("helper").textContent = "click here to hear all letters";
        for(let i = 0;i<choices.length;i++){
            document.getElementById(choices[i]).style.background='#ffffff';
        }
    }
    
}


startGame();
document.getElementById("helper").onclick = function(){playAllTones();};