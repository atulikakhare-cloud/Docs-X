let gameState = {
  docceeBalance: 0,
  docceeSpent: 0,
  timeSpentMinutes: 0,
  gamesWon: 0
};

document.addEventListener('DOMContentLoaded', () => {
  loadSavedData();
  updateUI();
  
  setInterval(() => {
    gameState.timeSpentMinutes += 1;
    saveData();
    updateUI();
  }, 60000);
});

function loadSavedData() {
  const saved = localStorage.getItem('docsx_game_data');
  if (saved) {
    try {
      gameState = JSON.parse(saved);
    } catch (e) {
      
    }
  }
}

function saveData() {
  localStorage.setItem('docsx_game_data', JSON.stringify(gameState));
}

function recordGameWin(gameName, rewardAmount) {
  gameState.docceeBalance += rewardAmount;
  gameState.gamesWon += 1;
  saveData();
  updateUI();
}

function spendDoccee(amount) {
  if (gameState.docceeBalance >= amount) {
    gameState.docceeBalance -= amount;
    gameState.docceeSpent += amount;
    saveData();
    updateUI();
    return true;
  }
  return false;
}

function updateUI() {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    statusEl.innerText = `Doccee 🪙: ${gameState.docceeBalance}`;
  }

  const lbTime = document.getElementById('lb-time');
  const lbWins = document.getElementById('lb-wins');
  const lbBalance = document.getElementById('lb-balance');
  const lbSpent = document.getElementById('lb-spent');

  if (lbTime) lbTime.innerText = `${gameState.timeSpentMinutes} mins`;
  if (lbWins) lbWins.innerText = `${gameState.gamesWon} wins`;
  if (lbBalance) lbBalance.innerText = `${gameState.docceeBalance} 🪙`;
  if (lbSpent) lbSpent.innerText = `${gameState.docceeSpent} 🪙`;
}
