document.addEventListener("DOMContentLoaded", () => {
    const splide = new Splide(".promo__slider", {
        perPage: 3,
        perMove: 3,
        focus: 0,
        pagination: false,
        arrows: false,
        gap: 20,
        type: "slide",
        rewind: false,
        fixedWidth: 405,
        autoWidth: false,
        ariaLabel: "Промо-акции ресторана",
        i18n: {
            prev: "Предыдущий слайд",
            next: "Следующий слайд",
        },
    });

    const pagination = document.querySelector(".promo__pagination");
    const prevBtn = document.querySelector(".promo__arrow--prev");
    const nextBtn = document.querySelector(".promo__arrow--next");

    // Обработчики для точек
    pagination.addEventListener("click", (e) => {
        if (e.target.classList.contains("promo__dot")) {
            const page = parseInt(e.target.getAttribute("data-page"));
            splide.go(page * 3);
        }
    });

    // Обработчики для стрелок
    prevBtn.addEventListener("click", () => {
        splide.go("<");
    });

    nextBtn.addEventListener("click", () => {
        splide.go(">");
    });

    // Обновление активной точки
    splide.on("moved", (newIndex) => {
        const activePage = Math.floor(newIndex / 3);
        document.querySelectorAll(".promo__dot").forEach((dot, index) => {
            dot.classList.toggle("promo__dot--active", index === activePage);
        });
    });

    splide.mount();

    // Ховер для бейджей
    const promoCards = document.querySelectorAll(".promo__card");
    promoCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            const badge = card.querySelector(".promo__badge");
            if (badge) {
                badge.style.background = "rgba(255, 255, 255, 1)";
            }
        });

        card.addEventListener("mouseleave", () => {
            const badge = card.querySelector(".promo__badge");
            if (badge) {
                badge.style.background = "";
            }
        });
    });

    // Попап элементы
    const popup = document.getElementById("promo-popup");
    const popupImage = document.getElementById("popup-image");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");
    const popupClose = popup.querySelector(".popup__close");
    const popupOverlay = popup.querySelector(".popup__overlay");

    // Обработчик попапов после монтирования
    setTimeout(() => {
        // Обработчики для карточек
        document.querySelectorAll(".promo__card").forEach((card) => {
            card.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Получаем данные из карточки
                const img = card.querySelector(".promo__picture img");
                const titleElement = card.querySelector(".promo__title") || card.querySelector(".promo__card-title");
                const title = titleElement.textContent;
                const description = card.querySelector(
                    ".promo__description"
                ).textContent;

                // Заполняем попап
                popupImage.src = img.src;
                popupImage.alt = img.alt;
                popupTitle.textContent = title;
                popupDescription.textContent =
                    description +
                    " Подробное описание промо-акции с дополнительной информацией.";

                // Открываем попап
                popup.classList.add("popup--active");
            });
        });

        // Обработчики для ссылок "Подробнее"
        document.querySelectorAll(".promo__link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                // Находим родительскую карточку
                const card = link.closest(".promo__card");
                if (card) {
                    // Получаем данные из карточки
                    const img = card.querySelector(".promo__picture img");
                    const titleElement = card.querySelector(".promo__title") || card.querySelector(".promo__card-title");
                    const title = titleElement.textContent;
                    const description = card.querySelector(".promo__description").textContent;

                    // Заполняем попап
                    popupImage.src = img.src;
                    popupImage.alt = img.alt;
                    popupTitle.textContent = title;
                    popupDescription.textContent = description + " Подробное описание промо-акции с дополнительной информацией.";

                    // Открываем попап
                    popup.classList.add("popup--active");
                }
            });
        });
    }, 100);

    // Закрытие попапа
    const closePopup = () => {
        popup.classList.remove("popup--active");
    };

    popupClose.addEventListener("click", closePopup);
    popupOverlay.addEventListener("click", closePopup);

    // Закрытие по Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && popup.classList.contains("popup--active")) {
            closePopup();
        }
    });
});
