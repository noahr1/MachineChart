var buttons = Array.from(document.querySelector(".buttons").children);
var link = document.querySelector("a");

buttons.forEach(elm => {
    elm.onclick = function(e) {
        var target = e.target;
        if(target.innerHTML === "New Chart") {
            link.href = "../pages/new_chart.html";
        }else if(target.innerHTML === "Load Chart") {
            link.href = "../pages/load_chart.html";
        }else if(target.innerHTML === "How to Use") {
            link.href = "../pages/instructions.html";
        }
        link.click();
    }
});