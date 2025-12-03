document.addEventListener("DOMContentLoaded", function () {
    const headerHeight = 90;

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (href === "#" || href === "#!") return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                let targetPosition;
                
                if (targetId === "menu") {
                    targetPosition = targetElement.offsetTop - (window.innerHeight / 2) + (targetElement.offsetHeight / 2);
                } else {
                    const offset = headerHeight - 100;
                    targetPosition = targetElement.offsetTop - offset;
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
});
