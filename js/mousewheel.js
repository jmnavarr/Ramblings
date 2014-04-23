$(document).on("mousewheel", function (evt) {
    console.log("mousewheel moved");
    var delta = evt.originalEvent.wheelDelta;
    console.log("delta: " + delta);
    
    var mousex = evt.offsetX || evt.originalEvent.layerX;
    var mousey = evt.offsetY || evt.originalEvent.layerY;
    console.log("mouse xy: " + mousex + ", " + mousey);
});