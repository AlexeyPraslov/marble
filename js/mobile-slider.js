document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".kitchen-swiper", {
        slidesPerView: 1,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        a11y: {
            enabled: true,
            prevSlideMessage: "Предыдущий слайд",
            nextSlideMessage: "Следующий слайд",
        },
    });
});
