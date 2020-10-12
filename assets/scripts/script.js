var rand = 0;
var word = "";
var numWrong = 0;
var numRight = 0;
var phraseLength = 0;
var numChar = 0;
var words = ["Early bird gets the worm",
    "Read between the lines",
    "I can eat a horse",
    "Twenty-four seven",
    "Cat got your tounge",
    "One in one million",
    "I beg to differ",
    "Easier said than done",
    "Add insult to injury",
    "Don't cry over spilled milk",
    "Curiosity killed the cat",
    "Two peas in a pod",
    "That's the last straw",
    "Piece of cake",
    "Speak of the devil",
    "Go the whole nine yards",
    "An eye for an eye",
    "Hit the hay",
    "Stab someone in the back",
    "Quit cold turkey",
    "Cut to the chase",
    "Best of both worlds",
    "Kill two birds with one stone",
    "Break a leg",
    "Hit the nail on the head",
    "Kick the bucket",
    "Frankly, my dear, I don't give a damn",
    "May the Force be with you",
    "Titanic",
    "After all this time? Always."];

function sp() {
    document.getElementById('introPage').style.display = "none";
    rand = Math.floor(Math.random() * words.length);
    word = words[rand];
    hangman();
}

function hangman() {

    x = word.length;
    y = x - 1;
    var spaces = 0;
    while (x > 0) {
        numChar++;
        var letter = word.substring(y, x);
        if (letter === " ") {
            document.getElementById('letter' + x).innerHTML = "&nbsp;";
            document.getElementById('letter' + x).style.visibility = "hidden";
            document.getElementById('letter' + x).style.display = "block";
            document.getElementById('underline' + x).style.display = "block";
            spaces++;
        }
        else if (letter === "?" || letter === "!" || letter === "," || letter === "." || letter === "-" || letter === "'") {
            document.getElementById('letter' + x).innerHTML = letter;
            document.getElementById('letter' + x).style.display = "block";
            document.getElementById('underline' + x).style.display = "block";
            spaces++;
        }
        else {
            document.getElementById('letter' + x).innerHTML = letter;
            document.getElementById('letter' + x).style.visibility = "hidden";
            document.getElementById('underline' + x).style.display = "block";
            document.getElementById('underline' + x).style.borderBottom = "2px solid black";
        }
        x--;
        y--;
    }
    phraseLength = word.length - spaces;

    document.getElementById('gamePage').style.display = "block";
    fly();
    splitWords();

}

function fly() {
    console.log(1)
    function ground() {
        console.log(2)
        var tl = new TimelineMax({
            repeat: -1
        });

        tl.to("#gamePage .ground", 20, {
            backgroundPosition: "1301px bottom",
            force3D: true,
            rotation: 0.01,
            z: 0.01,
            autoRound: false,
            ease: Linear.easeNone
        });

        return tl;
    }

    function sky() {
        console.log(2)
        var tl = new TimelineMax({
            repeat: -1
        });

        tl.to("#sky", 52, {
            backgroundPosition: "-2247px bottom",
            force3D: true,
            rotation: 0.01,
            z: 0.01,
            //autoRound:false,
            ease: Linear.easeNone
        });

        return tl;
    }

    var masterTL = new TimelineMax({
        repeat: -1
    });

    // window load event makes sure image is 
    // loaded before running animation
    window.onload = function () {

        masterTL
            .add(ground(), 0)
            .add(sky(), 0)
            .timeScale(0.7)
            .progress(1).progress(0)
            .play();

    };
}

function splitWords() {
    var placeKeep = 0;
    var countBack = 16;
    if (numChar > 15) {
        while (countBack > 1) {
            if (document.getElementById('letter16').innerHTML == "&nbsp;") {
                document.getElementById('underline16').style.width = "0px";
                document.getElementById('underline16').style.marginRight = "0px";
            }
            if (document.getElementById('letter' + countBack).innerHTML == "&nbsp;") {
                document.getElementById('underline' + countBack).style.width = (document.getElementById('underline1').offsetWidth) * (16 - countBack) + "px";
                placeKeep = countBack;
                countBack = 0;
            }
            countBack--;
        }
    }
    for (x = 0; x < 8; x++) {
        countBack = 15 + placeKeep;
        if (numChar > countBack) {
            while (countBack > 1) {
                if (document.getElementById('letter' + countBack).innerHTML == "&nbsp;") {
                    document.getElementById('underline' + countBack).style.width = (document.getElementById('underline1').offsetWidth * ((16 + placeKeep) - countBack)) + "px";
                    placeKeep = countBack;
                    countBack = 0;
                }
                countBack--;
            }
        }
    }

}

