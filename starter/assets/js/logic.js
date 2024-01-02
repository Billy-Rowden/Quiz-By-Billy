const getElement = (id) => document.getElementById(id);

const startButton = getElement('start');
const displayTime = getElement('time');
const questionTitle = getElement('question-title');
const choices = getElement('choices');
const endScreen = getElement('end-screen');
const finalScore = getElement('final-score');
const inputInitials = getElement('initials');
const submitButton = getElement('submit');
const feedback = getElement('feedback');

startButton.addEventListener('click', startQuiz);

let timer;
let timeLeft = 60; 
let currentQuestionIndex = 0;
let score = 0;

const hideElement = (element) => element.classList.add('hide');
const showElement = (element) => element.classList.remove('hide');

function startQuiz() {
    startButton.style.display = 'none';
    hideElement(getElement('start-screen'));
    showElement(getElement('questions'));
    showQuestion();
    startTimer();
}

function showQuestion() {

}

function checkAnswer(index) {

};

function startTimer() {

};

function endQuiz() {

};

submitButton.addEventListener('click', () => {
  const initials = inputInitials.value.trim();
  const scoreData = {
    initials: initials,
    score: score
    };

    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(scoreData);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = 'highscores.html';
    });