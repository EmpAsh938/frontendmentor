const reset = document.getElementById('reset');
const tipbutton = document.querySelectorAll('.tipbutton');
const customtip = document.getElementById('customtip');
const billamount = document.getElementById('billamount');
const peopleinput = document.getElementById('peopleinput');
const tipamount = document.getElementById('tipamount');
const totalbill = document.getElementById('totalbill');
const billerror = document.querySelector('.billerror');
const peoplerror = document.querySelector('.peoplerror');


let bill_amount = 0;
let tip_percent = 0;
let tot_people = 0;

function validateAmount(currElem,errElem){
    let getId = currElem.getAttribute('id');
    if(isNaN(currElem.value) || (getId === "peopleinput" && currElem.value == 0)){
        errElem.style.visibility = "visible";
    } else {
        errElem.style.visibility = "hidden";
        if(getId === "peopleinput") tot_people = currElem.value;
        else bill_amount = currElem.value;
        calculateBill();
    }
}

function selectTip(e){
    tipbutton.forEach(tb => tb.classList.remove('activetip'));
    e.target.classList.add('activetip');
    let temptip = e.target.textContent;
    tip_percent = temptip.slice(0,temptip.length-1);
    customtip.value = "";
    calculateBill();
}

function tipPercent(e){
    if(isNaN(e.target.value)) {
        e.target.parentElement.style.border = "1px solid red";
        e.target.style.color = "red";
    } else {
        e.target.parentElement.style.border = "1px solid transparent";
        e.target.style.color = "#00494d";
        tipbutton.forEach(tb => tb.classList.remove('activetip'));
        tip_percent = e.target.value;
        calculateBill();
    }
}

function calculateBill(){
    if(bill_amount && tip_percent && tot_people) {
        bill_amount = parseFloat(bill_amount);
        tip_percent = parseFloat(tip_percent);
        tot_people = parseInt(tot_people)
        let sum = bill_amount + ((tip_percent/100) * bill_amount); 
        tipamount.innerText = "$"+(((tip_percent/100) * bill_amount) / tot_people).toFixed(2);
        totalbill.innerText = "$"+(sum/tot_people).toFixed(2);
    }
}

function resetWhole(){
    bill_amount = 0;
    tip_percent = 0;
    tot_people = 0;
    billamount.value = "";
    customtip.value = "";
    tipbutton.forEach(tb => tb.classList.remove('activetip'));
    peopleinput.value = "";
    tipamount.innerText = "$0.00"
    totalbill.innerText = "$0.00"
}

reset.addEventListener('click', resetWhole);
billamount.addEventListener('input', () => validateAmount(billamount,billerror));
tipbutton.forEach(tb => tb.addEventListener('click', selectTip));
peopleinput.addEventListener('input', () => validateAmount(peopleinput,peoplerror));
customtip.addEventListener('input', tipPercent);