function guessLetter() {
    var correct = 0;
    var target = event.target || event.srcElement;
    target.style.visibility = "hidden";
    var lower = target.id;
    var upper = document.getElementById(lower).getAttribute('value');
    var results = document.getElementById('results');
    var ul1 = document.getElementById('underline1').offsetWidth;
    for (a = 1; a < 101; a++) {
        if (document.getElementById('letter' + a).innerHTML === upper || document.getElementById('letter' + a).innerHTML === lower) {
            document.getElementById('letter' + a).style.visibility = "visible";
            correct++;
            numRight++;
        }
    }
    if (correct == 0) {
        numWrong++;
        hang();
    }
    if (numWrong == 6) {
        results.style.visibility = "visible";
        results.style.color = "red";
        results.innerHTML = "You can't miss another letter!";
        if (ul1 == 50) {
            results.style.lineHeight = "70px";
            results.style.fontSize = "30px";
        }
        if (ul1 == 28) {
            results.style.lineHeight = "50px";
            results.style.fontSize = "25px";
        }
        if (ul1 == 18) {
            results.style.lineHeight = "40px";
            results.style.fontSize = "20px";
        }
    }
    if (numWrong == 7) {
        results.innerHTML = "You lose!<br>Keep guessing until you get it right.";
        document.getElementById('again').style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if (ul1 == 50) {
            results.style.lineHeight = "40px";
        }
        if (ul1 == 28) {
            results.style.lineHeight = "25px";
        }
        if (ul1 == 18) {
            results.style.lineHeight = "20px";
        }
    }
    if (numRight == phraseLength) {
        win();
    }
}

function win() {
    var ul1 = document.getElementById('underline1').offsetWidth;
    var again = document.getElementById('again');
    var results = document.getElementById('results');
    results.style.visibility = "visible";
    results.style.color = "#00b100";
    if (numWrong > 6) {
        results.innerHTML = "It's about time you figured it out...";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if (ul1 == 50) {
            results.style.lineHeight = "70px";
            results.style.fontSize = "30px";
        }
        if (ul1 == 28) {
            results.style.lineHeight = "50px";
            results.style.fontSize = "25px";
        }
        if (ul1 == 18) {
            results.style.lineHeight = "40px";
            results.style.fontSize = "20px";
        }
    }
    else {
        results.innerHTML = "You win!";
        document.getElementById('letterBank').style.display = "none";
        again.style.display = "block";
        document.getElementById('home').style.display = "block";
        document.getElementById('vidSent').style.display = "block";
        if (ul1 == 50) {
            again.style.marginTop = "75px";
            results.style.marginTop = "75px";
            results.style.fontSize = "200px";
        }
        if (ul1 == 28) {
            again.style.marginTop = "50px";
            results.style.marginTop = "40px";
            results.style.fontSize = "100px";
        }
        if (ul1 == 18) {
            again.style.marginTop = "40px";
            results.style.marginTop = "15px";
            results.style.fontSize = "75px";
        }
    }
}

function hang() {
    var ctx = document.getElementById("hangman").getContext('2d');
    if (numWrong == 1) {
        document.getElementById("hangman").src = "Ballon_1.png";
    }
    if (numWrong == 2) {
        document.getElementById("hangman").src = "Ballon_2.png";
    }
    if (numWrong == 3) {
        document.getElementById("hangman").src = "Ballon_3.png";
    }
    if (numWrong == 4) {
        document.getElementById("hangman").src = "Ballon_1.png";
    }
}

function reset() {
    var ul1 = document.getElementById('underline1').offsetWidth;
    var results = document.getElementById('results');
    var again = document.getElementById('again');
    for (a = 1; a < 101; a++) {
        document.getElementById('letter' + a).innerHTML = "&nbsp;";
        document.getElementById('underline' + a).style.width = ul1 + "px";
        if (ul1 == 50) {
            document.getElementById('underline' + a).style.marginRight = "5px";
            results.style.height = "70px";
        }
        else if (ul1 == 28) {
            document.getElementById('underline' + a).style.marginRight = "3px";
            results.style.height = "50px";
        }
        else {
            document.getElementById('underline' + a).style.marginRight = "3px";
            results.style.height = "40px";
        }
        document.getElementById('underline' + a).style.display = "none";
        document.getElementById('underline' + a).style.borderBottom = "0px";
    }
    var bank = document.getElementById("letterBank").querySelectorAll("div");
    var cBank = document.getElementById("challengeBank").querySelectorAll("div");
    for (b = 0; b < 26; b++) {
        bank[b].style.visibility = "visible";
        cBank[b].style.visibility = "visible";
    }
    numWrong = 0;
    numRight = 0;
    phraseLength = 0;
    numChar = 0;
    results.style.marginTop = "5px";
    results.style.lineHeight = "40px";
    results.innerHTML = " ";
    document.getElementById('letterBank').style.display = "block";
    again.style.marginTop = "0px";
    again.style.display = "none";
    document.getElementById('home').style.display = "none";
    if (phrases.indexOf(word) > -1) {
        phrases.splice(rand, 1);
        phrase();
    }
    else if (movies.indexOf(word) > -1) {
        movies.splice(rand, 1);
        movie();
    }
    else if (songs.indexOf(word) > -1) {
        songs.splice(rand, 1);
        song();
    }
    else if (document.getElementById('charcount').innerHTML > 0) {
        document.getElementById('gamePage').style.display = "none";
        document.getElementById('input').value = "";
        document.getElementById('charcount').innerHTML = "0";
        document.getElementById('multiPage').style.display = "block";
    }
    else {
        challenge();
    }
}