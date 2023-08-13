function modal() {
    let more = document.querySelector('.more'),//Кнопка, при нажатии которой будет вылазить модальное окно
        overlay = document.querySelector('.overlay'),//Модальное окно
        close = document.querySelector('.popup-close');//Крестик для закрытия модального окна

    more.addEventListener('click', function() {
        overlay.style.display = 'block';//Чтобы окно появилось
        this.classList.add('more-splash');//This, то есть обращается к этому же элементу
        document.body.style.overflow = 'hidden';//Запрещаем скролить страницу, пока открыто модальное окно
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';//Убираем окно
        more.classList.remove('more-splash');//This не подходит, так как обращаемся не к крестику, а к модальному окну
        document.body.style.overflow = '';//Снимаем запрет скроллинга
    });

    //Модальные окна для табов/
    let btn = document.querySelectorAll('.description-btn');

        btn.forEach(btn => {
        btn.addEventListener('click', ()=> {
        overlay.style.display = 'block';
        });
    });

    //Чтобы номер телефона отображался правильно
    const number = document.querySelector('.popup-form__input'),
        telNumber = document.querySelectorAll('#form input')[1];
    let pos = number.value.length,//Данная позиция будет еще не раз использоваться в других частях кода
        telPos = telNumber.value.length;

    number.addEventListener('keydown', (e) => {
        validNumber(e, number, pos);
    });

    telNumber.addEventListener('keydown', (e) => {
        validNumber(e, telNumber, telPos);
    });

    function validNumber(e, input, pos) {
        pos = input.value.length;
        e.preventDefault();
    if (e.key.match(/[0-9]/) && pos < 16 && (pos == '13' || pos == '10')) {
        input.value += ' ' + e.key;
        pos = input.value.length;
    } else if (e.key.match(/[0-9]/) && pos < 16) {
        input.value += e.key;
        pos = input.value.length;
    if (pos == '6') {
        input.value += ')';
    } else if (pos == '10' || pos == '13') {
        input.value += ' ';
    }
        pos = input.value.length;
    }

    if (e.key == 'Backspace') {
        if (pos == '12' || pos == '15' || pos == '7') {
            input.value = input.value.substring(0, pos - 2);
        } else if (pos > 3) {
            input.value = input.value.substring(0, pos - 1);
    }
        pos = input.value.length;
    }
        return pos;
    }

    number.addEventListener('focus', () => {
        if (pos == 0) {
            number.value = '+7(';
            pos = 3;
            }
        });

    number.addEventListener('blur', () => {
        if (number.value.slice(-1) == '(') {
            number.value = '';
            pos = 0;
            }
        });
    telNumber.addEventListener('focus', () => {
        if (telPos == 0) {
            telNumber.value = '+7(';
            telPos = 3;
            }
        });
    telNumber.addEventListener('blur', () => {
        if (telNumber.value.slice(-1) == '(') {
            telNumber.value = '';
            telPos = 0;
            }
        });

}

module.exports = modal;