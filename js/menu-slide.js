document.addEventListener("DOMContentLoaded", () => {
    const menuSlider = document.querySelector(".kitchen__slider");
    const textContent = document.querySelector('[data-js="text"]');
    const imageContent = document.querySelector('[data-js="image"]');
    const prevBtn = document.querySelector('[data-js="prev"]');
    const nextBtn = document.querySelector('[data-js="next"]');
    const dots = document.querySelectorAll(".kitchen__dot");

    console.log('Elements found:', {
        menuSlider,
        textContent,
        imageContent,
        prevBtn,
        nextBtn,
        dots: dots.length
    });

    const h = menuSlider.offsetHeight;
    let visualIndex = 0;

    function update() {
        const textDOM = 2 + visualIndex;
        const imageDOM = 5 - visualIndex;
        textContent.style.marginTop = `-${textDOM * h}px`;
        imageContent.style.marginTop = `-${imageDOM * h}px`;
        dots.forEach((d, i) => {
            d.classList.toggle("kitchen__dot--active", i === visualIndex);
        });
    }

    update();

    setTimeout(() => {
        textContent.classList.add("kitchen__content--ready");
        imageContent.classList.add("kitchen__content--ready");
    }, 50);

    function go(dir) {
        const toIndex = visualIndex + dir;

        if (toIndex < 0) {
            textContent.style.marginTop = `-${1 * h}px`;
            imageContent.style.marginTop = `-${6 * h}px`;
            setTimeout(() => {
                textContent.classList.remove("kitchen__content--ready");
                imageContent.classList.remove("kitchen__content--ready");
                textContent.style.marginTop = `-${5 * h}px`;
                imageContent.style.marginTop = `-${2 * h}px`;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        textContent.classList.add("kitchen__content--ready");
                        imageContent.classList.add("kitchen__content--ready");
                        visualIndex = 3;
                        update();
                    });
                });
            }, 800);
        } else if (toIndex > 3) {
            textContent.style.marginTop = `-${6 * h}px`;
            imageContent.style.marginTop = `-${1 * h}px`;
            setTimeout(() => {
                textContent.classList.remove("kitchen__content--ready");
                imageContent.classList.remove("kitchen__content--ready");
                textContent.style.marginTop = `-${2 * h}px`;
                imageContent.style.marginTop = `-${5 * h}px`;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        textContent.classList.add("kitchen__content--ready");
                        imageContent.classList.add("kitchen__content--ready");
                        visualIndex = 0;
                        update();
                    });
                });
            }, 800);
        } else {
            visualIndex = toIndex;
            update();
        }
    }

    // Свайп — работает
    let touchStartX = 0;
    menuSlider.addEventListener(
        "touchstart",
        (e) => {
            if (e.touches?.[0]) touchStartX = e.touches[0].clientX;
        },
        { passive: true }
    );

    menuSlider.addEventListener(
        "touchend",
        (e) => {
            const touchEndX = e.changedTouches?.[0]?.clientX;
            if (touchEndX === undefined) return;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                go(diff > 0 ? 1 : -1);
            }
        },
        { passive: true }
    );

    prevBtn.addEventListener("click", () => go(-1));
    nextBtn.addEventListener("click", () => go(1));

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            visualIndex = parseInt(dot.dataset.index, 10);
            update();
        });
    });
});
