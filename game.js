
// Simplified final Munch Man game logic
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
let score = 0;
let lives = 3;

const map = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,1,0,1,0,1],
  [1,1,1,1,0,1,0,1,0,1],
  [1,0,0,1,0,0,0,1,0,1],
  [1,0,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

let player = { x: 1, y: 1 };
let enemy = { x: 8, y: 8, dir: -1 };

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const tile = map[y][x];
      if (tile === 1) {
        ctx.fillStyle = '#444';
        ctx.fillRect(x * 32, y * 32, 32, 32);
      } else if (tile === 0) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x * 32 + 16, y * 32 + 16, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x * 32, player.y * 32, 32, 32);

  ctx.fillStyle = 'red';
  ctx.fillRect(enemy.x * 32, enemy.y * 32, 32, 32);
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  if (map[newY][newX] !== 1) {
    player.x = newX;
    player.y = newY;
    if (map[newY][newX] === 0) {
      map[newY][newX] = 2;
      score += 10;
      scoreEl.textContent = score;
    }
  }
  checkEnemy();
}

function move(dir) {
  if (dir === 'up') movePlayer(0, -1);
  if (dir === 'down') movePlayer(0, 1);
  if (dir === 'left') movePlayer(-1, 0);
  if (dir === 'right') movePlayer(1, 0);
  draw();
}

function checkEnemy() {
  if (player.x === enemy.x && player.y === enemy.y) {
    lives--;
    livesEl.textContent = lives;
    if (lives === 0) {
      alert('Game Over! Final Score: ' + score);
      reset();
    } else {
      player.x = 1; player.y = 1;
    }
  }
}

function moveEnemy() {
  enemy.x += enemy.dir;
  if (map[enemy.y][enemy.x] === 1 || enemy.x < 1 || enemy.x > 8) {
    enemy.dir *= -1;
    enemy.x += enemy.dir;
  }
}

function gameLoop() {
  moveEnemy();
  checkEnemy();
  draw();
  requestAnimationFrame(gameLoop);
}

function reset() {
  location.reload();
}

draw();
gameLoop();
