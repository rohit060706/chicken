
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        total = total + item.price * item.quantity;
        let li = document.createElement("li");
        li.innerHTML = `
        <strong>${item.name}</strong> (Size: ${item.size})<br>
        $${item.price} x ${item.quantity}
      `;
        cartItems.appendChild(li);
    });

    cartCount.innerText = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartTotal.innerText = total.toFixed(2);
});

(function () {
    emailjs.init("F1W6Iq802POhW7uzy");
})();

function sendMail() {
    var params = {
        name: $("#name").val(),
        email: $("#email").val(),
        message: $("#message").val(),
    };

    const serviceID = "service_68oi1bg";
    const templateID = "template_dtr3on5";

    emailjs.send(serviceID, templateID, params)
        .then(function (res) {
            $("#name, #email, #message").val("");
            alert("Email sent successfully!");
        })
        .catch(function (err) {
            console.log("Failed to send email!", err);
        });
}

function toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
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