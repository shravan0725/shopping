/* ============================================
   PRODUCT DETAIL PAGE FUNCTIONALITY
   ============================================ */

class ProductDetailPage {
    constructor() {
        this.currentColor = 'Black';
        this.currentQuantity = 1;
        this.productId = 1;
        this.productPrice = 299.99;
        
        this.init();
    }

    init() {
        this.setupThumbnails();
        this.setupColorSelector();
        this.setupQuantitySelector();
        this.setupTabsNavigation();
        this.setupWishlistButton();
        this.setupAddToCart();
        this.setupImageZoom();
    }

    // Image gallery with thumbnails
    setupThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.querySelector('.image-container');

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked
                thumbnail.classList.add('active');

                // Update main image (in real app, would change actual image)
                const gradient = window.getComputedStyle(thumbnail).backgroundColor;
                mainImage.style.background = gradient;

                // Add animation
                mainImage.style.animation = 'fadeInScale 0.4s ease';
                setTimeout(() => {
                    mainImage.style.animation = '';
                }, 400);
            });
        });
    }

    // Color selector
    setupColorSelector() {
        const colorOptions = document.querySelectorAll('.color-option');

        colorOptions.forEach((option, index) => {
            option.addEventListener('click', () => {
                colorOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');

                const colors = ['Black', 'Silver', 'Blue', 'Red'];
                this.currentColor = colors[index];

                // Visual feedback
                option.style.animation = 'pulse 0.6s ease';
                setTimeout(() => {
                    option.style.animation = '';
                }, 600);
            });
        });
    }

    // Quantity selector
    setupQuantitySelector() {
        const input = document.getElementById('quantity');
        const decrBtn = document.getElementById('decr');
        const incrBtn = document.getElementById('incr');

        decrBtn.addEventListener('click', () => {
            if (this.currentQuantity > 1) {
                this.currentQuantity--;
                input.value = this.currentQuantity;
            }
        });

        incrBtn.addEventListener('click', () => {
            if (this.currentQuantity < 10) {
                this.currentQuantity++;
                input.value = this.currentQuantity;
            }
        });

        input.addEventListener('change', (e) => {
            let value = parseInt(e.target.value) || 1;
            value = Math.max(1, Math.min(10, value));
            this.currentQuantity = value;
            input.value = value;
        });
    }

    // Tab navigation
    setupTabsNavigation() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });

        // Set first tab as active by default
        if (tabBtns.length > 0) {
            tabBtns[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    }

    // Wishlist button
    setupWishlistButton() {
        const wishlistBtn = document.getElementById('wishlistBtn');

        wishlistBtn.addEventListener('click', () => {
            wishlistBtn.classList.toggle('active');

            if (wishlistBtn.classList.contains('active')) {
                this.showNotification('Added to wishlist!');
                // Animate heart
                wishlistBtn.style.animation = 'heartBeat 0.6s ease';
                setTimeout(() => {
                    wishlistBtn.style.animation = '';
                }, 600);
            } else {
                this.showNotification('Removed from wishlist');
            }
        });
    }

    // Add to cart functionality
    setupAddToCart() {
        const addBtn = document.getElementById('addToCart');

        addBtn.addEventListener('click', () => {
            if (window.cart) {
                // Add current product to cart
                const product = {
                    id: this.productId,
                    name: `Premium Wireless Headphones (${this.currentColor})`,
                    price: this.productPrice,
                    quantity: this.currentQuantity,
                    image: 'Headphones'
                };

                // Add to cart multiple times based on quantity
                for (let i = 0; i < this.currentQuantity; i++) {
                    window.cart.addToCart(0);
                }

                // Animate button
                const originalText = addBtn.textContent;
                addBtn.textContent = '✓ Added to Cart!';
                addBtn.style.background = 'linear-gradient(135deg, #34a853 0%, #2d7d4a 100%)';

                setTimeout(() => {
                    addBtn.textContent = originalText;
                    addBtn.style.background = '';
                }, 2000);
            }
        });
    }

    // Image zoom functionality
    setupImageZoom() {
        const mainImage = document.querySelector('.main-image');
        const imageContainer = document.querySelector('.image-container');

        if (!mainImage || !imageContainer) return;

        mainImage.addEventListener('click', () => {
            this.createImageZoomModal();
        });
    }

    createImageZoomModal() {
        const existing = document.querySelector('.zoom-modal');
        if (existing) return;

        const modal = document.createElement('div');
        modal.className = 'zoom-modal';
        modal.innerHTML = `
            <button class="zoom-close" aria-label="Close zoom">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="zoom-content">
                <div class="zoom-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                <div class="zoom-controls">
                    <button class="zoom-in-btn">+</button>
                    <button class="zoom-out-btn">−</button>
                    <button class="zoom-reset-btn">Reset</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        let zoomLevel = 1;
        const zoomImage = modal.querySelector('.zoom-image');
        const closeBtn = modal.querySelector('.zoom-close');
        const zoomInBtn = modal.querySelector('.zoom-in-btn');
        const zoomOutBtn = modal.querySelector('.zoom-out-btn');
        const resetBtn = modal.querySelector('.zoom-reset-btn');

        const updateZoom = () => {
            zoomImage.style.transform = `scale(${zoomLevel})`;
        };

        zoomInBtn.addEventListener('click', () => {
            zoomLevel = Math.min(3, zoomLevel + 0.2);
            updateZoom();
        });

        zoomOutBtn.addEventListener('click', () => {
            zoomLevel = Math.max(1, zoomLevel - 0.2);
            updateZoom();
        });

        resetBtn.addEventListener('click', () => {
            zoomLevel = 1;
            updateZoom();
        });

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Keyboard controls
        const handleKeyboard = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', handleKeyboard);
            } else if (e.key === '+' || e.key === '=') {
                zoomInBtn.click();
            } else if (e.key === '-') {
                zoomOutBtn.click();
            }
        };

        document.addEventListener('keydown', handleKeyboard);

        this.addZoomModalStyles();
    }

    addZoomModalStyles() {
        if (document.querySelector('#zoom-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'zoom-modal-styles';
        style.textContent = `
            .zoom-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                z-index: 3001;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }

            .zoom-content {
                position: relative;
                width: 90%;
                height: 90%;
                max-width: 800px;
                max-height: 600px;
                display: flex;
                flex-direction: column;
            }

            .zoom-image {
                flex: 1;
                background-size: cover;
                background-position: center;
                border-radius: 8px;
                transition: transform 0.3s ease;
                overflow: hidden;
            }

            .zoom-controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 1.5rem;
            }

            .zoom-controls button {
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .zoom-controls button:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }

            .zoom-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                width: 44px;
                height: 44px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                z-index: 3002;
                transition: all 0.3s ease;
            }

            .zoom-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }

            .zoom-close svg {
                width: 24px;
                height: 24px;
            }

            @media (max-width: 768px) {
                .zoom-content {
                    width: 95%;
                    height: 95%;
                }

                .zoom-controls {
                    gap: 0.75rem;
                }

                .zoom-controls button,
                .zoom-close {
                    width: 40px;
                    height: 40px;
                    font-size: 16px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // Notification helper
    showNotification(message) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
            z-index: 2002;
            animation: slideInUp 0.4s ease;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
}

// Animation styles
const productDetailStyles = document.createElement('style');
productDetailStyles.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.15);
        }
    }

    @keyframes heartBeat {
        0% {
            transform: scale(1);
        }
        14% {
            transform: scale(1.3);
        }
        28% {
            transform: scale(1);
        }
        42% {
            transform: scale(1.3);
        }
        70% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(productDetailStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProductDetailPage();
});
