let playerStats = {
  docceeBalance: 100,
  docceeSpent: 0,
  gamesWon: 0,
  timeSpentMinutes: 0
};

function loadStats() {
  const saved = localStorage.getItem('docsx_player_stats');
  if (saved) {
    playerStats = JSON.parse(saved);
  }
  updateUI();
}

function saveStats() {
  localStorage.setItem('docsx_player_stats', JSON.stringify(playerStats));
  updateUI();
}

function updateUI() {
  const coinDisplay = document.getElementById('status');
  if (coinDisplay) {
    coinDisplay.innerText = `Doccee 🪙: ${playerStats.docceeBalance}`;
  }
  updateLeaderboardUI();
}

function earnDoccee(amount) {
  playerStats.docceeBalance += amount;
  saveStats();
  alert(`Congratulations! You won ${amount} Doccee 🪙!`);
}

function spendDoccee(amount, itemName) {
  if (playerStats.docceeBalance >= amount) {
    playerStats.docceeBalance -= amount;
    playerStats.docceeSpent += amount;
    saveStats();
    alert(`Successfully purchased '${itemName}' for ${amount} Doccee!`);
    return true;
  } else {
    alert("Not enough Doccee 🪙! Play games to earn more coins.");
    return false;
  }
}

function recordGameWin(gameName, rewardCoins) {
  playerStats.gamesWon += 1;
  earnDoccee(rewardCoins);
}

setInterval(() => {
  playerStats.timeSpentMinutes += 1;
  saveStats();
}, 60000);

function updateLeaderboardUI() {
  const lbTime = document.getElementById('lb-time');
  const lbWins = document.getElementById('lb-wins');
  const lbBalance = document.getElementById('lb-balance');
  const lbSpent = document.getElementById('lb-spent');

  if (lbTime) lbTime.innerText = `${playerStats.timeSpentMinutes} mins`;
  if (lbWins) lbWins.innerText = `${playerStats.gamesWon} wins`;
  if (lbBalance) lbBalance.innerText = `${playerStats.docceeBalance} 🪙`;
  if (lbSpent) lbSpent.innerText = `${playerStats.docceeSpent} 🪙`;
}

function playSampleMiniGame() {
  recordGameWin("Lucky Clicker Game", 50);
}

window.addEventListener('DOMContentLoaded', () => {
  loadStats();
});
