const burgerBtn = document.querySelector('.header__burger-menu');
const nav = document.querySelector('.header__nav');

if (burgerBtn && nav) {
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('header__burger-menu--open');
    nav.classList.toggle('header__nav--open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header__burger-menu') && !e.target.closest('.header__nav')) {
      burgerBtn.classList.remove('header__burger-menu--open');
      nav.classList.remove('header__nav--open');
    }
  });
}
