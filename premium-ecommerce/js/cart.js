/* ============================================
   SHOPPING CART MANAGEMENT
   ============================================ */

class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.cartBtn = document.querySelector('.cart-btn');
        this.cartCount = document.querySelector('.cart-count');
        this.cartDrawer = document.getElementById('cartDrawer');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.cartItems = document.getElementById('cartItems');
        this.cartTotal = document.getElementById('cartTotal');
        this.closeCartBtn = document.querySelector('.close-cart');
        this.addToCartBtns = document.querySelectorAll('.product-cart-btn');
        this.wishlistBtns = document.querySelectorAll('.wishlist-btn');
        
        this.init();
    }

    init() {
        // Cart drawer events
        this.cartBtn.addEventListener('click', () => this.openCart());
        this.closeCartBtn.addEventListener('click', () => this.closeCart());
        this.cartOverlay.addEventListener('click', () => this.closeCart());

        // Add to cart buttons
        this.addToCartBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.addToCart(index);
            });
        });

        // Wishlist buttons
        this.wishlistBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleWishlist(btn);
            });
        });

        // Click anywhere on product card to go to detail page
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                // In a real app, this would navigate to product detail page
                console.log('Navigate to product', index);
            });
        });

        this.updateCartUI();
    }

    addToCart(productIndex) {
        const products = [
            { id: 1, name: 'Premium Wireless Headphones', price: 299.99, image: 'Headphones' },
            { id: 2, name: 'Luxury Leather Handbag', price: 849.99, image: 'Handbag' },
            { id: 3, name: 'Smart Watch Elite', price: 599.99, image: 'Watch' },
            { id: 4, name: 'Designer Sunglasses', price: 349.99, image: 'Sunglasses' }
        ];

        const product = products[productIndex];
        const existingItem = this.cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showAddToCartAnimation(event.target);
        
        // Show toast notification
        this.showNotification('Product added to cart!');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Product removed from cart');
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartUI();
        }
    }

    updateCartUI() {
        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            this.cartCount.classList.add('active');
        } else {
            this.cartCount.classList.remove('active');
        }

        // Render cart items
        if (this.cart.length === 0) {
            this.cartItems.innerHTML = `
                <div class="empty-cart">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            this.cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <div class="cart-item-qty">
                                <button onclick="window.cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                                <input type="number" value="${item.quantity}" min="1" onchange="window.cart.updateQuantity(${item.id}, this.value)">
                                <button onclick="window.cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            </div>
                            <button class="remove-item-btn" onclick="window.cart.removeFromCart(${item.id})">
                                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" width="16" height="16">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    toggleWishlist(btn) {
        btn.classList.toggle('active');
        
        if (btn.classList.contains('active')) {
            this.showNotification('Added to wishlist!');
        } else {
            this.showNotification('Removed from wishlist');
        }

        // Animate heart
        btn.style.animation = 'none';
        setTimeout(() => {
            btn.style.animation = '';
        }, 10);
    }

    openCart() {
        this.cartDrawer.classList.add('open');
        this.cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeCart() {
        this.cartDrawer.classList.remove('open');
        this.cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    showAddToCartAnimation(element) {
        const rect = element.getBoundingClientRect();
        const cartRect = this.cartBtn.getBoundingClientRect();

        // Create animated element
        const animElement = document.createElement('div');
        animElement.style.position = 'fixed';
        animElement.style.width = '40px';
        animElement.style.height = '40px';
        animElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        animElement.style.borderRadius = '50%';
        animElement.style.top = rect.top + 'px';
        animElement.style.left = rect.left + 'px';
        animElement.style.pointerEvents = 'none';
        animElement.style.zIndex = '2001';
        animElement.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';

        document.body.appendChild(animElement);

        // Animate to cart
        setTimeout(() => {
            animElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            animElement.style.top = cartRect.top + 'px';
            animElement.style.left = cartRect.left + 'px';
            animElement.style.width = '0px';
            animElement.style.height = '0px';
            animElement.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            animElement.remove();
        }, 600);
    }

    showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        // Create notification
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
            animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    loadCart() {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    }
}

// Add slide animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(30px);
        }
    }
`;
document.head.appendChild(style);

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});
