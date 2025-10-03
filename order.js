// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderContainer = document.getElementById("order-items");
const orderTotalElement = document.getElementById("order-total");
const orderMessage = document.getElementById("order-message");
const paymentFields = document.getElementById("payment-fields");

function renderOrder() {
  orderContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    orderContainer.innerHTML = "<p>Your order is empty.</p>";
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("order-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Size: ${item.size}</p>
        <p>Qty: ${item.quantity}</p>
      </div>
      <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
    `;

    orderContainer.appendChild(div);
  });

  orderTotalElement.textContent = total.toFixed(2);
}

// Show payment fields dynamically
function showPaymentFields(method) {
  paymentFields.innerHTML = "";

  if (method === "UPI") {
    paymentFields.innerHTML = `
      <input type="text" id="upiId" placeholder="Enter UPI ID" required>
    `;
  } else if (method === "Card") {
    paymentFields.innerHTML = `
      <input type="text" id="cardNumber" placeholder="Card Number" maxlength="16" required>
      <input type="text" id="expiry" placeholder="Expiry (MM/YY)" required>
      <input type="text" id="cvv" placeholder="CVV" maxlength="3" required>
    `;
  } else if (method === "NetBanking") {
    paymentFields.innerHTML = `
      <input type="text" id="bankName" placeholder="Bank Name" required>
      <input type="text" id="accountNumber" placeholder="Account Number" required>
    `;
  }
}

// Confirm order
function confirmOrder() {
  if (cart.length === 0) {
    alert("Your order is empty!");
    return;
  }

  // Delivery form validation
  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const pincode = document.getElementById("pincode").value.trim();

  if (!fullname || !phone || !address || !city || !state || !pincode) {
    alert("Please fill all delivery details!");
    return;
  }

  // Payment method validation
  const payment = document.querySelector('input[name="payment"]:checked').value;

  if (payment === "UPI") {
    const upiId = document.getElementById("upiId")?.value.trim();
    if (!upiId) return alert("Please enter UPI ID");
  } else if (payment === "Card") {
    const cardNumber = document.getElementById("cardNumber")?.value.trim();
    const expiry = document.getElementById("expiry")?.value.trim();
    const cvv = document.getElementById("cvv")?.value.trim();
    if (!cardNumber || !expiry || !cvv) return alert("Please enter complete card details");
  } else if (payment === "NetBanking") {
    const bankName = document.getElementById("bankName")?.value.trim();
    const accountNumber = document.getElementById("accountNumber")?.value.trim();
    if (!bankName || !accountNumber) return alert("Please enter Net Banking details");
  }

  // Show confirmation message
  orderMessage.style.display = "block";
  orderMessage.textContent = `✅ Order placed successfully! 
  Thank you ${fullname}. 
  Payment Method: ${payment}`;

  // Clear cart
  localStorage.removeItem("cart");
  cart = [];
  renderOrder();
}

// Listen for payment method changes
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener("change", (e) => {
    showPaymentFields(e.target.value);
  });
});

// Default (COD = no extra fields)
showPaymentFields("COD");

// Render on page load
renderOrder();
