// ============== navbar ==================
let nav = document.querySelector("nav");
let menuIcon = document.querySelector(".fa-bars");
menuIcon.addEventListener("click", navDisplay);
let purchase = JSON.parse(window.localStorage.getItem("purchase"));

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

//? check if purchase is empty  
checkCardEmpty()
function checkCardEmpty(){
  if (purchase.length>0) {
    console.log("testtt")
    getPurchaes();
  } else {
    cardIsEmpety()
  }
}
//? change display  of view when  purchase is empty  

function cardIsEmpety(){
  let emptyCart = document.getElementById("empty-cart");
  let cardContainer = document.getElementById("card-container");
  let subtotal = document.getElementById("subtotal");
  let btnCheckout = document.getElementById("btn-checkout");
  emptyCart.style.display = "block";
  cardContainer.style.display = "none";
  subtotal.style.display = "none";
  btnCheckout.style.display = "none";
}

//? get data form localStorge
function getPurchaes() {
  // let purchase = JSON.parse(window.localStorage.getItem("purchase"));
  // console.log (purchase[0]['img-src']);
  let cardContainer = document.getElementById("card-container");
  for (let i = 0; i < purchase.length; i++) {
    //!   Create Card
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    cardContainer.appendChild(card);
    //?   1 img products
    const cardImg = document.createElement("img");
    cardImg.setAttribute("class", "card-img");
    cardImg.src = purchase[i]["img-src"];
    card.appendChild(cardImg);

    //!   inner div in every card , created to management card style in responsive

    const cardInnerDiv = document.createElement("div");
    cardInnerDiv.setAttribute("class", "card-inner-div");
    card.appendChild(cardInnerDiv);

    //!  div container includes title and Discription
    const titleDiscriptionContainer = document.createElement("div");
    titleDiscriptionContainer.setAttribute(
      "class",
      "title-discription-container"
    );
    cardInnerDiv.appendChild(titleDiscriptionContainer);
    //?   1 Title products
    const cardTitle = document.createElement("h3");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = purchase[i]["title"];
    titleDiscriptionContainer.appendChild(cardTitle);

    //?   2 discriptoin products
    const cardDescription = document.createElement("p");
    cardDescription.setAttribute("class", "card-description");
    cardDescription.textContent = purchase[i]["description"];
    titleDiscriptionContainer.appendChild(cardDescription);
    //!   7   quantityContainer includes inrease and decrease
    const quantityContainer = document.createElement("div");
    quantityContainer.setAttribute("class", "quantity-container");
    cardInnerDiv.appendChild(quantityContainer);

    //?   1 increase
    const quantityIncrease = document.createElement("p");
    quantityIncrease.setAttribute("class", "quantity-increase");
    quantityIncrease.textContent = "+";
    quantityContainer.appendChild(quantityIncrease);
    quantityIncrease.addEventListener("click", increase);
    //?   2 quantity
    let cardPrice = document.createElement("p");
    cardPrice.setAttribute("class", "card-price");
    cardPrice.textContent = purchase[i]["amount"];
    quantityContainer.appendChild(cardPrice);
    //?   3 Decrease
    const quantityDecrease = document.createElement("p");
    quantityDecrease.setAttribute("class", "quantity-decrease");
    quantityDecrease.textContent = "-";
    quantityContainer.appendChild(quantityDecrease);
    quantityDecrease.addEventListener("click", decrease);
    //?   3 delete
    const deleteItem = document.createElement("i");
    deleteItem.setAttribute("class", "fa-solid fa-trash delete-item");
    // quantityDecrease.textContent = "-";
    quantityContainer.appendChild(deleteItem);
    deleteItem.addEventListener("click", deleteProduct);
    //!   11   Total Price for every card in cart
    let cardTotalPrice = document.createElement("div");
    cardTotalPrice.setAttribute("class", "card-total");
    cardInnerDiv.appendChild(cardTotalPrice);
    let priceOnePiece = document.createElement("p");
    priceOnePiece.setAttribute("class", "priceOnePiece");
    priceOnePiece.textContent = "$" + Number(purchase[i]["price"].substring(1));
    // console.log(TotalPrice.textContent)
    priceOnePiece.style.display = "none";
    cardTotalPrice.appendChild(priceOnePiece);

    //? text "total: "
    let spanTotal = document.createElement("p");
    spanTotal.setAttribute("class", "span-total");
    spanTotal.textContent = "total:" + "\xa0";
    cardTotalPrice.appendChild(spanTotal);

    //? value total
    let TotalPrice = document.createElement("p");
    TotalPrice.setAttribute("class", "total-price");
    TotalPrice.textContent =
      "$" + Number(purchase[i]["price"].substring(1)) * cardPrice.textContent;
    cardTotalPrice.appendChild(TotalPrice);
  }
}

