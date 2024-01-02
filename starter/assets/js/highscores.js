const getElement = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', function() {
  const highscoresList = getElement('highscores');
  const clearButton = getElement('clear');

  clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the high scores?')) {
      localStorage.removeItem('highScores');
    }
  });
});