// add questions

const questions = [
  {
    question: "What is the symbol for an Array?",
    choices:["()", "{}", "''", "[]"],
    answer:"[]"
  },

  {
    question: "How to declare a function?",
    choices:["var function = function()", "Function name()", "Method function = ()", "class = Function()"],
    answer:"Function name()"
  },

  {
    question:"How do we us 'and' in a boolean?",
    choices:["||", "&", "&&", "*"],
    answer:"&&"
  },

  {
    question:"Inside what part of HTML do you put JavaScript?",
    choices:["<link>", "<header>", "<meta>", "<script>"],
    answer:"<script>"
  },

  {
    question:"What does a comment look like in JavaScript?",
    choices:["/comment", "*/comment", "//comment","{comment}"],
    answer:"//comment"
  },
]

var score = 0;
var nextQuestion = -1; 
var timeLeft = 0;
var timer;
var feedbackEl = document.querySelector("#feedback");

// added function to start quiz

function start() {
  timeLeft = 50;
  document.getElementById("timeLeft").innerHTML=timeLeft + "seconds";

  timer = setInterval(function() {
timeLeft--;
 document.getElementById("timeLeft").innerHTML=timeLeft + "seconds";
 if (timeLeft <= 0) {
clearInterval(timer);
alert("QUIZ IS OVER!");
quizOver();
  }
},1000);


}

// added finish quiz details
function quizOver() {
    clearInterval(timer);

      var finalDetails = `
    <h2>Great job!</h2>
    <p>Your final score is ` + totalScore + `!</p>
    <p>Please enter your initials to submit your score in the score chart.</p>
    <input type="text" id="MVP" class="initials" maxlength="3" required>
    <button onclick="saveScore()" class="score-button" title="Submit score">Submit</button>`;

    document.getElementById("start").innerHTML = finalDetails;

}

function saveScore() {
    localStorage.setItem("score", score);
    localStorage.setItem("MVP", document.getElementById('MVP').value);

    getScore();
}

function getScore() {
    var finalDetails = `
    <h2>` + localStorage.getItem("MVP") + `'s score is:</h2>
    <h1>` + localStorage.getItem("score") + `</h1><br >
    <button onclick="clearScore()" class="clear-button" title = "Clear Score and Play Again!">Clear Score and Play Again!</button>
    <button onclick="resetGame()" class="reset-button" title = "Just Play Again!">Just Play Again!</button>
    `;
    document.getElementById("start").innerHTML = finalDetails;
}

//added a game reset
function clearScore() {
  localStorage.setItem("Score", "");
  localStorage.setItem("MVP", "");

  resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    nextQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML=timeLeft + " seconds";

    window.location.reload();

    document.getElementById("start").innerHTML = finalDetails;
}

function correctAnswer() {
    totalScore += 40;

    feedbackEl.textContent = "CORRECT! That was the right answer: " + questions[nextQuestion].answer;
    feedbackEl.style.color = "green";
    feedbackEl.style.fontWeight = "bold";
    feedbackEl.style.fontSize = "100%";

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
    feedbackEl.setAttribute("class", "hide");
    }, 1500);

    nextNewQuestion();

}

function wrongAnswer() {
    timeLeft -= 25;

    if (timeLeft < 0) {
        timeLeft = 0;
    }
    feedbackEl.textContent = "WRONG! The answer was: " + questions[nextQuestion].answer;
    feedbackEl.style.color = "red";
    feedbackEl.style.fontWeight = "bold";
    feedbackEl.style.fontSize = "100%";

    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
    feedbackEl.setAttribute("class", "hide");
    }, 1500);

    nextNewQuestion();

}

function nextNewQuestion() {
    nextQuestion++;

    if (nextQuestion > questions.length - 1) {
        quizOver();
        return;
    }

    var finalDetails = "<h2>" + questions[nextQuestion].questionTitle + "</h2>"

    for (var i = 0; i < questions[nextQuestion].choices.length; i++) {
        var choiceButton = "<button onclick = \"[answerchoice]\">[CHOICE]</button>";
        choiceButton = choiceButton.replace("[CHOICE]", questions[nextQuestion].choices[i]);
            if (questions[nextQuestion].choices[i] === questions[nextQuestion].answer) {
                choiceButton = choiceButton.replace("[answerchoice]", "correctAnswer()");
            } else {
                choiceButton = choiceButton.replace("[answerchoice]", "wrongAnswer()");
            }
        finalDetails += choiceButton
    }
        document.getElementById("start").innerHTML = finalQuizDetails;
}
