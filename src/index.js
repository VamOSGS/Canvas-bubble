import './index.css';

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d'); //C - context

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const mouse = {
  x: null,
  y: null
};

const maxRad = 40;
const minRad = 4;

window.addEventListener('mousemove', function(e) {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

const bgColors = ['#DCEAF3', '#ff5231', '#27282B', '#5A5A5A'];

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRad = radius;
  this.color = color;
  this.draw = function() {
    c.fillStyle = bgColors[color];
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  };
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
    this.x += this.dx;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRad) {
        this.radius += 1;
      }
    } else if (this.radius > minRad) {
      this.radius -= 1;
    }

    this.draw();
  };
}
let circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * (window.innerWidth - radius * 2) + radius;
    const y = Math.random() * (window.innerHeight - radius * 2) + radius;
    const dx = Math.random() - 0.5;
    const dy = Math.random() - 0.5;
    const color = parseInt(Math.random() * bgColors.length);
    const radius = Math.random() * 8 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();
init();
