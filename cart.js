// scripts/cart.js
(function () {
  const $ = id => document.getElementById(id);
  const cartItemsEl = $("cart-items");
  const cartTotalEl = $("cart-total");
  const cartCountEl = $("cart-count");

  function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateBadge();
  }

  function updateBadge() {
    const cart = loadCart();
    const count = cart.reduce((s, it) => s + (parseInt(it.quantity, 10) || 0), 0);
    if (cartCountEl) cartCountEl.textContent = count;
  }

  function calcTotal(cart) {
    return cart.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 0), 0);
  }

  function render() {
    const cart = loadCart();
    cartItemsEl.innerHTML = "";
    if (!cart || cart.length === 0) {
      cartItemsEl.innerHTML = "<p class='empty'>Your cart is empty.</p>";
      cartTotalEl.textContent = "0.00";
      updateBadge();
      return;
    }

    cart.forEach((item, idx) => {
      const subtotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${item.image || 'images/placeholder.png'}" alt="${item.name}" class="cart-img">
        <div class="cart-info">
          <h3 class="ci-name">${item.name}</h3>
          <p class="ci-price">Unit: $${Number(item.price).toFixed(2)}</p>
          <p class="ci-size">Size: ${item.size || '-'}</p>
        </div>
        <div class="cart-controls">
          <button class="qty-decr" data-idx="${idx}">−</button>
          <input class="qty-input" data-idx="${idx}" type="number" min="1" value="${Number(item.quantity)}">
          <button class="qty-incr" data-idx="${idx}">+</button>
          <p class="ci-subtotal">$${subtotal.toFixed(2)}</p>
          <button class="remove-btn" data-idx="${idx}">Remove</button>
        </div>
      `;
      cartItemsEl.appendChild(itemEl);
    });

    cartTotalEl.textContent = calcTotal(cart).toFixed(2);
    updateBadge();
  }

  // Delegated events
  cartItemsEl.addEventListener("click", e => {
    const idx = e.target.dataset.idx;
    if (e.target.classList.contains("remove-btn")) {
      let cart = loadCart();
      cart.splice(idx, 1);
      saveCart(cart);
      render();
    } else if (e.target.classList.contains("qty-incr")) {
      let cart = loadCart();
      cart[idx].quantity = (Number(cart[idx].quantity) || 0) + 1;
      saveCart(cart);
      render();
    } else if (e.target.classList.contains("qty-decr")) {
      let cart = loadCart();
      if (cart[idx].quantity > 1) cart[idx].quantity = Number(cart[idx].quantity) - 1;
      else cart.splice(idx, 1);
      saveCart(cart);
      render();
    }
  });

  cartItemsEl.addEventListener("change", e => {
    if (e.target.classList.contains("qty-input")) {
      const idx = e.target.dataset.idx;
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      let cart = loadCart();
      cart[idx].quantity = val;
      saveCart(cart);
      render();
    }
  });

  // Clear and checkout
  document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        render();
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        const cart = loadCart();
        if (!cart || cart.length === 0) return alert("Your cart is empty.");
        // Redirect to order.html or implement checkout
        window.location.href = "order.html";
      });
    }

    render();
  });
})();
