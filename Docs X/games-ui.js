function initGamingHubUI() {
  const container = document.getElementById('gamingHubView');
  if (!container) return;

  const currentCoins = localStorage.getItem('docceeBalance') || '0';
  const gamesWon = localStorage.getItem('gamesWon') || '0';

  container.innerHTML = `
    <div style="background: #181825; padding: 20px; border-radius: 8px; border: 1px solid #313244; display: flex; flex-direction: column; gap: 20px; flex: 1; color: #cdd6f4;">
      <div style="display: flex; justify-content: space-between; align-items: center; background: #11111b; padding: 15px; border-radius: 6px; border: 1px solid #313244;">
        <div>
          <h3 style="margin: 0; color: #89b4fa;">🎮 Gaming Hub & Economy</h3>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #a6adc8;">Play games, win Doccees, and top the leaderboard!</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 16px; font-weight: bold; color: #f9e2af;">🪙 ${currentCoins} Doccees</div>
          <div style="font-size: 13px; color: #a6adc8;">Games Won: ${gamesWon}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px;">
        <div style="background: #11111b; border: 1px solid #313244; padding: 15px; border-radius: 6px; display: flex; flexDirection: column; justify-content: space-between;">
          <div>
            <h4 style="margin: 0 0 10px 0; color: #89b4fa;">❌ Tic-Tac-Toe ⭕</h4>
            <p style="font-size: 13px; color: #a6adc8; margin: 0 0 15px 0;">Classic 3x3 grid game. Win against the bot to earn 50 Doccees!</p>
          </div>
          <button onclick="startTicTacToe()" style="background: #89b4fa; color: #11111b; padding: 8px 15px; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Play Game</button>
        </div>
      </div>

      <div id="gameModalContainer" style="display: none; margin-top: 15px; background: #11111b; border: 1px solid #45475a; padding: 20px; border-radius: 6px; text-align: center;"></div>
    </div>
  `;
}

function startTicTacToe() {
  const modal = document.getElementById('gameModalContainer');
  modal.style.display = 'block';
  
  let board = ['', '', '', '', '', '', '', '', ''];
  let isGameOver = false;

  function renderBoard() {
    let html = `
      <h4 style="margin-top: 0; color: #89b4fa;">Tic-Tac-Toe Arena</h4>
      <div style="display: grid; grid-template-columns: repeat(3, 70px); gap: 5px; justify-content: center; margin: 15px 0;">
    `;
    
    board.forEach((val, idx) => {
      html += `<button onclick="makeTicMove(${idx})" style="width: 70px; height: 70px; font-size: 24px; font-weight: bold; background: #181825; color: #cdd6f4; border: 1px solid #45475a; cursor: pointer;">${val}</button>`;
    });

    html += `</div>
      <button onclick="document.getElementById('gameModalContainer').style.display='none'" style="background: #f38ba8; color: #11111b; padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer;">Close Game</button>
    `;
    modal.innerHTML = html;
  }

  window.makeTicMove = function(idx) {
    if (board[idx] !== '' || isGameOver) return;
    board[idx] = 'X';
    
    // Check user win
    if (checkWin('X')) {
      isGameOver = true;
      awardDoccees(50, "Tic-Tac-Toe Win!");
      return;
    }

    // Bot move
    let emptyCells = board.map((v, i) => v === '' ? i : null).filter(v => v !== null);
    if (emptyCells.length > 0 && !isGameOver) {
      let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomCell] = 'O';
      
      if (checkWin('O')) {
        isGameOver = true;
        alert("Bot won! Try again.");
        modal.style.display = 'none';
        return;
      }
    }
    renderBoard();
  };

  function checkWin(player) {
    const wins = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return wins.some(comb => comb.every(i => board[i] === player));
  }

  renderBoard();
}

function awardDoccees(amount, reason) {
  let currentCoins = parseInt(localStorage.getItem('docceeBalance') || '0', 10);
  let gamesWon = parseInt(localStorage.getItem('gamesWon') || '0', 10);
  
  currentCoins += amount;
  gamesWon += 1;

  localStorage.setItem('docceeBalance', currentCoins);
  localStorage.setItem('gamesWon', gamesWon);

  alert(`🎉 Congratulations! You won ${amount} Doccees!\nReason: ${reason}`);
  
  const modal = document.getElementById('gameModalContainer');
  if (modal) modal.style.display = 'none';
  
  initGamingHubUI();
}
