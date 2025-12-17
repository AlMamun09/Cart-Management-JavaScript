import { fetchProducts } from './services/productService.js';
import { cartStore } from './state/cartStore.js';
import { renderProducts } from './ui/renderProducts.js';
import { renderCart } from './ui/renderCart.js';

// Select DOM Elements
const productListEl = document.getElementById('product-list');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const toastEl = document.getElementById('toast');

let toastTimer;
const showToast = (message, variant = 'info') => {
  if (!toastEl) return alert(message); // Fallback if toast container is missing

  clearTimeout(toastTimer);

  const variants = {
    error: {
      wrapper: 'bg-rose-50 border border-rose-200 text-rose-800',
      dot: 'bg-rose-500'
    },
    info: {
      wrapper: 'bg-blue-50 border border-blue-200 text-blue-800',
      dot: 'bg-blue-500'
    }
  };

  const { wrapper, dot } = variants[variant] || variants.info;

  toastEl.innerHTML = `
    <div role="alert" class="flex items-start gap-3 rounded-xl p-4 shadow-lg ${wrapper}">
      <span class="mt-1 inline-block h-2.5 w-2.5 rounded-full ${dot}"></span>
      <p class="text-sm font-medium leading-snug">${message}</p>
    </div>
  `;

  toastEl.classList.remove('hidden');

  toastTimer = setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 2800);
};

// State for Products (we keep this local to main)
let products = [];

// Helper to refresh the Cart UI
const updateCartUI = () => {
  const currentCart = cartStore.getCart();
  renderCart(cartItemsEl, cartTotalEl, currentCart);
};

// INITIALIZATION
(async () => {
  // 1. Fetch Data
  products = await fetchProducts();
  
  // 2. Render Products
  renderProducts(productListEl, products);
  
  console.log("App loaded.");
})();

// EVENT LISTENER: ADD TO CART
productListEl.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const id = Number(event.target.dataset.id);
    const product = products.find(p => p.id === id);
    
    if (product) {
      // 1. Get current state to check limits before asking to add (UI Logic)
      // This is a "User Experience" enhancement.
      const currentCart = cartStore.getCart();
      const existingItem = currentCart.find(item => item.id === id);
      
      if (existingItem && existingItem.quantity >= product.stock) {
        showToast("Sorry, we don't have enough stock!", 'error');
        return;
      }

      // 2. Perform Action
      cartStore.addItem(product);
      updateCartUI();
    }
  }
});

// EVENT LISTENER: REMOVE FROM CART
cartItemsEl.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const id = Number(event.target.dataset.id);
    
    cartStore.removeItem(id); // Update State
    updateCartUI();           // Update UI
  }
});