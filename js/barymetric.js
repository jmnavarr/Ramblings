// http://en.wikipedia.org/wiki/Barycentric_subdivision
// http://en.wikipedia.org/wiki/Centroid

var squareSize = $(document).height() * 0.9;
var canvasSupported = (function () {
    var el = document.createElement('canvas');
    return !!(el.getContext);
}());

var supportStatus = document.createElement('div');
document.body.appendChild(supportStatus);

var canvas = document.createElement('canvas');
canvas.setAttribute('width', squareSize);
canvas.setAttribute('height', squareSize);
document.body.appendChild(canvas);

if (!canvasSupported) {
    G_vmlCanvasManager.initElement(canvas);
}

var ctx = canvas.getContext('2d');

var clickPoints = [];
canvas.addEventListener("mousedown", getPosition, false);

function point(x, y) {
    this.x = x;
    this.y = y;
}

function triangle(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.CenterOfMass = function () {
        var x = (p1.x + p2.x + p3.x) / 3;
        var y = (p1.y + p2.y + p3.y) / 3;

        return new point(x, y);
    }();

    this.Draw = function () {

        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;

        ctx.beginPath();
        // Start from the top-left point.
        ctx.moveTo(p1.x, p1.y); // give the (x,y) coordinates
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p1.x, p1.y);

        // Done! Now fill the shape, and draw the stroke.
        // Note: your shape will not be visible until you call any of the two methods.
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

function drawTriangles(t1, level) {

    this.drawInner = function DrawInner(t, depth) {
        if (depth >= level) {
            return;
        } else {
            t.Draw();

            var ti1 = new triangle(t.CenterOfMass, t.p1, t.p2);
            var ti2 = new triangle(t.CenterOfMass, t.p2, t.p3);
            var ti3 = new triangle(t.CenterOfMass, t.p3, t.p1);

            DrawInner(ti1, depth + 1);
            DrawInner(ti2, depth + 1);
            DrawInner(ti3, depth + 1);
        }
    }

    this.drawInner(t1, 0);
}

function getPosition(event) {
    var x = event.x;
    var y = event.y;

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    var p = new point(x, y);
    clickPoints.push(p);

    if (clickPoints.length == 3) {
        var t1 = new triangle(clickPoints[0], clickPoints[1], clickPoints[2]);
        drawTriangles(t1, 6);

        clickPoints = [];
    }
}


