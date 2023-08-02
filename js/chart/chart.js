var svg = document.querySelector("svg");
var shapes = document.querySelector(".shapes");

//machine modal
var machModal = document.querySelector("#machModal");
var machClose = document.querySelector("#machClose");

//buttons
var shape_button = document.querySelector(".shape-button");

var machine;

//helper function
function svgElement(elementName, target, properties = {}, returnBol = false) {
    const svgElm = document.createElementNS("http://www.w3.org/2000/svg", elementName);
    Object.entries(properties).map(a => svgElm.setAttribute(a[0], a[1]));
    target.append(svgElm);
    if(returnBol) {
        return svgElm;
    }
}

function svgElement1(elementName) {
    const tempElm = document.createElementNS("http://www.w3.org/2000/svg", elementName);
    return tempElm;
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function svgText(target, text = "", properties = {}, returnBol = false) {
    const Text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    Object.entries(properties).map(a => Text.setAttribute(a[0], a[1]));
    Text.innerHTML = text;
    target.append(Text);
    if(returnBol) {
        return Text;
    }
}

//classes
class MachineChart {
    constructor(x, y, machName, segment, width, eu, ticks, inputs = [], outputs = [], color = "") {
        this.x = x;
        this.y = y;
        this.machineName = machName;
        this.segment = segment;
        this.width = width;
        this.eu = eu;
        this.ticks = ticks;
        this.inputs = inputs;
        this.outputs = outputs;
        this.color = color;
        this.elements = [];
    }

    createRect(x, y, width, height, color="") {
        const tempSvg = svgElement1("rect");
        tempSvg.setAttribute("stroke", "black");
        if(color !== "") {
            tempSvg.setAttribute("fill", color);
        }
        tempSvg.setAttribute("x", x);
        tempSvg.setAttribute("y", y);
        tempSvg.setAttribute("width", width);
        tempSvg.setAttribute("height", height);
        svg.append(tempSvg);
        this.elements.push(tempSvg);
        return tempSvg;
    }

    createElements() {
        // first box
        this.createRect(this.x, this.y, this.width, this.segment, `rgb(${ randomNum(256) }, ${ randomNum(256) }, ${ randomNum(256) })`);
        this.elements.push(svgText(svg, this.machineName, { x: this.x + 5, y: this.y + this.segment * 0.7 }, true));
        this.elements.push(svgText(svg, this.eu + " EU/t", { x: this.x + this.width * 0.68 + 5, y: this.y + this.segment * 0.7 }, true));

        // second box
        this.elements.push(svgElement("rect", svg, { x: this.x, y: this.y + this.segment, width: this.width * 0.65, height: this.segment, stroke: "black", fill: "dimgray" }, true));
        this.elements.push(svgText(svg, "Output:", { x: this.x + 5, y: this.y + this.segment * 1.7 }, true));

        this.elements.push(svgElement("rect", svg, { x: this.x + this.width * 0.65, y: this.y + this.segment, width: this.width * 0.35, height: this.segment, stroke: "black", fill: "orange" }, true));
        this.elements.push(svgText(svg, this.eu * this.ticks + " EU", { x: this.x + this.width * 0.7 + 5, y: this.y + this.segment * 1.7 }, true));

        // outputs
        var starting_pos = this.y + this.segment * 2;
        for(var o = 0; o < this.outputs.length; o++) {
            this.elements.push(svgElement("rect", svg, { x: this.x, y: starting_pos + o * this.segment * 2, width: this.width, height: this.segment * 2, stroke: "black", fill: "gray" }, true));
            this.elements.push(svgText(svg, this.outputs[o].item, { x: this.x + 5, y: starting_pos + this.segment + 4 + o * this.segment * 2 }, true));
            this.elements.push(svgText(svg, this.outputs[o].num + "#", { x: this.x + this.width * 0.8 + 5, y: starting_pos + this.segment + 4 + o * this.segment * 2 }, true));
        }

        //third box
        this.elements.push(svgElement("rect", svg, { x: this.x, y: starting_pos + this.outputs.length * this.segment * 2, width: this.width, height: this.segment, stroke: "black", fill: "dimgray" }, true));
        this.elements.push(svgText(svg, "Input:", { x: this.x + 5, y: starting_pos + this.segment * 0.7 + this.outputs.length * this.segment * 2 }, true));
        this.elements.push(svgText(svg, this.ticks + " ticks", { x: this.x + this.width * 0.7 + 5, y: starting_pos + this.segment * 0.7 + this.outputs.length * this.segment * 2 }, true));

        this.elements.push(svgElement("rect", svg, { x: this.x + this.width * 0.4, y: starting_pos + this.outputs.length * this.segment * 2, width: this.width * .15, height: this.segment, stroke: "black", fill: "yellow" }, true));
        this.elements.push(svgText(svg, this.inputs.length + "#", { x: this.x + this.width * 0.4 + 8, y: starting_pos + this.segment * 0.7 + this.outputs.length * this.segment * 2 }, true));

        // inputs
        var starting_pos2 = starting_pos + this.outputs.length * this.segment * 3;
        for(var i = 0; i < this.inputs.length; i++) {
            this.elements.push(svgElement("rect", svg, { x: this.x, y: starting_pos2 + i * this.segment * 2, width: this.width, height: this.segment * 2, stroke: "black", fill: "lightgray" }, true));
            this.elements.push(svgText(svg, this.inputs[i].item, { x: this.x + 5, y: starting_pos2 + this.segment + 4 + i * this.segment * 2 }, true));
            this.elements.push(svgText(svg, this.inputs[i].num + "#", { x: this.x + this.width * 0.8 + 5, y: starting_pos2 + this.segment + 4 + i * this.segment * 2 }, true));
        }
    }
}

machine = new MachineChart(30, 30, "Laser Cutter", 25, 200, 5, 5, [
    { item: "minecraft:dirt", num: 5 },
    { item: "minecraft:dirt", num: 5 }
], [
    { item: "minecraft:dirt", num: 5 }
]);
machine.createElements();
console.log(machine.elements);

//event handlers
shape_button.onclick = function() {
    if(shapes.style.display === "flex") {
        shapes.style.display = "none";
    }else{
        shapes.style.display = "flex";
    }
}

// When the user clicks on <span> (x), close the modal
machClose.onclick = function() {
    machModal.style.display = "none";
}
  
  // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == machModal) {
        machModal.style.display = "none";
    }
}

shapes.children[0].onclick = function() {
    machModal.style.display = "block";
}

shapes.children[1].onclick = function() {
}

shapes.children[2].onclick = function() {
}

shapes.children[3].onclick = function() {
}