import { fetchProducts } from './services/productService.js';
import { cartStore } from './state/cartStore.js';
import { renderProducts } from './ui/renderProducts.js';
import { renderCart } from './ui/renderCart.js';

// Select DOM Elements
const productListEl = document.getElementById('product-list');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

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
        alert("Sorry, we don't have enough stock!");
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