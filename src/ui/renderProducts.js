export const renderProducts = (container, products) => {
  // 1. Clear current content (simple re-render strategy)
  container.innerHTML = '';

  // 2. Generate HTML string using map()
  // Note: We add a 'data-id' attribute to the button. 
  // This is crucial for knowing WHICH product was clicked later.
  const html = products.map(product => `
    <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h3 class="font-bold text-lg">${product.name}</h3>
      <p class="text-gray-600">$${product.price}</p>
      <p class="text-sm text-gray-400 mb-4">${product.stock} in stock</p>
      <button 
        class="add-to-cart-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        data-id="${product.id}"
      >
        Add to Cart
      </button>
    </div>
  `).join(''); // Join the array of strings into one string

  // 3. Inject into DOM
  container.innerHTML = html;
};