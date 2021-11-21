document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("input-form:submit-button").addEventListener("click", submit);
    setTimeout(function(){
        changeR();
    }, 150);
    switch (parseFloat(document.getElementById("input-form:x-hidden").value)) {
        case -3.0:
            $('.x-button-1').addClass('button-clicked');
            break
        case -2.0:
            $('.x-button-2').addClass('button-clicked');
            break;
        case -1.0:
            $('.x-button-3').addClass('button-clicked');
            break;
        case 0.0:
            $('.x-button-4').addClass('button-clicked');
            break;
        case 1.0:
            $('.x-button-5').addClass('button-clicked');
            break;
        case 2.0:
            $('.x-button-6').addClass('button-clicked');
            break;
        case 3.0:
            $('.x-button-7').addClass('button-clicked');
            break;
        case 4.0:
            $('.x-button-8').addClass('button-clicked');
            break;
        case 5.0:
            $('.x-button-9').addClass('button-clicked');
            break;
    }
});


const Y_MIN = -5;
const Y_MAX = 5;
const X_VALUES = [-3,-2,-1,0,1,2,3,4,5];
const R_MIN = 1;
const R_MAX = 4;

let numValueX = document.getElementById("input-form:x-hidden").value

let numValueY= undefined
let numValueR = undefined
let canvas = $('#canvas');

let halfCanvas = $('#canvas').attr("width")/2;


function isNumber(s){
    if (s === 0) return true;
    return (!isNaN(parseFloat(s)) && s);
}

function changeX() {
    if (!checkR()){
        alert("Сначала укажите R!")
    }
}

function changeY(){
    let y = document.getElementById("input-form:y-textinput")
    let value = y.value;
    let fieldValueY = value.trim();
    fieldValueY = value.replace(',', '.');
    numValueY = parseFloat(fieldValueY)
}

function changeR(){
    let r = document.getElementById("input-form:r")
    numValueR = r.value;
    if (!checkR()) return;
    let svgGraph = document.querySelector('.areas').getSVGDocument();
    svgGraph.querySelector('.coordinate-text_minus-Rx').textContent = (-numValueR).toString();
    svgGraph.querySelector('.coordinate-text_minus-Ry').textContent = (-numValueR).toString();
    svgGraph.querySelector('.coordinate-text_minus-half-Rx').textContent = (-numValueR/2).toString();
    svgGraph.querySelector('.coordinate-text_minus-half-Ry').textContent = (-numValueR/2).toString();
    svgGraph.querySelector('.coordinate-text_plus-Rx').textContent = (numValueR).toString();
    svgGraph.querySelector('.coordinate-text_plus-Ry').textContent = (numValueR).toString();
    svgGraph.querySelector('.coordinate-text_plus-half-Rx').textContent = (numValueR/2).toString();
    svgGraph.querySelector('.coordinate-text_plus-half-Ry').textContent = (numValueR/2).toString();

    clearCanvas();
    drawAllPoints();
}

function checkX(){
    if (numValueX === undefined){
        $('.x-buttons').children().addClass('button-error')
        $('.x-buttons').children().removeClass('button-clicked')
        return false;
    } else {
        $('.x-buttons').children().removeClass('button-error')
        return true;
    }
}

function checkY(){
    let value = $("#input-form\\:y-textinput").val()
    let fieldValueY = value.trim();
    fieldValueY = value.replace(',', '.');
    numValueY = parseFloat(fieldValueY)
    if (numValueY === +fieldValueY && isNumber(numValueY)){
        if (numValueY>Y_MIN && numValueY<Y_MAX){
            $("#input-form\\:y-textinput").removeClass('text-error')
            return true;
        } else{
            $("#input-form\\:y-textinput").addClass('text-error')
            return false;
        }
    } else{
        $("#input-form\\:y-textinput").addClass('text-error')
        return false;
    }
}

