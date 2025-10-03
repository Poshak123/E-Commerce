// scripts/product.js
(function () {
  // Helpers
  const $ = id => document.getElementById(id);

  function formatPrice(v) {
    return "$" + Number(v || 0).toFixed(2);
  }

  function showToast(msg, isError = false) {
    const toast = $("toast");
    toast.textContent = msg;
    toast.className = isError ? "toast show error" : "toast show";
    setTimeout(() => (toast.className = toast.className.replace("show", "")), 2200);
  }

  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((s, it) => s + (parseInt(it.quantity, 10) || 0), 0);
    const el = $("cart-count");
    if (el) el.textContent = count;
  }

  // Get product id: prefer URL param ?id=, else fallback to localStorage.selectedProductId
  const urlParams = new URLSearchParams(window.location.search);
  const idFromUrl = urlParams.get("id");
  const storedSelected = localStorage.getItem("selectedProductId");
  const productId = idFromUrl || storedSelected;

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  const product = allProducts.find(p => String(p.id) === String(productId));

  // Render
  if (!product) {
    $("product-name").textContent = "Product not found";
    $("product-description").textContent = "";
    $("product-price").textContent = "";
    $("add-to-cart-btn").disabled = true;
  } else {
    $("product-name").textContent = product.name || "Unnamed product";
    $("product-description").textContent = product.description || "";
    $("product-price").textContent = formatPrice(product.price);
    $("product-image").src = product.image || "images/placeholder.png";
    // optional: pre-select first size if product has sizes (we store sizes in product.sizes array)
    if (product.sizes && product.sizes.length > 0) {
      const sizeSelect = $("size");
      sizeSelect.innerHTML = `<option value="">Select Size</option>`;
      product.sizes.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        sizeSelect.appendChild(opt);
      });
    }
  }

  // Add to cart logic
  function addToCart() {
    if (!product) return showToast("Product not found", true);

    const selectedSize = $("size") ? $("size").value : "";
    if (($("size") && !selectedSize)) {
      // require size if select exists
      showToast("Please select a size", true);
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // find same product+size
    const idx = cart.findIndex(it => String(it.id) === String(product.id) && String(it.size || "") === String(selectedSize));
    if (idx > -1) {
      cart[idx].quantity = (parseInt(cart[idx].quantity, 10) || 0) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: product.image || "images/placeholder.png",
        size: selectedSize,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    showToast(`${product.name} added to cart`);
  }

  // Buy now (add then go to cart/checkout)
  function buyNow() {
    addToCart();
    // redirect to cart page
    window.location.href = "cart.html";
  }

  // Wire events
  document.addEventListener("DOMContentLoaded", () => {
    const addBtn = $("add-to-cart-btn");
    const buyBtn = $("buy-now-btn");
    if (addBtn) addBtn.addEventListener("click", addToCart);
    if (buyBtn) buyBtn.addEventListener("click", buyNow);
    updateCartBadge();
  });

})();
