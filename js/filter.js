let nav = document.querySelector('nav');
let menuIcon = document.querySelector('.fa-bars');
menuIcon.addEventListener('click', navDisplay);

function navDisplay(e) {
  if (e.target.classList.contains('rotate-menu')) {
    e.target.classList.remove('rotate-menu');
    nav.style.display = 'none';
  } else {
    e.target.classList.add('rotate-menu');
    nav.style.display = 'block';
  }
}