function checkR(){
    let value = $("#input-form\\:r").val()
    let fieldValueR = value.trim();
    fieldValueR = value.replace(',', '.');
    numValueR = parseFloat(fieldValueR)
    if (numValueR === +fieldValueR && isNumber(numValueR)){
        if (numValueR>=R_MIN && numValueR<=R_MAX){
            $("#input-form\\:r").removeClass('text-error')
            return true;
        } else{
            $("#input-form\\:r").addClass('text-error')
            return false;
        }
    } else{
        $("#input-form\\:r").addClass('text-error')
        return false;
    }

}

canvas.on('click',function (event){
    if (!checkR()) return;

    let svgGraph = document.querySelector('.areas').getSVGDocument();

    let doubleDivisionRange = svgGraph.querySelector('#x-division3').getAttribute("x1")-
        svgGraph.querySelector('#x-division2').getAttribute("x1");

    let xCanvasValue = (event.offsetX - halfCanvas)/doubleDivisionRange * numValueR;
    numValueY = (-event.offsetY + halfCanvas)/doubleDivisionRange * numValueR;



    if (numValueY<Y_MIN) numValueY = Y_MIN + 0.00000000001;
    if (numValueY>Y_MAX) numValueY = Y_MAX - 0.00000000001;

    let min = Infinity;


    for (let i = 0; i < X_VALUES.length; i++){
        if (Math.abs(xCanvasValue-X_VALUES[i])< min){
            min = Math.abs(xCanvasValue-X_VALUES[i]);
            numValueX = X_VALUES[i];
        }
    }

    $("#input-form\\:x-hidden").val(numValueX);
    $(".pointX").val(numValueX);
    $(".pointY").val(numValueY);
    $(".pointR").val(numValueR);
    $(".submitSvg").click();


    setTimeout(function(){
        drawAllPoints();
    }, 150);


    $("#input-form\\:y-textinput").val(numValueY.toString().substring(0,10));

    $("#input-form\\:y-textinput").removeClass('text-error')
    $('.x-buttons').children().removeClass('button-error');
    $('.x-buttons').children().removeClass('button-clicked');
    switch (numValueX) {
        case -3:
            $('.x-button-1').addClass('button-clicked');
            break
        case -2:
            $('.x-button-2').addClass('button-clicked');
            break;
        case -1:
            $('.x-button-3').addClass('button-clicked');
            break;
        case 0:
            $('.x-button-4').addClass('button-clicked');
            break;
        case 1:
            $('.x-button-5').addClass('button-clicked');
            break;
        case 2:
            $('.x-button-6').addClass('button-clicked');
            break;
        case 3:
            $('.x-button-7').addClass('button-clicked');
            break;
        case 4:
            $('.x-button-8').addClass('button-clicked');
            break;
        case 5:
            $('.x-button-9').addClass('button-clicked');
            break;
    }
});


function drawPoint(x,y,result) {
    let ctx = canvas[0].getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,2,0,Math.PI * 2);
    if (result === 'true') {
        ctx.fillStyle = 'green'
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.fill();
}

function drawAllPoints() {

    let svgGraph = document.querySelector('.areas').getSVGDocument();

    let doubleDivisionRange = svgGraph.querySelector('#x-division3').getAttribute("x1")-
        svgGraph.querySelector('#x-division2').getAttribute("x1");


    $(".result-content tbody tr").each(function (){

        const point = $(this);
        let x = parseFloat(point.find("td:first-child").text());
        let y = parseFloat(point.find("td:nth-child(2)").text());
        let result = point.find("td:nth-child(6)").text();
        result = result.trim();
        if (isNaN(x) || isNaN(y))  return;


        drawPoint((x/numValueR * doubleDivisionRange + halfCanvas), -(y / numValueR * doubleDivisionRange - halfCanvas), result);
    })
}

function clearCanvas() {
    canvas[0].getContext('2d').clearRect(0, 0, canvas.width(), canvas.height());
}

let submit = function (e){
    if(!(checkX() && checkY() && checkR())) {
        e.preventDefault();
    }
    setTimeout(function(){
        drawAllPoints();
    }, 150);
}