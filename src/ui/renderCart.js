export const renderCart = (container, totalContainer, cart) => {
  // 1. Handle Empty State
  if (cart.length === 0) {
    container.innerHTML = '<p class="text-slate-500">Your cart is empty.</p>';
    totalContainer.innerText = '$0.00';
    return;
  }

  // 2. Render Items
  container.innerHTML = cart.map(item => `
    <div class="flex justify-between items-start gap-4 border-b border-slate-200 pb-3">
      <div class="min-w-0">
        <h4 class="font-medium text-slate-900 truncate">${item.name}</h4>
        <p class="text-sm text-slate-600">$${item.price} × ${item.quantity}</p>
      </div>
      <button 
        class="remove-btn inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 rounded"
        data-id="${item.id}"
        aria-label="Remove ${item.name}"
      >
        Remove
      </button>
    </div>
  `).join('');

  // 3. Calculate Total using reduce()
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // 4. Update Total UI
  totalContainer.innerText = `$${total.toFixed(2)}`;
};