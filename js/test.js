$(document).ready(function () {
    var testObj = {};

    testObj.prop = function () {
        return "here I am";
    }();

    console.log("test: " + testObj.prop);
});