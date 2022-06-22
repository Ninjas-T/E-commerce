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
// ================== categories section ===============
let cards = document.querySelectorAll('.card div:nth-child(1)');
let dropDown = document.querySelector('.list');
let catButton = document.querySelector('#categories');
let main = document.querySelector('main');
let viewCollection = document.querySelector('#view-collection button');
let picked = 'All';

catButton.addEventListener('click', showList);
catButton.addEventListener('mouseenter', hoverList);
catButton.addEventListener('mouseleave', removeHoverlist);
dropDown.addEventListener('click', pickCategory);
dropDown.addEventListener('mouseenter', hoverList);
dropDown.addEventListener('mouseleave', removeHoverlist);
viewCollection.addEventListener('click', showAll);

fetch('../API/data.json')
  .then((data) => data.json())
  .then((data) => {
    let products = [];
    let itemSection = document.createElement('section');

    data.forEach((ele) => {
      products.push(ele['items'][6]);
      products.push(ele['items'][15]);
    });

    products.forEach((item, i) => {
      let card = document.createElement('div');
      card.classList = 'card';
      itemSection.appendChild(card);

      let imgDiv = document.createElement('div');
      imgDiv.addEventListener('click', overlay);
      imgDiv.addEventListener('mouseenter', showOverlay);
      imgDiv.addEventListener('mouseleave', removeOverlay);

      let image = document.createElement('img');
      image.src = item['img-src'];
      imgDiv.appendChild(image);

      let layer = document.createElement('div');
      layer.classList = 'overlay';
      let btn = document.createElement('button');
      btn.textContent = 'View Details';
      btn.addEventListener('click', viewDetails);
      layer.appendChild(btn);
      imgDiv.appendChild(layer);

      card.appendChild(imgDiv);

      let detailsDiv = document.createElement('div');
      card.appendChild(detailsDiv);
      let h3 = document.createElement('h3');
      h3.textContent = item['title'];
      detailsDiv.appendChild(h3);

      let h4 = document.createElement('h4');
      h4.textContent = `$${item['price']}`;

      detailsDiv.appendChild(h4);
    });
    main.childNodes[5].replaceWith(itemSection);
  });

function hoverList() {
  dropDown.style.display = 'block';
}

function removeHoverlist() {
  dropDown.style.display = 'none';
}

function overlay(e) {
  let over = e.target.parentElement.children[1];
  if (over.style.transform === 'rotateX(0deg)')
    over.style.transform = 'rotateX(90deg)';
  else over.style.transform = 'rotateX(0deg)';
}

function showOverlay(e) {
  let over = e.target.children[1];
  over.style.transform = 'rotateX(0deg)';
}

function removeOverlay(e) {
  let over = e.target.children[1];
  over.style.transform = 'rotateX(90deg)';
}

function showList(e) {
  console.log('clicked');
  if (dropDown.style.display === 'none') dropDown.style.display = 'block';
  else dropDown.style.display = 'none';
}

function viewDetails(e) {
  let item =
    e.target.parentElement.parentElement.parentElement.children[1].children[0]
      .textContent;
  localStorage.setItem('item', item);
  window.location.href = '../html/product-listing.html';
}

