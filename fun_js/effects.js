const levels_of_disappointment = 
      {
          fine:["ahh","arai laugh","AO MAI", "bruh", "grunt","laugh"],
          whatchudoin:["ARAIIII", "BRUH (2)", "did you even read", "disappointed", "frustrated noises", "go back and study","inhale ARAI", "just stop","look it's all red","OII","REMEMBER IT", "terrr","why'd you do this","yalla"],
          igiveup:["are you even trying", "at least try", "er","giving up laugh", "how many times have you tried", "i'm tired", "it doesn't matter anymore","remember it when you get it wrong", "what is this", "why are you like this"]
          
      };
const levels_of_approval =
      {
          "good":["geng mag","ok;)","yay"],
          "yay":["geng jang loei", "geng mag geng mag"]
      };
var isChecked = false;


function test(){
    sassyModeON();
    if(isChecked){
       playSound("bruh");
    }
    else{
        playSound("yalla");
    }
}
function sassyModeON(){
    var chxBox = document.getElementById("sassy_mode");
    isChecked = chxBox.checked;
    //false because the checkbox is unchecked on page load   
}

function playSound(sound){
    
    var src = "./sassy_mode/audios/"+sound+".mp3";
    var audio = document.getElementById('soundEffect');

    var source = document.getElementById('effectSource');
    source.src = src;
    audio.load();
    audio.play();
}

function addToggle(){
    var div = document.getElementById("sass");
    div.innerHTML=`<div style="font-family: monospace; font-size: 10pt" class="tooltip">
        sassy mode
        <span class="tooltiptext">Only for masochists. In case you need motivation. I can yell at you, if that helps.</span>
    </div>
    <p></p>
    <div><label class="switch">
      <input class="toggle" type="checkbox" id="sassy_mode">
      <span class="slider round"></span>
    </label>
    </div>
    <audio id="soundEffect">
                <source id="effectSource" src="mid/กอ.mp3" type="audio/mp3">
                Your browser does not support the audio tag.
    </audio>
    <button id="d" style="display:none" onclick="disappointment()" value = 0 >disrespect</button>
    <button id="celebrate" style="display:none" onclick="celebrate()" value = 0 >celebrate</button>
    `;
    /*document.body.innerHTML+=`<img src="./sassy_mode/img/Side%20eye.gif" style="height: 80%; display: none; position: absolute; bottom: 50pt; left: 10pt;" id="buffalo">`;*/
}
function displayBuffalo(_display){
    var div = document.getElementById("buffalo").style.display = _display;
}

function setCharacter(_character){
    var div = document.getElementById("buffalo");
    div.src = "./sassy_mode/img/"+_character;
}

function disappointment(){
    sassyModeON();
    var miss = document.getElementById("d").value;
    if(isChecked){
        var t=0;
        var selection = [];
        if(miss > 20){
            selection = levels_of_disappointment.igiveup;

        }
        else if(miss>10){
            selection = levels_of_disappointment.whatchudoin;
        }
        else if(miss >3){
            selection = levels_of_disappointment.fine;
        }
        t = Math.floor(Math.random() * selection.length);
        playSound(selection[t]);
        var b = Math.floor(Math.random() * 10);
        if(b==5){
            try{
                displayBuffalo("block");
                setTimeout(() => displayBuffalo("none"),2000);
            }
            catch{
                console.log("can't find image");
            }
            
        }
        
    } 
    
    
}

function celebrate(){
    sassyModeON();
    var streak = document.getElementById("celebrate").value;
    if(isChecked){
        var t=0;
        var selection = [];
        if(streak == 50){
            selection = levels_of_approval.yay;
            t = Math.floor(Math.random() * selection.length);
            playSound(selection[t]);     
            try{
                setCharacter("Green_guy.gif");
                displayBuffalo("block");
                setTimeout(() => displayBuffalo("none"),2000);
            }
            catch{
                console.log("can't find image");
            }
        }
        else if(streak == 100){
            selection = levels_of_approval.yay;
            t = Math.floor(Math.random() * selection.length);
            playSound(selection[t]);     
            try{
                setCharacter("Yay_elephant.gif");
                displayBuffalo("block");
                setTimeout(() => displayBuffalo("none"),2000);
            }
            catch{
                console.log("can't find image");
            }
        }
        
        
            
        
    }
}
function typing(text){
    var div = document.getElementById("sass");
    div.innerHTML = "hello";
}




