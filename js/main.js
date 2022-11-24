// Mobile Menu
const mobileMenuBtn = document.querySelector(".menu-icon");
const mobileMenu = document.querySelector(".header__menu--list");
const darkBackground = document.querySelector(".dark-background");

mobileMenuBtn.onclick = () => {
    darkBackground.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    mobileMenu.classList.contains("active")
        ? mobileMenuBtn.src = "./images/icon-close.svg"
        : mobileMenuBtn.src = "./images/icon-menu.svg";
}


// Image Slider
const sliderImgSelector = document.querySelectorAll(".slider__selector--img img");
const sliderImg = document.querySelector(".slider__img");

sliderImgSelector.forEach(el => {
    el.addEventListener("click", () => {
        sliderImg.src = `/images/image-product-${el.getAttribute("value")}.jpg`;
    });
});


// Arrow Image Slider
const sliderArrowPrevious = document.querySelector(".previous");
const sliderArrowNext = document.querySelector(".next");

let counter = 1;

const previousImg = (img) => {
    if (counter > 1) {
        counter--;
        img.src = `/images/image-product-${counter}.jpg`;
    } else {
        counter = 4;
        img.src = `/images/image-product-${counter}.jpg`;
    }
}

const nextImg = (img) => {
    if (counter < 4) {
        counter++;
        img.src = `/images/image-product-${counter}.jpg`;
    } else {
        counter = 1;
        img.src = `/images/image-product-${counter}.jpg`;
    }
}

sliderArrowPrevious.onclick = () => previousImg(sliderImg);
sliderArrowNext.onclick = () => nextImg(sliderImg);


// Slider Image Focus
const sliderImgFocus = document.querySelector(".slider__focus--img img");
const sliderFocus = document.querySelector(".slider-focus");
const closeIcon = document.querySelector(".close-icon");

const sliderArrowFocusPrevious = document.querySelector(".focus-previous");
const sliderArrowFocusNext = document.querySelector(".focus-next");

sliderImg.onclick = () => {
    if (window.innerWidth >= 850) {
        darkBackground.classList.add("active");
        sliderFocus.classList.add("active");
    }
}

closeIcon.onclick = () => {
    darkBackground.classList.remove("active");
    sliderFocus.classList.remove("active");
}

const sliderFocusImgSelector = document.querySelectorAll(".slider__selector--focus-img img");

sliderFocusImgSelector.forEach(el => {
    el.addEventListener("click", () => {
        sliderImgFocus.src = `/images/image-product-${el.getAttribute("focus-value")}.jpg`;
        counter = el.id;

        sliderFocusImgSelector.forEach(el => el.classList.remove("selected"));
        el.classList.add("selected");
    });
});

sliderArrowFocusPrevious.onclick = () => {
    previousImg(sliderImgFocus);
    sliderFocusImgSelector.forEach(el => el.classList.remove("selected"));

    let selectedImg = document.querySelector(`[focus-value="${counter}"]`);
    selectedImg.classList.add("selected");
};

sliderArrowFocusNext.onclick = () => {
    nextImg(sliderImgFocus);
    sliderFocusImgSelector.forEach(el => el.classList.remove("selected"));
    
    let selectedImg = document.querySelector(`[focus-value="${counter}"]`);
    selectedImg.classList.add("selected");
};


// input
const input = document.querySelector(".order__quantity--input");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");

minusBtn.onclick = () => (input.value > 0) ?input.value-- :input.value;
plusBtn.onclick = () => input.value++;


// Add to cart & Remove from cart
const cartBtn = document.querySelector(".header__cart-icon");
const cart = document.querySelector(".cart");
const cartQuantityBubble = document.querySelector(".cart-icon--quantity");
const addToCartBtn = document.querySelector(".order__cart");
const cartContainer = document.querySelector(".cart-content");
const productElement = document.createElement("div");
const removeFromCartBtn = document.createElement("button");

cartBtn.onclick = () => cart.classList.toggle("active");

productElement.classList.add("cart__product");
removeFromCartBtn.classList.add(".cart__product--delete");
removeFromCartBtn.innerHTML = `<img src="./images/icon-delete.svg" alt="">`;

let product = {
    name: "Fall Limited Edition Sneakers",
    price : 125,
    quantity: sessionStorage.getItem("quantity") || 0,
};


const updateCart = () => {
    cartContainer.classList.remove("empty");
    cartQuantityBubble.classList.remove("empty");
    cartQuantityBubble.innerText = product.quantity;

    let total = product.price * product.quantity;

    let htmlCode = 
        `<img class="cart__product--img" src="./images/image-product-1-thumbnail.jpg" alt="">

        <div class="cart__product--info">
            <p class="cart__info--title">${product.name}</p>
            <span class="cart__info--quantity">$${product.price} x ${product.quantity}</span>
            <b class="cart__info--price">$${total}.00 </b>
        </div>`;

    productElement.innerHTML = htmlCode;
    productElement.appendChild(removeFromCartBtn);
    cartContainer.appendChild(productElement);
}

const addToCart = () => {
    if (input.value <= 0 || input.value == undefined || null) {
            alert("error");
            return;
    }
    
    cart.classList.add("active");
    cartContainer.classList.remove("empty");
    
    product.quantity = parseInt(product.quantity) + parseInt(input.value);

    updateCart();
    sessionStorage.setItem("quantity", product.quantity);
};

const removeFromCart = () => {
    if (!cartContainer.classList.contains("empty")) {
        cartContainer.removeChild(productElement);
        cartContainer.classList.add("empty");
        cartQuantityBubble.innerText = "";
        product.quantity = 0;
        sessionStorage.setItem("quantity", product.quantity);
    }
};

addToCartBtn.onclick = () => addToCart();
removeFromCartBtn.onclick = () => removeFromCart();

if (sessionStorage.getItem("quantity") >= 1) {
    updateCart();
}
