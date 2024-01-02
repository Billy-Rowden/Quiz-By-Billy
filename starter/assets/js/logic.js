const startButton = document.getElementById('start');
const displayTime = doscument.getElementById('time');
const questionTitle = document.getElementById('question-title');
const choices = document.getElementById('choices');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const inputInitials = document.getElementById('initials');
const submitButton = document.getElementById('submit');
const feedback = document.getElementById('feedback');

let timer;
let timeLeft = 60; 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    
}

function showQuestion() {
    
}

function checkAnswer(index) {

}

function startTimer() {

}

function endQuiz() {

}

startButton.addEventListener('click', startQuiz);

submitButton.addEventListener('click', () => {
    const initials = inputInitials.value.trim();
    if (initials !== '') {
        window.location.href = 'highschore.html';
    } else {
        alert('Please enter your initials.');
    }
});


// Each question needs the following:
  // Question text
  // Set of answers
  // Which answer is correct

// Landing page:
  // Explanation of the quiz
  // !Start button -> needs variable

// Click the start button:
  // Landing page goes away
  // !Timer starts -> needs variable to display the timer
  // !The first question appears (with its answers) -> need a variable for title of question and a variable for the options

// For each question:
  // User clicks an answer
  // Their choice is compared to the correct answer as stored in the question's object
  // If correct, tell them
  // If incorrect, tell them AND subtract time from the timer
  // Optional: play a sound for correct or incorrect
  // Either way, the question disappears after a few seconds and the next question appears

// After the last question:
  // Timer stops
  // Question disappears
  // Form appears for user to enter their initials
  // !Display their score -> variable for end of quiz screen, for final score

// User submits form
  // !Initials and score get stored in local storage -> variable for a name/initials input and a variable for submit button
  // User is taken to the high scores page
  // !High scores are listed, sorted highest to lowest -> need variable for feedback page
  // User has option to take the quiz again