function pickCategory(e) {
  let category = e.target.textContent;
  picked = category;
  let itemSection = document.createElement('section');

  if (category === 'All') {
    fetch('../API/data.json')
      .then((data) => data.json())
      .then((data) => {
        let products = [];
        let itemSection = document.createElement('section');

        data.forEach((ele) => {
          products.push(ele['items'][6]);
          products.push(ele['items'][15]);
        });

        products.forEach((item, i) => {
          let card = document.createElement('div');
          card.classList = 'card';
          itemSection.appendChild(card);

          let imgDiv = document.createElement('div');
          imgDiv.addEventListener('click', overlay);
          imgDiv.addEventListener('mouseenter', showOverlay);
          imgDiv.addEventListener('mouseleave', removeOverlay);

          let image = document.createElement('img');
          image.src = item['img-src'];
          imgDiv.appendChild(image);

          let layer = document.createElement('div');
          layer.classList = 'overlay';
          let btn = document.createElement('button');
          btn.textContent = 'View Details';
          btn.addEventListener('click', viewDetails);
          layer.appendChild(btn);
          imgDiv.appendChild(layer);

          card.appendChild(imgDiv);

          let detailsDiv = document.createElement('div');
          card.appendChild(detailsDiv);
          let h3 = document.createElement('h3');
          h3.textContent = item['title'];
          detailsDiv.appendChild(h3);

          let h4 = document.createElement('h4');
          h4.textContent = `$${item['price']}`;

          detailsDiv.appendChild(h4);
        });
        main.childNodes[5].replaceWith(itemSection);
      });
  } else {
    fetch('../API/data.json')
      .then((data) => data.json())
      .then((data) => {
        let products = [];

        data.forEach((ele) => {
          if (ele['category'] === category) products.push(...ele['items']);
        });

        products.splice(0, 12).forEach((item, i) => {
          let card = document.createElement('div');
          card.classList = 'card';
          itemSection.appendChild(card);

          let imgDiv = document.createElement('div');
          imgDiv.addEventListener('click', overlay);
          imgDiv.addEventListener('mouseenter', showOverlay);
          imgDiv.addEventListener('mouseleave', removeOverlay);

          let image = document.createElement('img');
          image.src = item['img-src'];
          imgDiv.appendChild(image);

          let layer = document.createElement('div');
          layer.classList = 'overlay';
          let btn = document.createElement('button');
          btn.textContent = 'View Details';
          btn.addEventListener('click', viewDetails);
          layer.appendChild(btn);
          imgDiv.appendChild(layer);

          card.appendChild(imgDiv);

          let detailsDiv = document.createElement('div');
          card.appendChild(detailsDiv);
          let h3 = document.createElement('h3');
          h3.textContent = item['title'];
          detailsDiv.appendChild(h3);

          let h4 = document.createElement('h4');
          h4.textContent = `$${item['price']}`;

          detailsDiv.appendChild(h4);
        });
      });
  }
  main.childNodes[5].replaceWith(itemSection);
}

