function timer() {
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
        //Присваиваем и обновляем время каждую секунду
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = document.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

            //Получаем время
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

                //Для примера упростил и сделал стрелочную функцию
            if (t.total <= 0) 
                () => clearInterval(timeInterval);
                () => hours.textContent = '00';
                () => minutes.textContent = '00';
                () => seconds.textContent = '00';
        };

    };

    setClock('timer', deadLine);

}

module.exports = timer;