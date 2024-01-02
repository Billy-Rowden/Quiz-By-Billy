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
  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.title;
  choices.innerHTML = '';

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = `${index + 1}. ${choice}`;
    button.classList.add('choice');
    button.onclick = () => checkAnswer(index);
    choices.appendChild(button);
  });
}

function checkAnswer(index) {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.answer;
  const correctSound = new Audio('./assets/sfx/correct.wav');
  const incorrectSound = new Audio ('./assets/sfx/incorrect.wav')

  if (index === correctAnswer) {
    score += 10;
    feedback.textContent = 'Correct!';
    correctSound.play();
  } else {
      timeLeft -= 10;
      feedback.textContent = 'Wrong! -10 seconds';
      incorrectSound.play();
  }

  feedback.classList.remove('hide');
  setTimeout(() => {
    feedback.classList.add('hide');
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
};

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    displayTime.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
}, 1000);
};

function endQuiz() {
  clearInterval(timer);
  hideElement(getElement('questions'));
  showElement(endScreen);
  finalScore.textContent = score;
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