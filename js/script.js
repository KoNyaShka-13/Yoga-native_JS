window.addEventListener('DOMContentLoaded', function() {//Пишем так, чтобы все грузилось правильно и не было ошибок при загрузке DOM дерева

    'use strict';
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
    info.addEventListener('click', function(event) {
        let target = event.target;//Связываем слайд с ссылкой выше
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

    //Timer

    let deadLine = '2023-03-21';

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

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            };
        };

    };

    setClock('timer', deadLine);
});