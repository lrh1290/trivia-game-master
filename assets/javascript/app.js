var currentQuestion = '';
var currentChoices = [];
var correct = 0;
var incorrect = 0;
var skipped = 0;
var clock;
var timeholder;
var waitTime = 1000;
var time = 10;
var placeholder = 0;


var questions = [
    {
        question: "4 - 3",
        choices: ['1', '2', '3', '4'],
        correct: 0,
    },
    {
        question: "3 - 1",
        choices: ['1', '2', '3', '4'],
        correct: 1,
    },
    {
        question: "1 + 2",
        choices: ['1', '2', '3', '4'],
        correct: 2,
    },
    {
        question: "2 + 2",
        choices: ['1', '2', '3', '4'],
        correct: 3,
    }
];

function updateQuestion() {
    timer();
    $("#answer-box").hide();
    $("#question-box").show();
    if (placeholder === questions.length) {
        endGame();
        return;
    } else {
        currentQuestion = questions[placeholder].question;
        for (var i = 0; i < 4; i++) {
            currentChoices[i] = questions[placeholder].choices[i];
        }
    };
    var questionNumber = placeholder + 1
    $("#placeholder").text(questionNumber);
    $("#current-question").text(currentQuestion);
    $("#0").text(currentChoices[0]);
    $("#1").text(currentChoices[1]);
    $("#2").text(currentChoices[2]);
    $("#3").text(currentChoices[3]);
};

function updateAnswer(x) {
    if (placeholder === questions.length) {
        endGame();
    } else {
        timeholder = setTimeout(updateQuestion, waitTime);
    };

    $("#question-box").hide();
    $("#answer-box").show();

    var correctplaceholder = questions[placeholder].correct;

    if (x == questions[placeholder].correct) {
        $("#evaluate").html("<h2 class = container-text>CORRECT</h2>");     
    } else if (x == "timeout") {
        $("#evaluate").html("<h2 class = container-text>TIME UP</h2>")
    } else {
        $("#evaluate").html("<h2 class = container-text>INCORRECT</h2>");
    }
    $(".correct-text").text(correct);
    $(".incorrect-text").text(incorrect);
    $(".skipped-text").text(skipped);
    $("#correct-answer-id").text(questions[placeholder].choices[correctplaceholder]);
    time = 0;
}

function checkAnswer(answer) {
    if (placeholder == questions.length) {
        return;
    }
    if (answer === questions[placeholder].correct) {
        correct++;
    } else if (answer == "timeout") {
        skipped++;
    } else {
        incorrect++;
    }
    clearInterval(clock);
    time = 10;
    updateAnswer(answer);
    placeholder++;
    $("#question-box").hide();
};

function timer() {
    time = 10;
    $("#timer").html(time + " seconds");
    clock = setInterval(countdown, 1000);
    function countdown() {
        if (time > 1) {
            time--;
        } else {
            clearInterval(clock);
            checkAnswer("timeout");
        };
        $("#timer").html(time + " seconds");
    };
};

function startGame() {
    $("#start").hide();
    $("#header-box").hide();
    updateQuestion();
};

function endGame() {
    $("#question-box").hide();
    $("#answer-box").hide();
    $("#score-box").show();
}

$("#question-box").hide();
$("#answer-box").hide();
$("#score-box").hide();

$(document).ready(function () {

    $("#start").on("click", function () {
        startGame();
        $("#question-box").show();
    });

    $(".choices").on("click", function () {
        var userChoice = parseInt($(this).attr("id"));
        checkAnswer(userChoice);
    });

    $("#restart").on("click", function () {
        placeholder = 0;
        currentQuestion = '';
        currentChoices = [];

        clearTimeout(timeholder);
        clearInterval(clock);

        $("#score-box").hide();
        $(".correct-text").text(correct);
        $(".incorrect-text").text(incorrect);
        $(".skipped-text").text(skipped);

        updateQuestion();
        $("#question-box").show();
    });

});