function showAll(e) {
  console.log(e.target.textContent);
  let itemSection = document.createElement('section');

  if (e.target.textContent == 'View Collection') {
    if (picked !== 'All') {
      fetch('../API/data.json')
        .then((data) => data.json())
        .then((data) => {
          let products = [];

          data.forEach((ele) => {
            if (ele['category'] === picked) products.push(...ele['items']);
          });

          products.forEach((item, i) => {
            let card = document.createElement('div');
            card.classList = 'card';
            itemSection.appendChild(card);

            let imgDiv = document.createElement('div');
            imgDiv.addEventListener('click', overlay);
            imgDiv.addEventListener('mouseenter', showOverlay);
            imgDiv.addEventListener('mouseleave', removeOverlay);

            let image = document.createElement('img');
            image.src = item['img-src'];
            imgDiv.appendChild(image);

            let layer = document.createElement('div');
            layer.classList = 'overlay';
            let btn = document.createElement('button');
            btn.textContent = 'View Details';
            btn.addEventListener('click', viewDetails);
            layer.appendChild(btn);
            imgDiv.appendChild(layer);

            card.appendChild(imgDiv);

            let detailsDiv = document.createElement('div');
            card.appendChild(detailsDiv);
            let h3 = document.createElement('h3');
            h3.textContent = item['title'];
            detailsDiv.appendChild(h3);

            let h4 = document.createElement('h4');
            h4.textContent = `$${item['price']}`;

            detailsDiv.appendChild(h4);
          });
        });

      e.target.textContent = 'Show less';
    } else {
      fetch('../API/data.json')
        .then((data) => data.json())
        .then((data) => {
          let products = [];

          data.forEach((ele) => {
            products.push(...ele['items']);
          });

          products.forEach((item, i) => {
            let card = document.createElement('div');
            card.classList = 'card';
            itemSection.appendChild(card);

            let imgDiv = document.createElement('div');
            imgDiv.addEventListener('click', overlay);
            imgDiv.addEventListener('mouseenter', showOverlay);
            imgDiv.addEventListener('mouseleave', removeOverlay);

            let image = document.createElement('img');
            image.src = item['img-src'];
            imgDiv.appendChild(image);

            let layer = document.createElement('div');
            layer.classList = 'overlay';
            let btn = document.createElement('button');
            btn.textContent = 'View Details';
            btn.addEventListener('click', viewDetails);
            layer.appendChild(btn);
            imgDiv.appendChild(layer);

            card.appendChild(imgDiv);

            let detailsDiv = document.createElement('div');
            card.appendChild(detailsDiv);
            let h3 = document.createElement('h3');
            h3.textContent = item['title'];
            detailsDiv.appendChild(h3);

            let h4 = document.createElement('h4');
            h4.textContent = `$${item['price']}`;

            detailsDiv.appendChild(h4);
          });
        });
    }
    e.target.textContent = 'Show less';
  } else {
    if (picked !== 'All') {
      fetch('../API/data.json')
        .then((data) => data.json())
        .then((data) => {
          let products = [];

          data.forEach((ele) => {
            if (ele['category'] === picked) products.push(...ele['items']);
          });

          products.splice(0, 12).forEach((item, i) => {
            let card = document.createElement('div');
            card.classList = 'card';
            itemSection.appendChild(card);

            let imgDiv = document.createElement('div');
            imgDiv.addEventListener('click', overlay);
            imgDiv.addEventListener('mouseenter', showOverlay);
            imgDiv.addEventListener('mouseleave', removeOverlay);

            let image = document.createElement('img');
            image.src = item['img-src'];
            imgDiv.appendChild(image);

            let layer = document.createElement('div');
            layer.classList = 'overlay';
            let btn = document.createElement('button');
            btn.textContent = 'View Details';
            btn.addEventListener('click', viewDetails);
            layer.appendChild(btn);
            imgDiv.appendChild(layer);

            card.appendChild(imgDiv);

            let detailsDiv = document.createElement('div');
            card.appendChild(detailsDiv);
            let h3 = document.createElement('h3');
            h3.textContent = item['title'];
            detailsDiv.appendChild(h3);

            let h4 = document.createElement('h4');
            h4.textContent = `$${item['price']}`;

            detailsDiv.appendChild(h4);
          });
        });

      e.target.textContent = 'View Collection';
    } else {
      fetch('../API/data.json')
        .then((data) => data.json())
        .then((data) => {
          let products = [];

          data.forEach((ele) => {
            products.push(ele['items'][6]);
            products.push(ele['items'][15]);
          });

          products.splice(0, 12).forEach((item, i) => {
            let card = document.createElement('div');
            card.classList = 'card';
            itemSection.appendChild(card);

            let imgDiv = document.createElement('div');
            imgDiv.addEventListener('click', overlay);
            imgDiv.addEventListener('mouseenter', showOverlay);
            imgDiv.addEventListener('mouseleave', removeOverlay);

            let image = document.createElement('img');
            image.src = item['img-src'];
            imgDiv.appendChild(image);

            let layer = document.createElement('div');
            layer.classList = 'overlay';
            let btn = document.createElement('button');
            btn.textContent = 'View Details';
            btn.addEventListener('click', viewDetails);
            layer.appendChild(btn);
            imgDiv.appendChild(layer);

            card.appendChild(imgDiv);

            let detailsDiv = document.createElement('div');
            card.appendChild(detailsDiv);
            let h3 = document.createElement('h3');
            h3.textContent = item['title'];
            detailsDiv.appendChild(h3);

            let h4 = document.createElement('h4');
            h4.textContent = `$${item['price']}`;

            detailsDiv.appendChild(h4);
          });
        });
    }
    e.target.textContent = 'View Collection';
  }

  window.scrollTo(0, 200);
  main.childNodes[5].replaceWith(itemSection);
}
