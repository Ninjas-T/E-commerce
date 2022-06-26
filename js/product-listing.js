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

// ============== API fetch starts ==================

let amountMinus = document.querySelector(`.amount div div span:nth-child(1)`);
let amountPlus = document.querySelector(`.amount div div span:nth-child(3)`);
let suggestionContainer = document.querySelector(`#suggestion .container`);
let itemImg = document.querySelector(`#details div:nth-child(1) img`);
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
  let category = ``;

  for (let i = 0; i < dataArray.length; i++) {
    if (item.toLowerCase() === (dataArray[i][`title`]).toLowerCase()) {
      itemImg.src = dataArray[i][`img-src`];
      itemName.textContent = dataArray[i][`title`];
      itemPrice.textContent = `$${dataArray[i][`price`]}`
      itemDescription.textContent = dataArray[i][`description`];
      category = dataArray[i][`category`];
    }
  }

  // ============== Add to cart button click events starts ==============
  addToCartBtn.addEventListener(`click`, () => {
    let count = 0;
    let item =
    {
      'img-src' : itemImg.src,
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

    window.location.href = '../html/cart.html';
  });
  // ============== Add to cart button click events ends ==============

  // ============== Suggestion cards build starts ==============
  data.forEach((ele) => {
    if (ele[`category`] === category) {
      for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * 20);
        let containerCard = document.createElement(`div`);
        containerCard.classList = `card`;
        suggestionContainer.appendChild(containerCard);

        let cardImageDiv = document.createElement(`div`);
        let divImage = document.createElement(`img`);
        divImage.src = ele[`items`][random][`img-src`];
        divImage.setAttribute(`alt`, `${ele[`items`][random][`title`]}`);
        let divBg = document.createElement(`div`);
        divBg.classList = `bg`;
        let bgAnchor = document.createElement(`a`);
        bgAnchor.textContent = `View details`;
        bgAnchor.href = `./product-listing.html`;
        divBg.appendChild(bgAnchor);
        containerCard.appendChild(cardImageDiv);
        cardImageDiv.appendChild(divImage);
        cardImageDiv.appendChild(divBg);

        let cardTitleDiv = document.createElement(`div`);
        let divH3 = document.createElement(`h3`);
        divH3.textContent = ele[`items`][random][`title`];
        let divH4 = document.createElement(`h4`);
        divH4.textContent = `$${ele[`items`][random][`price`]}`;
        containerCard.appendChild(cardTitleDiv);
        cardTitleDiv.appendChild(divH3);
        cardTitleDiv.appendChild(divH4);

        containerCard.addEventListener(`click`, () => {
          if (divBg.style.transform === `rotateX(90deg)`) {
            divBg.style.transform = `rotateX(0)`;
          } else {
            divBg.style.transform = `rotateX(90deg)`;
          }
        })

        bgAnchor.addEventListener(`click`, (e) => {
          localStorage.removeItem(`item`);
          localStorage.setItem(`item`, ele[`items`][random][`title`]);
        })

        containerCard.addEventListener(`mouseenter`, () => {
          if (screen.width > 1000) {
            divBg.style.transform = `rotateX(0)`;
          }
        })

        containerCard.addEventListener(`mouseleave`, () => {
          if (screen.width > 1000) {
            divBg.style.transform = `rotateX(90deg)`;
          }
        })
      }
    }
  });
  // ============== Suggestion cards build ends ==============

})

// ============== API fetch ends ==================