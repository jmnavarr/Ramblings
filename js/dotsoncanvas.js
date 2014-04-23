var squareSize = $(document).width() * 0.9;
var frameLength = 1;
var frameScale = 0.5;
var circleCount = 5000;

var canvasSupported = (function () {
    var el = document.createElement('canvas');
    return !!(el.getContext);
}());

var supportStatus = document.createElement('div');

supportStatus.innerHTML = function () {
    if (canvasSupported)
        return "canvas supported";
    else
        return "canvas not supported";
}();

document.body.appendChild(supportStatus);

var canvas = document.createElement('canvas');
canvas.setAttribute('width', squareSize);
canvas.setAttribute('height', squareSize);
document.body.appendChild(canvas);

if (!canvasSupported) {
    G_vmlCanvasManager.initElement(canvas);
}

var ctx = canvas.getContext('2d');

function sampleCircles() {
    var xMax = canvas.width;
    var yMax = canvas.height;
    var circles = [];

    for (var i = 0; i < circleCount; i++) {
        var x = getRandomInt(0, xMax);
        var y = getRandomInt(0, yMax);
        circles.push({ x: x, y: y });
    }

    return circles;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw() {
    ctx.save();
    drawClear();
    var circles = sampleCircles();
    drawBackground();

    ctx.scale(frameScale, frameScale);


    _(circles).each(function (circle) {
        ctx.save();
        ctx.translate(circle.x, circle.y);
        drawCircle();
        ctx.restore();
    });

    ctx.restore();
}

function drawClear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// draw background
function drawBackground() {
    ctx.save();

    var height = canvas.height;
    var width = canvas.width;

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
};

// draw circle
function drawCircle() {
    ctx.save();


    var radius = 1;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2, false);

    ctx.fill();

    ctx.restore();
};

function animate() {
    draw();
    requestAnimationFrame(animate);
}

function showFrame() {
    //frameLength++;
    frameScale = frameScale + 0.01;
    setTimeout(function () {
        draw();
        showFrame();
    }, frameLength);
}

showFrame();