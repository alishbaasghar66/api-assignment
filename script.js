let allProducts = [];

async function fetchProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    allProducts = data;
    displayProducts(allProducts);
    setCategories(data);
  } catch (error) {
    document.getElementById('products').innerHTML = "<h2>Failed to load products 😢</h2>";
    console.error(error);
  }
}

function displayProducts(products) {
  const container = document.getElementById('products');
  container.innerHTML = "";
  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.category}</p>
        <div class="price">$${p.price}</div>
      </div>
    `;
  });
}

function setCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];
  const nav = document.getElementById('categories');
  categories.forEach(cat => {
    const link = document.createElement('a');
    link.textContent = cat;
    link.dataset.category = cat;
    link.onclick = () => filterByCategory(cat);
    nav.appendChild(link);
  });
}

function filterByCategory(category) {
  if (category === "all") {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    displayProducts(filtered);
  }
}

document.getElementById('search').addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p => 
    p.title.toLowerCase().includes(value) || 
    p.category.toLowerCase().includes(value)
  );
  displayProducts(filtered);
});

fetchProducts();
