document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    function getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderProducts() {
        const products = getProducts();
        productList.innerHTML = '';
        if (products.length === 0) {
            productList.innerHTML = '<p style="text-align: center; color: #777;">No products available.</p>';
            return;
        }
        products.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('product-item');
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <p>Available Sizes: ${product.sizes.join(', ')}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(div);
        });
    }
    function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!query) {
    alert("Please enter a product to search!");
    return;
  }

  // Get all products from localStorage
  let allProducts = JSON.parse(localStorage.getItem("products")) || [];

  // Filter products
  let results = allProducts.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  if (results.length === 0) {
    productList.innerHTML = `<p>No products found for "${query}"</p>`;
    return;
  }

  results.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="viewProduct(${product.id})">View Details</button>
    `;
    productList.appendChild(div);
  });
}

function viewProduct(id) {
  localStorage.setItem("selectedProductId", id);
  window.location.href = "product.html";
}



    window.addToCart = function(productId) {
        let cart = getCart();
        const products = getProducts();
        const product = products.find(p => p.id === productId);
        if (!product) return;
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        saveCart(cart);
        alert(`${product.name} added to cart`);
    }

    renderProducts();
});
