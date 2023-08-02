var name_input = document.querySelector(".name-input").children[1];
var base_input = document.querySelector(".base-input").children[1];
var import_chart = document.querySelector("span");
var create_btn = document.querySelector(".buttton");






import_chart.onclick = function() {

}

create_btn.onclick = function() {
    if(name_input.value !== "" && base_input.value !== "") {
        
    }else {
        alert("No values in Name field or Base field!");
    }
}