const container = document.getElementById("men-products");

// Get products from localStorage
let allProducts = JSON.parse(localStorage.getItem("products")) || [];

// Filter only Men's products
let mensProducts = allProducts.filter(p => p.category.toLowerCase() === "men");

if (mensProducts.length === 0) {
  container.innerHTML = "<p>No products available in Men's section.</p>";
}

mensProducts.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">$${product.price}</p>
    <button onclick="viewProduct(${product.id})">View Details</button>
  `;
  container.appendChild(card);
});

function viewProduct(id) {
  localStorage.setItem("selectedProductId", id);
  window.location.href = "product.html"; // go to single product page
}
