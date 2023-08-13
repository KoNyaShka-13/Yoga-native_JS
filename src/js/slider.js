function slider() {
    //Получаем все элементы
    //Обозначаем, с какого слайда начнется показ, какой слайд будет показным
    let slideIndex = 1,
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
}

module.exports = slider;