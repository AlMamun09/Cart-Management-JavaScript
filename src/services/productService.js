/**
 * Fetches product data from the local JSON file.
 * * CONCEPT: Async/Await & Try/Catch
 * We use 'async' to tell JS this function handles asynchronous operations.
 * We use 'await' to pause execution until the Promise resolves.
 * We use 'try/catch' to gracefully handle errors (network failure, 404s),
 * preventing the app from crashing.
 */
export const fetchProducts = async () => {
  try {
    // 1. Initiate the request
    const response = await fetch('./src/data/products.json');

    // 2. Check if the network request was successful (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 3. Parse the JSON body. This is also async!
    const data = await response.json();
    
    return data;
    
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // In a real app, we might return an empty array or re-throw the error
    // to be handled by the UI.
    return []; 
  }
};