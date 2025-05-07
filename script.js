
// Get the image element by ID (not querySelectorAll)
document.querySelectorAll(".container").forEach(img => {
  img.addEventListener("click", (event) => {
    const product = event.target.closest("#first");
    const name = product.getAttribute("data-name");
    const price = product.getAttribute("data-price");
    const id = product.getAttribute("data-id");
    const imageSrc = event.target.src;

    // Update modal content
    document.getElementById("shirt-image").src = imageSrc;
    document.getElementById("shirt-title").innerText = name;
    document.getElementById("shirt-price").innerText = `$${price}`;

    const detailsPanel = document.getElementById("details-panel-1");
    detailsPanel.setAttribute("data-name", name);
    detailsPanel.setAttribute("data-price", price);
    detailsPanel.setAttribute("data-id", id);

    // Show details panel
    document.getElementById("details-panel-1").style.display = "block";
  });
});

// Function to hide details panel
function hideDetails(elementId) {
  document.getElementById(elementId).style.display = "none";
}

hideDetails("details-panel-1");

//Add to cart
// let cart = JSON.parse(localStorage.getItem("cart")) || [];
// let selectSize = "data-size";

// document.querySelectorAll(".btn").forEach(button => {
//     button.addEventListener("click", (event) => {
//         selectSize = event.target.innerText;
//     })
// })

// document.querySelectorAll(".btn").forEach(button => {
//     button.addEventListener("click", (event) => {
//         document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("selected"))

//         event.target.classList.add("selected");

//         selectSize = event.target.getAttribute("data-size")
//     })
// })

// document.querySelectorAll(".add-to-cart").forEach(button => {
//     button.addEventListener("click", (event) => {
//         if (selectSize === null) {
//             alert("Please select size before adding to cart!");
//             return;
//         }

//         const product = document.getElementById("details-panel-1");
//         const name = product.getAttribute("data-name");
//         const price = product.getAttribute("data-price");
//         const id = product.getAttribute("data-id");
//         addToCart(id, name, price, selectSize);
//     });
// });



// function addToCart(id, name, price, size) {
//     price = parseFloat(price);
//     let existingItem = cart.find(item => item.name === name && item.size === size);
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({ id, name, price, size, quantity: 1 });
//     }
//     selectSize = null;
//     updateCart();
// }

// function updateCart() {
//     let cartItems = document.getElementById("cart-items");
//     let cartCount = document.getElementById("cart-count");
//     let cartTotal = document.getElementById("cart-total");

//     cartItems.innerHTML = "";
//     let total = 0;
//     cart.forEach((item, index) => {
//         total += item.price * item.quantity;
//         let li = document.createElement("li");
//         li.innerHTML = `
//             <div>
//                 <strong>${item.name}</strong> <span>(Size: ${item.size})</span><br>
//                 <span>Price: $${item.price}</span> - <span>Quantity: ${item.quantity}</span>
//             </div>
//             <button onclick="removeItem(${index})">❌</button>
//         `;
//         cartItems.appendChild(li);
//     });

//     cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
//     cartTotal.innerText = total.toFixed(2);
//     localStorage.setItem("cart", JSON.stringify(cart));
// }

// function removeItem(index) {
//     if (cart[index].quantity > 1) {
//         cart[index].quantity -= 1;
//     } else {
//         cart.splice(index, 1);
//     }
//     updateCart();
// }

// function clearCart() {
//     cart = [];
//     updateCart();
// }

// function toggleCart() {
//     let cartContainer = document.getElementById("cart-container");
//     cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
// }

// updateCart();


// hideDetails("cart-container");  

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectSize = null;

// Size buttons
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", (event) => {
    document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("selected"));
    event.target.classList.add("selected");
    selectSize = event.target.getAttribute("data-size");
  });
});

// Add to cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (event) => {
    if (selectSize === null) {
      alert("Please select a size before adding to cart!");
      return;
    }

    const product = document.getElementById("first");
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));
    const id = product.getAttribute("data-id");

    addToCart(id, name, price, selectSize);
  });
});

function addToCart(id, name, price, size) {
  let existingItem = cart.find(item => item.name === name && item.size === size);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, size, quantity: 1 });
  }
  selectSize = null;
  document.querySelectorAll(".btn").forEach(btn => btn.classList.remove("selected"));
  updateCart();
}

function updateCart() {
  let cartItems = document.getElementById("cart-items");
  let cartCount = document.getElementById("cart-count");
  let cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    let li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong> <span>(Size: ${item.size})</span><br>
        <span>Price: $${item.price}</span> - <span>Qty: ${item.quantity}</span>
      </div>
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.innerText = total.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
}

function toggleCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
}

// Initial load
updateCart();

