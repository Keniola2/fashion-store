const productEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector('.subtotal');
const totalItemsInCartEl = document.querySelectorAll('.total-items-in-cart');
const shirtsEl = document.querySelector(".shirts");
const pantsEl = document.querySelector(".pants");
const jacketsEl = document.querySelector(".jackets");
const button=document.querySelectorAll(".btn")


function renderProducts(){
    if (window.focus=productEl) {
        shirts.forEach(shirt=>{
            productEl.innerHTML +=`
            <div class="product">
          <div id="carouselExampleSlidesOnly" class="carousel slide slide-size" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${shirt.img1}" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="${shirt.img2}" class="d-block w-100" alt="...">
              </div>
            </div>
          </div>
    
          <a href="#"><p><strong>${shirt.name}</strong></p></a>
          <div class="pdetails">
            <div class="price">$${shirt.price}</div>
            <div class="size">
            <select>
            <option>${shirt.size[0]}</option>
            <option>${shirt.size[1]}</option>
            <option>${shirt.size[2]}</option>
            </select>
            </div>
            <button class="btn"  onclick="addToCart(${shirt.id})">ADD TO CART</button>
          </div>
        </div>`
        })
        
    } if (window.focus=pantsEl) { pants.forEach(pant=>{
        pantsEl.innerHTML +=`<div class="pant">
        <div id="carouselExampleSlidesOnly" class="carousel slide slide-size" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${pant.img1}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${pant.img2}" class="d-block w-100" alt="...">
            </div>
          </div>
        </div>
  
        <a href="#"><p><strong>${pant.name}</strong></p></a>
        <div class="pdetails">
          <div class="price">$${pant.price}</div>
          <div class="size">
          <select>
          <option>${pant.size[0]}</option>
          <option>${pant.size[1]}</option>
          <option>${pant.size[2]}</option>
          </select>
          </div>
          <button class="btn" onclick="addToCart(${pant.id})" >ADD TO CART</button>
        </div>
      </div>`
    })
        
    }
    if (window.focus=jacketsEl) { jackets.forEach(jacket=>{
        jacketsEl.innerHTML +=`<div class="jacket">
        <div id="carouselExampleSlidesOnly" class="carousel slide slide-size" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${jacket.img1}" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="${jacket.img2}" class="d-block w-100" alt="...">
            </div>
          </div>
        </div>
  
        <a href="#"><p><strong>${jacket.name}</strong></p></a>
        <div class="pdetails">
          <div class="price">$${jacket.price}</div>
          <div class="size">
          <select>
            <option >${jacket.size[0]}</option>
            <option>${jacket.size[1]}</option>
            <option>${jacket.size[2]}</option>
          </select>
          </div>
          <button class="btn" onclick="addToCart(${jacket.id})">ADD TO CART</button>
        </div>
      </div>`
    })
        
    }
   
}



 const cart = [];

 function addToCart(id) {
  let cartData = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the item already exists in the cart
  if (cartData.some((item) => item.id === id)) {
    alert("Product already in cart");
  } else {
    // Find the item to add based on the provided ID
    const item = shirts.find((shirt) => shirt.id === id) || pants.find((pant) => pant.id === id) || jackets.find((jacket) => jacket.id === id);

    // Add the item to the cart with an initial quantity of 1
    cartData.push({ ...item, numberOfUnits: 1,});

    // Update the cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
  
  alert('Added to cart');
  updateCart();
}



  function increaseNumberOfUnit(itemId){
    const cartData =JSON.parse(localStorage.getItem('cart')) || [];

    const item =cartData.find((item)=>item.id===itemId)
    if (item) {
      item.numberOfUnits++;
      localStorage.setItem('cart',JSON.stringify(cartData));
//////////////////// update the number element for the corresponding item
const numberElement =document.querySelector(`.number[data-item-id="${itemId}"]`);
if (numberElement) {
  numberElement.textContent = item.numberOfUnits;
}   
    } 
   updateCart() 
  }

  function decreaseNumberOfUnit(itemId){
    const cartData =JSON.parse(localStorage.getItem('cart')) || [];

    const item =cartData.find((item)=>item.id===itemId)
    if (item) {
      if (item.numberOfUnits>0) {
        item.numberOfUnits--;
        localStorage.setItem('cart',JSON.stringify(cartData));
        /////////////////
        const numberElement = document.querySelector(`.number[data-item-id="${itemId}"]`);
if (numberElement) {
  numberElement.textContent = item.numberOfUnits;
}

      }
    } 
 updateCart()
  }

  

  function renderSubtotal() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;
    let totalItem = 0;
  
    cartData.forEach((item) => {
      totalPrice += item.price * item.numberOfUnits;
      totalItem += item.numberOfUnits;
    });
  
    subtotalEl.innerHTML = `Subtotal (${totalItem} items): $${totalPrice.toFixed(2)}`;
  
    const totalItemsInCartElements = document.querySelectorAll('.total-items-in-cart');
    
    totalItemsInCartElements.forEach((element) => {
      element.innerHTML= `CART (${totalItem})`;
    });
  }
////////render cart items///////////////////
  function renderCartItems(){
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
   cartItemsEl.innerHTML = '';
      // Render the cart items
      cartData.forEach((item) => {
        console.log(item)
        cartItemsEl.innerHTML += `
          <div class="cart-item">
            <div class="item-info">
              <img src="${item.img1}" alt="">
              <p class="item-name">${item.name} <small id="smz"></small></p>
              <div class="remove" onclick="removeCartItem(${item.id})">
              <p>Remove</P>
              </div>
            </div>
            <div class="unit-price">
              <small>$</small>${item.price}
            </div>
            <div class="units">
              <div class="btn minus" onclick="decreaseNumberOfUnit(${item.id})"><p>-</p></div>
              <div class="number" data-item-id="${item.id}">${item.numberOfUnits}</div>
              <div class="btn plus" onclick="increaseNumberOfUnit(${item.id})"><P>+</P></div>
            </div>
          </div>`;
      });
    }

    function removeCartItem(itemId) {
      let cartData = JSON.parse(localStorage.getItem('cart')) || [];
    
      // Filter out the item with the matching ID
      cartData = cartData.filter((item) => item.id !== itemId);
    
      localStorage.setItem('cart', JSON.stringify(cartData));
      updateCart();
     // alert('Removed from cart');
    }
    
    function updateCart(){
  renderCartItems()
  renderSubtotal()
      }
    renderProducts()
    updateCart()

    function showMenu(params) {
      document.querySelector(".menu").style.display='flex'
      
    }

function hideMenu(params) {
  document.querySelector(".menu").style.display='none'
  
}




