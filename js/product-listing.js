// ============== navbar starts ==================
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

// ============== navbar ends ==================

// ============== add to cart starts ==================



let amountMinus = document.querySelector(`.amount div div span:nth-child(1)`);
let amountPlus = document.querySelector(`.amount div div span:nth-child(3)`);
let itemDescription = document.querySelector(`.description p`);
let addToCartBtn = document.querySelector(`.amount button`);
let itemPrice = document.querySelector(`.name span`);
let amountNumber = document.querySelector(`.number`);
let itemName = document.querySelector(`.name h1`);
let dataArray = [];

amountPlus.addEventListener(`click`, () => {
  if (+amountNumber.textContent !== 30) {
    amountNumber.textContent++;
  }
})

amountMinus.addEventListener(`click`, () => {
  if (+amountNumber.textContent !== 1) {
    amountNumber.textContent--;
  }
})

fetch(`../API/data.json`)
.then((response) => response.json())
.then((data) => {
  data.forEach((ele) => {
    dataArray.push(...ele[`items`]);
  });

  let item = localStorage.getItem('item');
  let products = JSON.parse(localStorage.getItem(`purchase`));

  for (let i = 0; i < dataArray.length; i++) {
    if (item.toLowerCase() === (dataArray[i][`title`]).toLowerCase()) {
      itemName.textContent = dataArray[i][`title`];
      itemPrice.textContent = `$${dataArray[i][`price`]}`
      itemDescription.textContent = dataArray[i][`description`];
    }
  }

  addToCartBtn.addEventListener(`click`, () => {
    let count = 0;
    let item =
    {
      'title' : itemName.textContent.toLowerCase(),
      'price' : itemPrice.textContent.toLowerCase(),
      'description' : itemDescription.textContent.toLowerCase(),
      'amount' : amountNumber.textContent.toLowerCase()
    }

    if (products) {
      products.forEach((e, i, arr) => {
        if (e[`title`] === item[`title`]) {
          arr[i] = item
          localStorage.setItem(`purchase`, JSON.stringify(products));
          count++;
        }
      });
      if (count === 0) {
        products.push(item);
        localStorage.setItem(`purchase`, JSON.stringify(products));
      }
    } else {
      let products = [];
      products.push(item);
      localStorage.setItem(`purchase`, JSON.stringify(products));
    }
  });
})

// ============== add to cart ends ==================