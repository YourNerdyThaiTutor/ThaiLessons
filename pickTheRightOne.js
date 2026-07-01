// Game Configuration Arrays
const middleConsonants = ["ก","จ","ด","ต","บ","ป","อ"];
const singleLowConsonants = ["ง","ญ","น","ย","ณ","ร","ว","ม","ฬ","ล"];
const pairedLowConsonants = ["ค","ช","ซ","ท","พ","ฟ","ฮ"];
const pairedHighConsonants = ["ข","ฉ","ส","ถ","ผ","ฝ","ห"];
const tones = ["","่","้","๊","๋"];
const vowels = ["า","อ"];

// Global State
let consonants = middleConsonants; // Current active pool
let choices = [];
let correct = "";
let score = 0;
let streak = 0;
let correctIndex = 0;
let miss = 0;
let current_tone = 0;
let alreadyWrong = false;
let consonantPool = []; // Master deck tracking variable

// Configuration options updated via setupGame
let folder = "";
let type_of_choices = "words";
let answer_map = null;
let limit_choices = null;

const div = document.getElementById("answers");

function generateChoiceButton(answer) {
    const x = document.createElement("BUTTON");
    const t = document.createTextNode(answer);
    x.appendChild(t);
    x.id = answer;
    x.onclick = function() { checkAnswer(answer); };
    div.appendChild(x);
}

// Helper to draw buttons cleanly once choice selection is completely validated
function renderButtons() {
    while (div.firstChild) {
        div.firstChild.remove();
    }
    for (let i = 0; i < choices.length; i++) {
        generateChoiceButton(choices[i]);
    }
}

