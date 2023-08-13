function form() {
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
    
    //Создаю окна, которые будут появляться при отправке форм
    statusFormImg.style.cssText = 'height: 100px; margin: 10px auto; display: block;';
    statusMessage.style.cssText = 'width: 100%; text-align: center; color: white';
    
    function sendForm(elem, popap) {
        elem.addEventListener('submit', (e) => {
        e.preventDefault();
        popap.appendChild(statusMessage);
        statusMessage.appendChild(statusFormImg);
        statusMessage.appendChild(statusFormP);

    let formData = new FormData(elem);  

    //Работа с Json
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
    //Функции для форм
    sendForm(form, contactForm);
    sendForm(mainForm, popapForm);
    
    //Старый вариант из курса, который работает частично
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
}

module.exports = form;