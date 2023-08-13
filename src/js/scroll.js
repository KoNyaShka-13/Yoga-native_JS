function tabs() {
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
      });
}

module.exports = scroll;
