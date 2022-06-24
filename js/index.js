// ============== navbar ==================
let nav = document.querySelector("nav");
let menuIcon = document.querySelector(".fa-bars");
menuIcon.addEventListener("click", navDisplay);

function navDisplay(e) {
  if (e.target.classList.contains("rotate-menu")) {
    e.target.classList.remove("rotate-menu");
    nav.classList.add("slide-out");
    setTimeout(() => {
      nav.style.display = "none";
      nav.classList.remove("slide-out");
    }, 500);
  } else {
    e.target.classList.add("rotate-menu");
    nav.classList.add("slide-in");
    nav.style.display = "block";
    setTimeout(() => {
      nav.classList.remove("slide-in");
    }, 1500);
  }
}

// ============== New products ==================
let newContainer = document.querySelector(`#new-products .container`);
// ============== Popular products ==================
let popularProducts = document.querySelector(`#popular-products .container`);

fetch(`./API/data.json`)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * 20);
      let card = document.createElement(`div`);
      card.classList = `card`;
      newContainer.appendChild(card);

      let imgDiv = document.createElement(`div`);
      card.appendChild(imgDiv);

      let image = document.createElement(`img`);
      image.src = data[i][`items`][random][`img-src`];
      image.setAttribute(`alt`, `${data[i][`items`][random][`title`]}`);
      imgDiv.appendChild(image);

      let overlayDiv = document.createElement(`div`);
      overlayDiv.classList = `bg`;
      let anchor = document.createElement(`a`);
      anchor.textContent = `View details`;
      anchor.setAttribute(`href`, `./html/product-listing.html`);
      overlayDiv.appendChild(anchor);
      imgDiv.appendChild(overlayDiv);

      let textDiv = document.createElement(`div`);
      card.appendChild(textDiv);
      let heading = document.createElement(`h5`);
      heading.textContent = data[i][`items`][random][`title`];
      textDiv.appendChild(heading);
      let span = document.createElement(`span`);
      span.textContent = `$${data[i][`items`][random][`price`]}`;
      textDiv.appendChild(span);

      card.addEventListener("mouseenter", () => {
        overlayDiv.style.transform = `rotateX(0deg)`;
      });
      card.addEventListener("mouseleave", () => {
        overlayDiv.style.transform = `rotateX(90deg)`;
      });
      card.addEventListener("click", () => {
        if (overlayDiv.style.transform === `rotateX(0deg)`) {
          overlayDiv.style.transform = `rotateX(90deg)`;
        } else {
          overlayDiv.style.transform = `rotateX(0deg)`;
        }
      });

      anchor.addEventListener(`click`, () => {
        localStorage.setItem(`item`, data[i][`items`][random][`title`]);
      });
    }

    for(let i = 2; i < 6; i++){
      let random = Math.floor(Math.random() * 20)
      let card = document.createElement(`div`);
      card.classList = `card`
      popularProducts.appendChild(card);
  
      let imgDiv = document.createElement(`div`);
      card.appendChild(imgDiv);
  
      let image = document.createElement(`img`);
      image.src = data[i][`items`][random][`img-src`];
      image.setAttribute(`alt`, `${data[i][`items`][random][`title`]}`)
      imgDiv.appendChild(image)
  
      let overlayDiv = document.createElement(`div`);
      overlayDiv.classList = `bg`;
      let anchor = document.createElement(`a`);
      anchor.textContent = `View details`
      anchor.setAttribute(`href`, `./html/product-listing.html`)
      overlayDiv.appendChild(anchor);
      imgDiv.appendChild(overlayDiv)
  
      let textDiv = document.createElement(`div`);
      card.appendChild(textDiv);
      let heading = document.createElement(`h5`);
      heading.textContent = data[i][`items`][random][`title`];
      textDiv.appendChild(heading);
      let span = document.createElement(`span`);
      span.textContent =  `$${data[i][`items`][random][`price`]}`
      textDiv.appendChild(span);
  
      card.addEventListener('mouseenter', () =>{
        overlayDiv.style.transform = `rotateX(0deg)`
      })
      card.addEventListener('mouseleave', () =>{
        overlayDiv.style.transform = `rotateX(90deg)`
      })
      card.addEventListener('click', () =>{
        if(overlayDiv.style.transform === `rotateX(0deg)`){
          overlayDiv.style.transform = `rotateX(90deg)`
        }else {
          overlayDiv.style.transform = `rotateX(0deg)`
        }
      })
  
      anchor.addEventListener(`click`, () => {
        localStorage.setItem(`item`, data[i][`items`][random][`title`])
      })
    }
  });
