export const renderCart = (container, totalContainer, cart) => {
  // 1. Handle Empty State
  if (cart.length === 0) {
    container.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
    totalContainer.innerText = '$0.00';
    return;
  }

  // 2. Render Items
  container.innerHTML = cart.map(item => `
    <div class="flex justify-between items-center border-b pb-2">
      <div>
        <h4 class="font-bold">${item.name}</h4>
        <p class="text-sm text-gray-600">
          $${item.price} x ${item.quantity}
        </p>
      </div>
      <button 
        class="remove-btn text-red-500 hover:text-red-700 text-sm"
        data-id="${item.id}"
      >
        Remove
      </button>
    </div>
  `).join('');

  // 3. Calculate Total using reduce()
  // logic: sum + (price * quantity)
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // 4. Update Total UI
  totalContainer.innerText = `$${total.toFixed(2)}`;
};