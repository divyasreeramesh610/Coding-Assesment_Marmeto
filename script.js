function showProducts(category) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear previous products

    // Remove 'active' class from all tab buttons
    var tabButtons = document.querySelectorAll('.tabs button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Add 'active' class to the clicked tab button
    var activeTab = document.querySelector(`button[data-category="${category}"]`);
    activeTab.classList.add('active');

    // Fetch data from the API
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const products = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase()).category_products;

            if (products) {
                products.forEach(product => {
                    // Create product card
                    const card = document.createElement('div');
                    card.classList.add('product-card');

                    // Product image container
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');

                    // Main product image
                    const mainImage = document.createElement('img');
                    mainImage.src = product.image;
                    mainImage.alt = product.title;
                    mainImage.classList.add('main-image');

                    // Second product image
                    const secondImage = document.createElement('img');
                    secondImage.src = product.second_image;
                    secondImage.alt = product.title;
                    secondImage.classList.add('second-image');

                    // Product badge
                    const badge = document.createElement('p');
                    badge.classList.add('badge');
                    badge.textContent = product.badge_text || '';

                    // Set badge background to white
                    badge.style.backgroundColor = 'white';

                    // Positioning badge on top left
                    if (product.badge_text) {
                        badge.style.position = 'absolute';
                        badge.style.top = '5px';
                        badge.style.left = '5px';
                        // Set text color of badge to black
                        badge.style.color = 'black';
                    }

                    // Append main image, second image, and badge to image container
                    imageContainer.appendChild(mainImage);
                    imageContainer.appendChild(secondImage);
                    if (product.badge_text) {
                        imageContainer.appendChild(badge);
                    }

                    // Product name and brand
                    const titleBrand = document.createElement('p');
                    titleBrand.classList.add('title-brand');
                    titleBrand.textContent = `${truncateTitle(product.title)} • ${product.vendor}`;
                    titleBrand.classList.add('titlebrand');

                    // Price info (sale price and original price with strikethrough)
                    const priceInfo = document.createElement('p');
                    priceInfo.classList.add('price-info');
                    // Calculate the discount percentage
                    const discountPercentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
                    priceInfo.innerHTML = `<span class="discount-price">Rs.${product.price}</span> <span class="original-price">Rs.${product.compare_at_price}</span> <span class="discount-percentage" style="color: red;">  ${discountPercentage}% off</span>`;

                    // Add to cart button (dummy button)
                    const addToCartButton = document.createElement('button');
                    addToCartButton.textContent = 'Add to Cart';
                    addToCartButton.classList.add('addToCartButton');

                    // Append elements to the card
                    card.appendChild(imageContainer);
                    card.appendChild(titleBrand);
                    card.appendChild(priceInfo);
                    card.appendChild(addToCartButton);

                    // Append card to the product container
                    productContainer.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to truncate title after three words if too long
function truncateTitle(title) {
    const words = title.split(' ');
    if (words.length > 3) {
        return words.slice(0, 3).join(' ') + '...';
    }
    return title;
}
