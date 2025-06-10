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
var l = ["กร","ขร","คร","ตร","ปร","พร","กล","ขล","คล","ปล","ผล","พล","กว","ขว","คว","จ","ซ","ศ","ส"];
var div = document.getElementById("answers");
var choices = [];
var selected_word = "";
var correct ="";
var score = 0;
var alreadyWrong = false;
var streak = 0;
var groups ={
    "กร":["กรอง","กราบ","โกรธ","กรีดกราย","แกร่ง","ไกร"],
    "ขร":["ขรัว","ขรุขระ","ขรม","ขริบ"],
    "คร":["ครู","ใคร","ครอบครัว","ครอง","ครบ","ครัน","คร่าว","ครับ","ครัว"],
    "ตร":["ตรวจ","ตริตรอง","ตรี","ตรึงตรา","ตรอก","ตรง","ตระ"],
    "ปร":["ปราณ","เปรม","เปราะ","เปรี้ยว","เปรียบ","ประปราย"],
    "พร":["พริ้มเพรา","พรุ่ง","พราย","พริก","พร้อม","พรวน","พริ้ว","พริ้ง"],
    "กล":["กลอง","กลมเกลียว","กล่อม","กลาดเกลื่อน","กล้วย","กล้า"],
    "ขล":["ขลาด","เขลา","โขลง","โขลน","ขลัง","ขลิบ","ขลุกขลิก","ขลุ่ย"],
    "คล":["คลำ","คลาดเคลื่อน","คล้าย","คล้อย","คลาย","คลัง","คลอง"],
    "ปล":["ปลา","เปลี่ยน","ปลื้ม","ปลัก","ปลวก","ปลอก","ปลอด","ปล่อย"],
    "ผล":["ผลาญ","ผลุง","ผลุบ","เผลอ","โผล่","ผลีผลาม"],
    "พล":["พลอย","พลาด","เพลิดเพลิน","พลิกแพลง","เพลง","พลาย"],
    "กว":["กวาด","กวัดแกว่ง","กวาง","เกวียน","กว่า","กวัก","ไกว","กว้าง"],
    "ขว":["ขวา","ขวาน","ขวิด","ขวักไขว่","ขวนขวาย","ขวัญ","ขว้าง"],
    "คว":["ควาน","ความ","ควาย","ควัก","ควัน","คว้า","เคว้งคว้าง"],
    "จ":["จริง"],
    "ซ":["ไซร้","ทราม","แทรก","โทรม","ทรัพย์","ทราบ","ทราย","ทรุด","ทรวง","ไทร", "มัทรี","อินทรีย์","พุทรา","เทริด","อินทรี","นนทรี","ทรวด","ฉะเชิงเทรา"],
    "ศ":["เศร้า","ศรี","ศรัทธา","เศรษฐี","อาศรม"],
    "ส":["สร้อย","เสริม","สร้าง","สระ","สรง","สร่าง","เสร็จ","เสริฐ","แสร้ง"]
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
    if(correct.length == 2){
        generateChoiceButton(correct);
        generateChoiceButton(correct[0]);
    }
    else{
        if(correct==="ซ" && selected_word!="ไซร้"){
            generateChoiceButton("ทร");
            generateChoiceButton(correct);
        }
        else{
            generateChoiceButton(correct+"ร");
            generateChoiceButton(correct);
        }
        
        
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


startGame();
document.getElementById("helper").onclick = function(){playAllTones();};