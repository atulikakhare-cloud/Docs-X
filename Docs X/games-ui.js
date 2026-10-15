document.addEventListener('DOMContentLoaded', () => {
  renderGamingHub();
});

function renderGamingHub() {
  const gamesGrid = document.getElementById('gamesGrid');
  if (!gamesGrid) return;

  const gamesList = [
    { name: "Clicker Rush", reward: 50 },
    { name: "Memory Matcher", reward: 75 },
    { name: "Word Puzzle", reward: 100 },
    { name: "Math Speed Test", reward: 60 },
    { name: "Reflex Master", reward: 80 },
    { name: "Color Match", reward: 40 },
    { name: "Trivia Quiz", reward: 90 },
    { name: "Sudoku Lite", reward: 120 },
    { name: "Tile Runner", reward: 110 },
    { name: "Doccee Collector", reward: 150 }
  ];

  gamesGrid.innerHTML = gamesList.map(game => `
    <div style="background: #313244; padding: 15px; border-radius: 8px; border: 1px solid #45475a; display: flex; flex-direction: column; justify-content: space-between;">
      <h3>🎮 ${game.name}</h3>
      <p style="color: #a6adc8; margin: 10px 0;">Win to earn +${game.reward} Doccee 🪙</p>
      <button onclick="playGame('${game.name}', ${game.reward})" style="width: 100%; cursor: pointer;">Play Game</button>
    </div>
  `).join('');
}

function playGame(name, reward) {
  recordGameWin(name, reward);
}

function switchTab(tabName) {
  document.getElementById('editorSection').style.display = tabName === 'editor' ? 'flex' : 'none';
  document.getElementById('mediaSection').style.display = tabName === 'media' ? 'flex' : 'none';
  document.getElementById('gamingSection').style.display = tabName === 'gaming' ? 'flex' : 'none';

  document.querySelectorAll('.tab-btn').forEach(btn => btn.style.background = '#313244');
  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) activeBtn.style.background = '#89b4fa';
}
