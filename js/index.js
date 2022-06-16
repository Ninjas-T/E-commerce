// ============== navbar ==================
let nav = document.querySelector('nav');
let menuIcon = document.querySelector('.fa-bars');
menuIcon.addEventListener('click', navDisplay);

function navDisplay(e) {
  if (e.target.classList.contains('rotate-menu')) {
    e.target.classList.remove('rotate-menu');
    nav.classList.add('slide-out');
    setTimeout(() => {
      nav.style.display = 'none';
      nav.classList.remove('slide-out');
    }, 500);
  } else {
    e.target.classList.add('rotate-menu');
    nav.classList.add('slide-in');
    nav.style.display = 'block';
    setTimeout(() => {
      nav.classList.remove('slide-in');
    }, 1500);
  }
}