//? increase count of product  

function increase(e) {
  //edit Quantity in view
  e.target.nextElementSibling.textContent =
    Number(e.target.nextElementSibling.textContent) + 1;

  // total price for one prouduct
  let count = e.target.nextElementSibling.textContent;
  let onePice = Number(
    e.target.parentElement.nextElementSibling.firstChild.textContent.substring(
      1
    )
  );
  e.target.parentElement.nextElementSibling.lastChild.textContent =
  "$" + count * onePice;

    //edit Quantity in localStorge
  let titleprouduct =e.target.parentElement.previousElementSibling.firstChild.textContent;
  for (let i = 0; i < purchase.length; i++) {
    if (titleprouduct == purchase[i]["title"]) {
      purchase[i]["amount"]=count;
    }
  }

  window.localStorage.setItem("purchase", JSON.stringify(purchase));
    //Recalculate the total prices for all products
    subTotal();
}
//? decrease count of product  

function decrease(e) {
  //!edit Quantity in view
  if (Number(e.target.previousElementSibling.textContent) > 1) {
    e.target.previousElementSibling.textContent =
      Number(e.target.previousElementSibling.textContent) - 1;
  } else {
    e.target.previousElementSibling.textContent = Number(
      e.target.previousElementSibling.textContent
    );
  }

  // total price for one prouduct
  let count = e.target.previousElementSibling.textContent;
  console.log(count)
  let onePice = Number(
    e.target.parentElement.nextElementSibling.firstChild.textContent.substring(
      1
    )
  );

  e.target.parentElement.nextElementSibling.lastChild.textContent =
    "$" + count * onePice;

    //edit Quantity in localStorge
  let titleprouduct =e.target.parentElement.previousElementSibling.firstChild.textContent;
  for (let i = 0; i < purchase.length; i++) {
    if (titleprouduct == purchase[i]["title"]) {
      purchase[i]["amount"]=count;
    }
  }
  window.localStorage.setItem("purchase", JSON.stringify(purchase));
    //Recalculate the total prices for all products
  subTotal();
}

//? Remove product from cart
function deleteProduct(e) {
  let titleprouduct =
    e.target.parentElement.previousElementSibling.firstChild.textContent;
  let containerCard =
    e.target.parentElement.previousElementSibling.parentElement.parentElement
      .parentElement;
let card=e.target.parentElement.previousElementSibling.parentElement.parentElement
  for (let i = 0; i < purchase.length; i++) {
    if (titleprouduct == purchase[i]["title"]) {
      purchase.splice(i, 1);
      containerCard.removeChild(card);
      subTotal(); 
      i--;
    }
  }
  // 
  window.localStorage.setItem("purchase", JSON.stringify(purchase));
  //if last element in cart deleted call function   cardIsEmpety()
if(purchase.length==0){
  cardIsEmpety()
}
}
//?  calculates the sum of prices for all products in the basket
subTotal();
function subTotal() {
  let subtotal = document.getElementById("subtotal-num");
  let s = document.querySelectorAll(".total-price");
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    console.log(s[i].textContent);
    sum += Number(s[i].textContent.substring(1));
  }
  subtotal.textContent = "$" + sum;
  // console.log(sum);
}