function generateAnswerChoices() {
    choices = [];
    current_tone = 0;

    if (limit_choices === null) {
        for (let i = 0; i < consonants.length; i++) {
            choices.push(consonants[i]);
        }
    } else {
        RandomizeChoices(); // Populates 'choices' with up to limit_choices items
    }
    // We defer button rendering to createQuestion() once the correct answer is locked in!
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function RandomizeChoices() {
    const r = Math.floor(Math.random() * (consonants.length / limit_choices) + 1);
    for (let i = 0; i < limit_choices; i++) {
        choices.push(consonants[(correctIndex + (i * r)) % consonants.length]);
    }
    shuffleArray(choices);
}

function checkAnswer(txt) {
    if (txt === correct) {
        document.getElementById(txt).style.background = '#00ff00';
        
        if (!alreadyWrong) {
            score++;
            streak++;
            document.getElementById("score").textContent = "Score: " + score;
            document.getElementById("streak").textContent = "Streak: " + streak;

            updateLocalStorage(false);
            
            try {
                const celebrate = document.getElementById("celebrate");
                celebrate.value = streak;
                celebrate.click();
            } catch (e) {
                console.log("no celebrate element");
            }
        } else {
            streak = 0;
            document.getElementById("streak").textContent = "Streak: " + streak;
        }
            
        alreadyWrong = false;
        setTimeout(() => startGame(), 700);
        document.getElementById("helper").textContent = "click here to hear all choices";
    } else {
        miss++;
        try {
            const disappointment = document.getElementById("d");
            disappointment.value = miss;
            disappointment.click(); 
        } catch (e) {
            console.log("no disappointment element");
        }
        document.getElementById(txt).style.background = '#ff3333';
        alreadyWrong = true;

        updateLessonAndAnswerLocalStorage(correct, true);
    }
}

function createQuestion() {
    // 1. Refill master deck from consonants when empty
    if (consonantPool.length === 0) {
        consonantPool = [...consonants]; 
        shuffleArray(consonantPool);  
    }

    // 2. Pop unplayed item cleanly out of the master pool
    correct = consonantPool.pop();
    
    // 3. FORCE the correct answer into visible button choices if it's missing
    if (!choices.includes(correct)) {
        if (limit_choices !== null) {
            // Overwrite a random slot with our guaranteed target
            let replaceIndex = Math.floor(Math.random() * choices.length);
            choices[replaceIndex] = correct;
        } else {
            choices.push(correct);
        }
    }

    // 4. Update the tracker index position
    correctIndex = choices.indexOf(correct);

    // 5. Build HTML choice buttons on screen now that they match
    renderButtons();

    // Audio source processing
    let src = "";
    if (type_of_choices === "consonant") {
        src = folder + correct + "อ" + ".mp3";
    } else if (type_of_choices === "words") {
        src = folder + correct + ".mp3";
    } else if (answer_map != null) {
        src = folder + answer_map[correct] + ".mp3";
    }
    
    const audio = document.getElementById('audio');
    const source = document.getElementById('audioSource');
    if (source && audio) {
        source.src = src;
        audio.load();
        audio.play();
    }
}

function startGame() {
    generateAnswerChoices();
    createQuestion();
}

function playAllTones() {
    document.getElementById("helper").textContent = "play next";
    const button = choices[current_tone];
    
    const targetBtn = document.getElementById(button);
    if (targetBtn) targetBtn.style.background = '#00a5f6';
    
    let src = "";
    if (type_of_choices === "consonant") {
        src = folder + button + "อ" + ".mp3";
    } else if (type_of_choices === "words") {
        src = folder + button + ".mp3";
    } else if (answer_map != null) {
        src = folder + answer_map[button] + ".mp3";
    }
    
    const audio = document.getElementById('helper_audio');
    const source = document.getElementById('helper_audioSource');
    
    if (source && audio) {
        source.src = src;
        audio.load();
        audio.play();
    }
    
    current_tone++;
    if (current_tone === choices.length) {
        current_tone = 0;
        document.getElementById("helper").textContent = "click here to hear all choices";
        for (let i = 0; i < choices.length; i++) {
            const btn = document.getElementById(choices[i]);
            if (btn) btn.style.background = '#ffffff';
        }
    }
}

function setupGame(_folder, _list_of_choices, _type_of_choices = "words", _answer_map = null, _limit_choices = null) {
    folder = _folder;
    consonants = _list_of_choices;
    type_of_choices = _type_of_choices;
    answer_map = _answer_map;
    limit_choices = _limit_choices;
    
    consonantPool = []; // Completely clear pool on dynamic module switch setups
    startGame();
}

function updateLocalStorage(wrong) {
    updateLessonAndAnswerLocalStorage(correct, wrong);
    try {
        updateLessonStreakLocalStorage(getLessonFromURL() + "Streak", streak);
    } catch (e) {
        console.log("failed to get url params and update streak");
    }  
}

function getLessonFromURL() {
    try {
        const url = window.location.href; 
        const filename = url.substring(url.lastIndexOf('/') + 1); 
        return filename.replace('.html', '');         
    } catch (e) {
        console.log("failed to get url params");
        return "UnknownLesson";
    }
}

function updateLessonAndAnswerLocalStorage(txt, wrong) {
    const lessonName = getLessonFromURL();

    if (wrong) {
        incrementLocalStorage(lessonName + "W");
        incrementLocalStorage(txt + "W");
    } else {
        incrementLocalStorage(lessonName + "C");
        incrementLocalStorage(txt + "C");
    }
    updateSpecificAnswerStreakLocalStorage(txt, wrong);
}

function incrementLocalStorage(key) {
    let gameData = localStorage.getItem(key) || "0";
    gameData = Number(gameData) + 1;
    localStorage.setItem(key, gameData.toString());
}

function updateLessonStreakLocalStorage(key, myStreak) {
    let gameData = localStorage.getItem(key) || "0";
    gameData = Number(gameData);
    gameData = myStreak > gameData ? myStreak : gameData;                 
    localStorage.setItem(key, gameData.toString());
}

function updateSpecificAnswerStreakLocalStorage(key, wrong) {
    let gameDataCurrStreak = localStorage.getItem(key + "CurrentStreak") ? 
        Number(localStorage.getItem(key + "CurrentStreak")) : 0;
    let gameDataLongestStreak = localStorage.getItem(key + "Streak") ? 
        Number(localStorage.getItem(key + "Streak")) : 0;

    if (wrong) {
        localStorage.setItem(key + "CurrentStreak", "0");
    } else {
        gameDataCurrStreak += 1;
        localStorage.setItem(key + "CurrentStreak", gameDataCurrStreak.toString());
        if (gameDataCurrStreak > gameDataLongestStreak) {
            localStorage.setItem(key + "Streak", gameDataCurrStreak.toString());
        }
    }
}

function SetLessonStatNames() {
    const lessonName = getLessonFromURL();
    const statNames = lessonName + "," + consonants.toString();
    localStorage.setItem(lessonName, statNames);
}

function openIframePopup(url) {
    SetLessonStatNames();

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.width = '80vw';
    iframe.style.height = '80vh';
    iframe.style.border = 'none';

    const popupContent = document.getElementById('popupContent');
    popupContent.insertBefore(iframe, popupContent.lastChild); 

    document.getElementById('popupContainer').style.display = 'block';
}

function closePopup() {
    const popupContainer = document.getElementById('popupContainer');
    const popupContent = document.getElementById('popupContent');
    const iframe = popupContent.querySelector('iframe');

    if (iframe) {
        popupContent.removeChild(iframe);
    }
    popupContainer.style.display = 'none';
}

document.getElementById("helper").onclick = function() { playAllTones(); };