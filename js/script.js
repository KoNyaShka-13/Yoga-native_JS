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
    }

    hideTabContent(1);//Даем указание функции, что нанать со второго таба, тем самым, первый таб не будет скрыт

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

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
});