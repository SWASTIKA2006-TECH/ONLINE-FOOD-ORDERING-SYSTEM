let cart = [];

const buttons = document.querySelectorAll(".add-to-cart");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout-btn");

const customerName = document.getElementById("customer-name");
const customerPhone = document.getElementById("customer-phone");
const customerAddress = document.getElementById("customer-address");

// Add food items to cart
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const name = button.getAttribute("data-name");
        const price = Number(button.getAttribute("data-price"));

        cart.push({
            name: name,
            price: price
        });

        displayCart();
    });
});

// Display cart items and total
function displayCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(function(item) {
        const li = document.createElement("p");
        li.textContent = item.name + " - ₹" + item.price;

        cartItems.appendChild(li);
        total += item.price;
    });

    totalElement.textContent = total;
}

// Place Order and Show Order Summary
checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();
    const address = customerAddress.value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Please fill in all customer details.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    let total = 0;
    let orderDetails = "";

    cart.forEach(function(item) {
        orderDetails += item.name + " - Rs. " + item.price + "\n";
        total += item.price;
    });

    const summary =
        "ORDER SUMMARY\n\n" +
        "Customer Name: " + name + "\n\n" +
        "Ordered Items:\n" +
        orderDetails +
        "\nTotal Amount: Rs. " + total +
        "\n\nYour order has been placed successfully!";

    alert(summary);

    cart = [];
    displayCart();

    customerName.value = "";
    customerPhone.value = "";
    customerAddress.value = "";
});