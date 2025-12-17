export const renderProducts = (container, products) => {
  // 1. Clear current content (simple re-render strategy)
  container.innerHTML = '';

  // 2. Generate HTML string using map()
  // Note: We add a 'data-id' attribute to the button. 
  // This is crucial for knowing WHICH product was clicked later.
  const html = products.map(product => {
    const outOfStock = product.stock === 0;
    const stockBadgeClass = outOfStock
      ? 'bg-rose-100 text-rose-700'
      : 'bg-emerald-100 text-emerald-700';
    const buttonStateClass = outOfStock
      ? 'opacity-50 cursor-not-allowed'
      : 'hover:bg-blue-600';

    return `
    <div class="group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      <div class="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <h3 class="font-semibold text-slate-900 text-lg leading-tight">${product.name}</h3>
            <span class="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium text-center ${stockBadgeClass}">
              ${outOfStock ? 'Out of stock' : `${product.stock} in stock`}
            </span>
          </div>
          <p class="text-slate-700 text-xl font-semibold mb-4">$${product.price}</p>
        </div>
        <button 
          class="add-to-cart-btn w-full inline-flex items-center justify-center rounded-lg bg-blue-500 text-white px-4 py-2.5 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${buttonStateClass}"
          data-id="${product.id}"
          ${outOfStock ? 'disabled' : ''}
          aria-disabled="${outOfStock}"
        >
          Add to Cart
        </button>
      </div>
    </div>`;
  }).join(''); // Join the array of strings into one string

  // 3. Inject into DOM
  container.innerHTML = html;
};