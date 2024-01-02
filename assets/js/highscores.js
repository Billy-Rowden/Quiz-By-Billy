const getElement = (id) => document.getElementById(id);

document.addEventListener('DOMContentLoaded', function() {
  const highscoresList = getElement('highscores');
  const clearButton = getElement('clear');

  clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the high scores?')) {
      localStorage.removeItem('highScores');
      renderHighscores();
    }
  });

  renderHighscores(); 

  function renderHighscores() {;
    highscoresList.innerHTML = '';

    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    highScores.sort((a, b) => b.score - a.score);

    highScores.forEach((scoreData, index) => {
      const li = document.createElement('li');
      li.textContent = `${scoreData.initials} - ${scoreData.score}`;
      highscoresList.appendChild(li);
    });
  }

});