$(function () {
    var hammertime = $("#message").hammer();

    hammertime.on("tap", function (event) {
        console.log("event: " + event.gesture.deltaTime);

        alert("hello!");
    });
});