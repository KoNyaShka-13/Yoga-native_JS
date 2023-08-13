function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;
        totalValue.innerHTML = '0';

    place.addEventListener('change', function () {
        if (persons.value == '' || restDays.value == '' || persons.value == '0' || restDays.value == '0') {
        totalValue.innerHTML = 0;
        } else {
    let a = total * place.value - 500;
    if (a < 0) a = 0;
    let printNum = setInterval(() => {
        if (a < total * place.value) {
        a += 5;
        totalValue.innerHTML = a;
        } else {
        clearInterval(printNum);
        }
    }, 1)      //За сколько по времени будет выполняться данное действие
        }
    });

    persons.addEventListener('keydown', function (e) {
       inputCalc(this, e)
    });
    restDays.addEventListener('keydown', function (e) {
        inputCalc(this, e)
    });

    function inputCalc(input, e) {
        e.preventDefault();
    if (e.key.match(/[0-9]/) && input.value.length < 3) {
        input.value += e.key;
    } else if (e.key == 'Backspace') {
        e.target.value = e.target.value.substring(0, pos - 1);
    }
    daysSum = +input.value;

    total = (daysSum + personsSum) * 4000;

    if ((persons.value == '' || restDays.value == '' || persons.value == '0' || restDays.value == '0')) {
        totalValue.innerHTML = '0';
    } else {
    let a = total * place.value - 500;
    if (a < 0) a = 0;
    // Красивое увеличение суммы
    let printNum = setInterval(() => {
        if (a < total * place.value) {
        a += 5;
        totalValue.innerHTML = a;
        } else {
        clearInterval(printNum);
        }
    }, 5)
    }
    }
}

module.exports = calc;