window.addEventListener('DOMContentLoaded', function() {//Пишем так, чтобы все грузилось правильно и не было ошибок при загрузке DOM дерева

    'use strict';//
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {//Функци по скрытию всех не нужных табов, указывается с какого таб начинать
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);//Даем указание функции, что нанать со второго таба, тем самым, первый таб не будет скрыт

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    //Скрываем не нужный и открываем нужный таб

    info.addEventListener('click', (e) => {
        let target = e.target;//Связываем слайд с ссылкой выше
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {//Функция для проверки, что ссылка и слайд нужные
                if (target == tab[i]) {//Не нужное убираем, нужное включаем
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // прокрутка (scroll)

    let goTo = document.querySelectorAll('.container ul li a');

    goTo.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          let blockID = item.getAttribute('href');
          document.querySelector('' + blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      })

    
//Timer
      
    let deadLine = '2023-08-10';

    function getTimeRemaining(endtime) {
        let t = (Date.parse(endtime) > Date.parse(new Date())) ? Date.parse(endtime) - Date.parse(new Date()) : 0,//Получаем количество милисекунд от настоящего времени до конца дед лайна
        // t - техническая переменная, то есть дальше функции никуда не пойдет, можно и назвать одной буквой
         seconds = Math.floor((t/1000) % 60),//Нам нужны секунды,по этому делим на 1000, а также % 60 означает, что будет выводиться остаток при делении на 60, то есть остальные секунды, что не поместились в минунуту
         minutes = Math.floor((t/1000/60) % 60),//Делим на 60 и вымеряем остаток, так как уже нужны минут, точнее их остаток
         //hours = Math.floor((t/1000/60/60) % 24),//Вычесляем остаток часов, то есть делим на 24
         //days = Math.floor((t/(1000*60*60*24)));
         hours = Math.floor((t/(1000*60*60)));//Вычесляем часы, так как в данном случае мы не переводим в дни, то остаток не будем считать, а выведеме просто все количесвто часов, их может быть и 17, и 25, и 43 и тд.
    
         return {//
            'total' : t,
            'hours' : (hours < 10) ? '0' + hours : hours,
            'minutes' : (minutes < 10) ? '0' + minutes : minutes,
            'seconds' : (seconds < 10) ? '0' + seconds : seconds,
          };

    };

//Превращаем статичную верстку в динамичную

    function setClock(id, endtime) {//Присваиваем и обновляем время каждую секунду
        let timer = document.getElementById(id),
            hours = document.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {//Получаем время
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) //Для примера упростил и сделал стрелочную функцию
                () => clearInterval(timeInterval);
                () => hours.textContent = '00';
                () => minutes.textContent = '00';
                () => seconds.textContent = '00';
        };

    };

    setClock('timer', deadLine);

//Модальное окно

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

//Форма отправки заявки

let message = {
    loading: 'Загрузка...',
    loadingImg: 'img/ajax-loader.gif',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    successImg: 'img/smartphone.png',
    failure: 'Что-то пошло не так...'
  };

  let mainForm = document.querySelector('.main-form'),
    form = document.querySelector('#form'),
    input = form.getElementsByTagName('input'),
    popapForm = document.querySelector('.popup-form'),
    contactForm = document.querySelector('.contact-form'),
    
    statusMessage = document.createElement('div'),
    statusFormImg = document.createElement('img'),
    statusFormP = document.createElement('p');

  statusFormImg.style.cssText = 'height: 100px; margin: 10px auto; display: block;';
  statusMessage.style.cssText = 'width: 100%; text-align: center; color: white';

  function sendForm(elem, popap) {
    elem.addEventListener('submit', (e) => {
      e.preventDefault();
      popap.appendChild(statusMessage);
      statusMessage.appendChild(statusFormImg);
      statusMessage.appendChild(statusFormP);
      let formData = new FormData(elem);


      function postData(data) {
        return new Promise(function (resolve, reject) {
          let request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          request.onreadystatechange = function () {
            elem.style.display = 'none';
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
              if (request.status == 200) {
                resolve();
              } else {
                reject();
              }

            }
          }
          let jsonObject = {};

          for (const [key, value] of data.entries()) {
            jsonObject[key] = value;
            
          }
          request.send(JSON.stringify(jsonObject));
        });
      }

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
        pos = 0;
      }
      postData(formData)
        .then(() => {
          statusFormImg.src = message.loadingImg;
          statusFormP.textContent = message.loading;
        })
        .then(() => {
          statusFormImg.src = message.successImg;
          statusFormP.textContent = message.success;
        })
        .catch(() => statusFormP.textContent = message.failures)
        .then(clearInput);


    });
  }

  sendForm(form, contactForm);
  sendForm(mainForm, popapForm);
/
//    let message = {
//        loading: 'Загрузка...',
//        succes: 'Заявка отправлена, мы скоро свяжемся с вами)',
//        failure: 'Что-то пошло не так...',
//    };
//    //Отправка и получение данных от формы подробнее
//    let form = document.querySelector('.main-form'),
//        input = form.getElementsByTagName('input'),
//        statusMessage = document.createElement('div');
//
//        statusMessage.classList.add('status');
//
//    form.addEventListener('submit', function(event) {//Чтобы действие сработало, нужно ставить его на форму, а не на саму кнопку
//        event.preventDefault();//Отменяем нормальную работу js, чтобы не обновлялась страница при отправке запроса, в большинстве случаев, отменяют работу в AJAX запросах
//        form.appendChild(statusMessage);
//
//        let request = new XMLHttpRequest();
//        request.open('POST', 'server.php');
//        //Нижняя строка отправляет просто строки, а мы будем отправлять в JSON-формате
//        //request.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
//      	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//
//        let formData = new FormData(form);//Переделываем данные в JSON формат
//        let obj = {};
//        formData.forEach(function(value, key) {
//            obj[key] = value;
//        });
//        let json = JSON.stringify(obj);//Превращает обычные данные js в json-формат
//
//       request.send(json);
//
//        request.addEventListener('readystatechange', function() {//Отправка уведомления в зависимости от ситуации
//            if (request.readyState < 4) {
//                statusMessage.innerHTML = message.loading;
//            }else if(request.readyState === 4 && request.status == 200) {
//                statusMessage.innerHTML = message.succes;
//            } else {
//                statusMessage.innerHTML = message.failure;
//            }
//            
//        });
//
//       for (let i = 0; i < input.length; i++) {//Очищаем инпут после успешной отправки сообщения
//            input[i].value = '';
//        }

//    });
//
  
   


// Слайдер
    //Получаем все элементы
let slideIndex = 1,//Обозначаем, с какого слайда начнется показ, какой слайд будет показным
slides = document.querySelectorAll('.slider-item'),
prev = document.querySelector('.prev'),
next = document.querySelector('.next'),
dotsWrap = document.querySelector('.slider-dots'),
dots = document.querySelectorAll('.dot');

showSlides(slideIndex);

function showSlides(n) {

  //Чтобы слайды были зациклены 
  if (n > slides.length) {
      slideIndex = 1;
  }
  if (n < 1) {
      slideIndex = slides.length;
  }

    //Убираем все лишние слайды и лишние кнопки
slides.forEach((item) => item.style.display = 'none');
dots.forEach((item) => item.classList.remove('dot-active'));

slides[slideIndex - 1].style.display = 'block';
dots[slideIndex - 1].classList.add('dot-active');
}

function plusSlides(n) {
  showSlides(slideIndex +=n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}

prev.addEventListener('click', function() {
  plusSlides(-1);
});

next.addEventListener('click', function() {
  plusSlides(1);
});

dotsWrap.addEventListener('click', function(event) {
  for (let i = 0; i < dots.length + 1; i++) {//Плюс один тут и на нижней строке минус один для логического соответсвия слайдов и точек, в видео подробно объяснили, чтобы потом функция работала правильно
     if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
      currentSlide(i);
     } 
  }
});

//Калькулятор

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
  }, 5)      
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
  // хотите красивое увеличение стоимости вашей поездки?
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

});