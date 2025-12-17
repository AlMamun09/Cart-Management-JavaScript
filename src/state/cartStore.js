export const createCartStore = () => {
  // 1. PRIVATE STATE (Closure)
  // This variable is not accessible from outside this function.
  // We use 'let' because we will re-assign it to new arrays (immutability).
  let cart = [];

  // 2. GETTER
  // We return a COPY of the cart using the spread operator [...cart].
  // If we returned 'cart' directly, outside code could mutate it using .push().
  // That would violate our rules.
  const getCart = () => [...cart];

  // 3. ACTIONS (Mutators)

  // Add item logic
 const addItem = (product) => {
    // 1. Check if item already exists in the cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // VALIDATION: Check against stock
      // We look at the 'stock' property we saved on the item
      if (existingItem.quantity >= existingItem.stock) {
        console.warn(`Cannot add more "${product.name}". Max stock reached.`);
        return; // STOP execution here. Do not update state.
      }

      // IMMUTABLE UPDATE
      cart = cart.map((item) => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      // VALIDATION: Check if product has any stock at all
      if (product.stock === 0) {
        console.warn(`"${product.name}" is out of stock.`);
        return;
      }

      // IMMUTABLE ADD
      // Note: We deliberately include 'stock' in the stored object 
      // so we can check it later (as we did above).
      cart = [...cart, { ...product, quantity: 1 }];
    }
    
    console.log("Cart updated:", cart);
  };

  // Remove item logic
  const removeItem = (productId) => {
    // IMMUTABLE DELETE:
    // Keep only items whose ID does NOT match the passed productId.
    cart = cart.filter((item) => item.id !== productId);

    console.log("Cart item removed:", cart);
  };

  // 4. EXPOSE PUBLIC INTERFACE
  // We only return the functions we want the rest of the app to use.
  return {
    getCart,
    addItem,
    removeItem,
  };
};

// Initialize a singleton instance (optional pattern, but good for this simple app)
export const cartStore = createCartStore();
