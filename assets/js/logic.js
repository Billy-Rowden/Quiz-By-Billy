const getElement = (id) => document.getElementById(id); // refactored code to make variables list more readable

const startButton = getElement('start');
const displayTime = getElement('time');
const questionTitle = getElement('question-title');
const choices = getElement('choices');
const endScreen = getElement('end-screen');
const finalScore = getElement('final-score');
const inputInitials = getElement('initials');
const submitButton = getElement('submit');
const feedback = getElement('feedback');

startButton.addEventListener('click', startQuiz); // button to start the quiz

let timer;
let timeLeft = 60; // defines the amount of time at the start of the quiz
let currentQuestionIndex = 0; // starts at question 1 or position 0 of the questions array
let score = 0;

const hideElement = (element) => element.classList.add('hide');
const showElement = (element) => element.classList.remove('hide');

function startQuiz() {
    startButton.style.display = 'none';
    // hides the start screen and shows the questions, and starts the timer counting down
    hideElement(getElement('start-screen')); 
    showElement(getElement('questions'));
    showQuestion();
    startTimer();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex]; // shows the current question
  questionTitle.textContent = currentQuestion.title; // shows the title element of the current question object in the questions array
  choices.innerHTML = '';

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.textContent = `${index + 1}. ${choice}`;
    button.classList.add('choice');
    button.onclick = () => {
      checkAnswer(index);
      disableButtons(); // disables a button so that the user cannot spam the buttons to gain more points from one question or lose more than 10 seconds per wrong answer.
    };
    choices.appendChild(button);
  });
}

// function to disable the buttons for all choices once the user selects 1.
function disableButtons() {
  const buttons = document.querySelectorAll('.choice');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

function checkAnswer(index) {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.answer;
  const correctSound = new Audio('./assets/sfx/correct.wav');
  const incorrectSound = new Audio('./assets/sfx/incorrect.wav')

// if loop to give 10 points to user for a correct answer, or lose 10 seconds for an incorrect answer.
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

//function to start a timer counting down in 1 second increments, and to end quiz if the timer hits 0 or less.
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    displayTime.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
}, 1000);
};

// function where if the timer hits 0, the timer is cleared, the questions are hidden, and the end screen is shown along with the user's final score
function endQuiz() {
  clearInterval(timer);
  hideElement(getElement('questions'));
  showElement(endScreen);
  finalScore.textContent = score;
};

// Adds a button for the user to add their initials and then stores the initials and score data in an object
submitButton.addEventListener('click', () => {
  const initials = inputInitials.value.trim();
  const scoreData = {
    initials: initials,
    score: score
    };

    // stores the scores in descending order to local storage and changes the screen to show the highscore HTML page.
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(scoreData);
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = 'highscores.html';
    });