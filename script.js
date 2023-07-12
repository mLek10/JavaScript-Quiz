
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score
const questions = [
    {
        question: "What does JS stand for?",
        choices: ["JavaScript", "JavaSuper", "JustScript"],
        answer: 0
    },
    {
        question: "What is the correct way to declare a JavaScript variable?",
        choices: ["var myVariable", "let myVariable", "const myVariable", "All of the above"],
        answer: 0
    },
    // Add more questions
];

let questionIndex = 0;
let timer = 60;
let score = 0;
let timerId;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const timerEl = document.getElementById('timer');
const startButton = document.getElementById('start');

function startQuiz() {
    startButton.disabled = true;
    questionIndex = 0;
    score = 0;
    timer = 60;
    feedbackEl.textContent = '';

    showQuestion();
    startTimer();

}

function showQuestion() {
    const currentQuestion = questions[questionIndex];
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = '';

    currentQuestion.choices.forEach(function (choice, index) {
        const li = document.createElement('li');
        li.textContent = choice;
        choicesEl.appendChild(li);

        li.addEventListener('click', function () {
            const selectedAnswer = index;
            checkAnswer(selectedAnswer);
        });
    });
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[questionIndex];

    if (selectedAnswer === currentQuestion.answer) {
        score++;
        feedbackEl.textContent = 'Correct!';
    } else {
        timer -= 10;
        feedbackEl.textContent = 'Wrong!';
    }

    questionIndex++;

    if (questionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timerId = setInterval(function () {
        timer--;
        timerEl.textContent = timer;

        if (timer <= 0) {
            clearInterval(timerId);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timerId);
    questionEl.textContent = '';
    choicesElinnerHTML = '';
    feedbackEl.textContent = `Quiz Over! Your score: ${score}`;

    const initials = prompt('Enter your initials:');
    saveScore(initials, score);
}

function saveScore(initials, score) {
    localStorage.setItem("score", JSON.stringify(score));

    console.log(`Initials: ${initials}, Score: ${score}`);
}

startButton.addEventListener('click', startQuiz);