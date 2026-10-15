let currentUser = null;
let usersDb = {};

let gameState = {
  docceeBalance: 0,
  docceeSpent: 0,
  timeSpentMinutes: 0,
  gamesWon: 0
};

document.addEventListener('DOMContentLoaded', () => {
  loadUsersDb();
  checkSession();

  setInterval(() => {
    if (currentUser && gameState) {
      gameState.timeSpentMinutes += 1;
      saveCurrentUserData();
      updateUI();
    }
  }, 60000);
});

function loadUsersDb() {
  const db = localStorage.getItem('docsx_users_db');
  if (db) {
    try {
      usersDb = JSON.parse(db);
    } catch (e) {}
  }
}

function saveUsersDb() {
  localStorage.setItem('docsx_users_db', JSON.stringify(usersDb));
}

function checkSession() {
  const sessionUser = localStorage.getItem('docsx_active_user');
  if (sessionUser && usersDb[sessionUser]) {
    currentUser = sessionUser;
    gameState = usersDb[currentUser].data;
    document.getElementById('authOverlay').style.display = 'none';
    updateUI();
  } else {
    document.getElementById('authOverlay').style.display = 'flex';
  }
}

function showAuthForm(type) {
  document.getElementById('authHome').style.display = 'none';
  document.getElementById('signupForm').style.display = type === 'signup' ? 'flex' : 'none';
  document.getElementById('loginForm').style.display = type === 'login' ? 'flex' : 'none';
}

function resetAuthMenu() {
  document.getElementById('authHome').style.display = 'flex';
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'none';
}

function handleAuthSubmit(e, type) {
  e.preventDefault();
  if (type === 'signup') {
    const u = document.getElementById('su-user').value.trim();
    const p = document.getElementById('su-pass').value;
    if (!u || !p) return;
    if (usersDb[u]) {
      alert('Username already exists!');
      return;
    }
    usersDb[u] = {
      password: p,
      data: { docceeBalance: 0, docceeSpent: 0, timeSpentMinutes: 0, gamesWon: 0 }
    };
    saveUsersDb();
    loginSession(u);
  } else if (type === 'login') {
    const u = document.getElementById('li-user').value.trim();
    const p = document.getElementById('li-pass').value;
    if (!usersDb[u] || usersDb[u].password !== p) {
      alert('Invalid username or password!');
      return;
    }
    loginSession(u);
  }
}

function loginSession(username) {
  currentUser = username;
  gameState = usersDb[username].data;
  localStorage.setItem('docsx_active_user', username);
  document.getElementById('authOverlay').style.display = 'none';
  resetAuthMenu();
  updateUI();
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('docsx_active_user');
  document.getElementById('authOverlay').style.display = 'flex';
}

function saveCurrentUserData() {
  if (currentUser && usersDb[currentUser]) {
    usersDb[currentUser].data = gameState;
    saveUsersDb();
  }
}

function recordGameWin(gameName, rewardAmount) {
  if (!currentUser) return;
  gameState.docceeBalance += rewardAmount;
  gameState.gamesWon += 1;
  saveCurrentUserData();
  updateUI();
}

function spendDoccee(amount) {
  if (!currentUser) return false;
  if (gameState.docceeBalance >= amount) {
    gameState.docceeBalance -= amount;
    gameState.docceeSpent += amount;
    saveCurrentUserData();
    updateUI();
    return true;
  }
  return false;
}

function updateUI() {
  const userBadge = document.getElementById('userBadge');
  if (userBadge) {
    userBadge.innerText = currentUser ? `User: ${currentUser}` : 'User: Guest';
  }

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
