import css from './index.css';

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d'); //C - context

// c.fillStyle = 'blue';
// c.fillRect(100, 100, 100, 100);
// c.fillRect(400, 200, 100, 100);
// c.fillRect(100, 300, 100, 100);

// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = 'red';
// c.stroke();

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// const colors = ['red', 'blue', 'green', 'yellow'];
// for (let i = 0; i < 99999; i++) {
//     const x = Math.random() * window.innerWidth;
//     const y = Math.random() * window.innerHeight;
//     const color = parseInt(Math.random() * colors.length);
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = colors[color];
//     c.stroke();
// }
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const mouse = {
    x: undefined,
    y: undefined
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
