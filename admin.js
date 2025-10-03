// Load existing products
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = "<p>No products added yet.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <p>${product.category}</p>
      <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
    `;

    list.appendChild(card);
  });
}

// Add product
document.getElementById("addProductForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let products = JSON.parse(localStorage.getItem("products")) || [];

  const product = {
    id: Date.now(),
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value
  };

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert("✅ Product Added!");
  this.reset();
  loadProducts();
});

// Delete product
function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

window.onload = loadProducts;
