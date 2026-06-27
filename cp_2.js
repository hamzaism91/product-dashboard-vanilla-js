const API_URL = 'https://www.course-api.com/javascript-store-products';

function fetchProductsThen() {
  fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); 
  })
  .then(products => {
    console.log("--- Products logged via fetchProductsThen() ---");
            products.forEach(product => {
                // Accessing name nested inside fields object based on API structure
                console.log(product.fields.name);
            });
        })
        .catch(error => {
            console.error("fetchProductsThen failed:", error);
        });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

function displayProducts(products) {
  const container = document.getElementById('product-container');

  container.innerHTML = '';
  const limitedProducts = products.slice(0,5);

  limitedProducts.forEach(product => {
    const name = product.fields.name;
    const imageUrl = product.fields.image[0].url;
    const price = (product.fields.price / 100).toFixed(2);
    const card = document.createElement('div');

    card.innerHTML = `
      <img src="${imageUrl}" alt="${name}" class="product-image">
      <h3 class="product-name">${name}</h3>
      <p class="product-price">$${price}</p>
    `;

    container.appendChild(card);
  });
}

function handleError(error) {
  console.error(`An error occurred: ${error.message}`);
  const container = document.getElementById('product-container');
  container.innerHTML = `<p style="color: red; grid-column: 1/-1; text-align: center;">Failed to load products. Please try again later.</p>`;
}

fetchProductsThen();
fetchProductsAsync(); 
    
