const boardSize = 10; // bigger board
const board = document.getElementById('game-board');
let cells = [];
let currentPlayer = 'blue';

function createBoard() {
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.count = 0;
        cell.dataset.owner = '';
        cell.addEventListener('click', () => handleCellClick(cell));
        cells.push(cell);
        board.appendChild(cell);
    }
}

function handleCellClick(cell) {
    if (cell.dataset.owner !== '' && cell.dataset.owner !== currentPlayer) return;

    let count = parseInt(cell.dataset.count) + 1;
    cell.dataset.count = count;
    cell.dataset.owner = currentPlayer;

    updateCellUI(cell);

    if (count >= 3) {
        cell.dataset.count = 0;
        cell.dataset.owner = '';
        updateCellUI(cell);
    }

    currentPlayer = currentPlayer === 'blue' ? 'yellow' : 'blue';
}

function updateCellUI(cell) {
    const count = parseInt(cell.dataset.count);
    const owner = cell.dataset.owner;
    cell.className = 'cell';

    if (owner) {
        cell.classList.add(owner);
    }

    if (count === 3) {
        cell.innerHTML = '💣';
        cell.classList.add('bomb');
    } else {
        cell.textContent = count > 0 ? count : '';
    }
}

createBoard();
