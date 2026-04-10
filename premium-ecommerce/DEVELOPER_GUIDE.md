<!-- ============================================
   DEVELOPMENT GUIDE & CODE SNIPPETS
   ============================================ -->

# Premium E-commerce: Developer's Guide

## Adding New Features

### 1. Adding a New Product

**Edit**: `js/cart.js` in the `addToCart()` method

```javascript
const products = [
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, image: 'Headphones' },
    { id: 2, name: 'Luxury Leather Handbag', price: 849.99, image: 'Handbag' },
    // Add your new product here:
    { id: 5, name: 'Luxury Watch Elite', price: 1299.99, image: 'Watch' },
];
```

**Update**: Product cards in `index.html`

```html
<div class="product-card">
    <div class="product-image-wrapper">
        <div class="product-image skeleton-loader" 
             style="background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%); 
                     min-height: 300px;"></div>
        <div class="product-badge">New</div>
        <button class="wishlist-btn"><!-- Icon --></button>
    </div>
    <div class="product-info">
        <h3 class="product-name">Your Product Name</h3>
        <p class="product-category">Category</p>
        <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-count">(248)</span>
        </div>
        <div class="product-price-section">
            <span class="product-price">$299.99</span>
            <span class="product-original-price">$399.99</span>
        </div>
        <button class="btn btn-secondary product-cart-btn">Add to Cart</button>
    </div>
</div>
```

---

### 2. Adding a New Color Theme

**File**: `css/style.css`

```css
/* Light Mode Color Scheme */
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #d4af37;
    --text-color: #1a1a1a;
    --text-light: #666666;
    --bg-color: #ffffff;
    --bg-secondary: #f8f8f8;
    --bg-tertiary: #efefef;
    --border-color: #e0e0e0;
}

/* To create a new theme, create a new CSS class */
.theme-purple {
    --primary-color: #6900d4;
    --accent-color: #b000ff;
    --text-color: #2d1b4e;
}

.theme-emerald {
    --primary-color: #00a86b;
    --accent-color: #00d084;
    --text-color: #0d3d2c;
}
```

**Usage**: Add to `<body>` tag

```html
<body class="theme-purple">
    <!-- Content applies purple theme -->
</body>
```

---

### 3. Adding a New Animation

**File**: `js/animations.js`

```javascript
// Add a new animation class
class CustomAnimation {
    constructor(element) {
        this.element = element;
        this.setupAnimation();
    }

    setupAnimation() {
        // Intersection Observer for triggering animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.element.style.animation = 'customFadeIn 0.8s ease forwards';
                }
            });
        });

        observer.observe(this.element);
    }
}

// Add CSS animation
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes customFadeIn {
        from {
            opacity: 0;
            transform: translateY(20px) rotateX(-10deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }
    }
`;
document.head.appendChild(animationStyles);

// Use it
document.querySelectorAll('.my-element').forEach(el => {
    new CustomAnimation(el);
});
```

---

### 4. Adding a New Modal/Dialog

**File**: `js/main.js`

```javascript
class CustomModal {
    constructor(title, content) {
        this.title = title;
        this.content = content;
        this.createModal();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${this.title}</h2>
                        <button class="modal-close">✕</button>
                    </div>
                    <div class="modal-body">
                        ${this.content}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle close
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                modal.remove();
            }
        });

        // Add styles
        this.addModalStyles();
    }

    addModalStyles() {
        if (document.querySelector('#custom-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'custom-modal-styles';
        style.textContent = `
            .custom-modal {
                position: fixed;
                inset: 0;
                z-index: 2000;
            }

            .modal-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal-content {
                background: var(--bg-color);
                border-radius: var(--radius);
                box-shadow: var(--shadow-lg);
                width: 90%;
                max-width: 500px;
                animation: slideUp 0.4s ease;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem;
                border-bottom: 1px solid var(--border-color);
            }

            .modal-body {
                padding: 2rem;
            }

            .modal-close {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 24px;
                color: var(--text-light);
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Usage:
// new CustomModal('Title', '<p>Content here</p>');
```

---

### 5. Adding a Form with Validation

**HTML**:

```html
<form class="contact-form" id="contactForm">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
        <span class="error-message"></span>
    </div>

    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        <span class="error-message"></span>
    </div>

    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        <span class="error-message"></span>
    </div>

    <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

**JavaScript**:

```javascript
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.setupValidation();
    }

    setupValidation() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            this.submitForm();
        }
    }

    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const errorMessage = field.parentElement.querySelector('.error-message');
        let error = '';

        if (!field.value.trim()) {
            error = 'This field is required';
        } else if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                error = 'Please enter a valid email';
            }
        }

        if (error) {
            field.classList.add('error');
            errorMessage.textContent = error;
            return false;
        } else {
            field.classList.remove('error');
            errorMessage.textContent = '';
            return true;
        }
    }

    submitForm() {
        // Handle form submission
        console.log('Form submitted!');
        this.form.reset();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('contactForm');
});
```

**CSS**:

```css
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-color);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-color);
    color: var(--text-color);
    font-family: 'Poppins', sans-serif;
    transition: var(--transition);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error,
.form-group textarea.error {
    border-color: #f5576c;
}

.error-message {
    display: block;
    color: #f5576c;
    font-size: 12px;
    margin-top: 0.5rem;
    height: 20px;
}
```

---

### 6. Adding Analytics Tracking

**File**: `js/main.js`

```javascript
class Analytics {
    static trackEvent(eventName, eventData = {}) {
        console.log(`📊 Event: ${eventName}`, eventData);
        
        // Send to analytics service (Google Analytics, Mixpanel, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }

    static trackPageView(pageName) {
        console.log(`📄 Page View: ${pageName}`);
        this.trackEvent('page_view', { page_name: pageName });
    }

    static trackProductView(productId, productName) {
        this.trackEvent('view_item', {
            item_id: productId,
            item_name: productName
        });
    }

    static trackAddToCart(productId, quantity) {
        this.trackEvent('add_to_cart', {
            item_id: productId,
            quantity: quantity
        });
    }

    static trackCheckout() {
        this.trackEvent('begin_checkout', {
            timestamp: new Date().toISOString()
        });
    }

    static trackPurchase(orderId, total) {
        this.trackEvent('purchase', {
            transaction_id: orderId,
            value: total
        });
    }
}

// Usage in Cart
window.cart.addToCart = function(productIndex) {
    // ... existing code ...
    Analytics.trackAddToCart(productIndex, 1);
};
```

---

### 7. Adding a Notification System

```javascript
class Notification {
    static show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 3000;
            animation: slideInRight 0.4s ease;
        `;

        // Type-specific colors
        const colors = {
            success: { bg: '#34a853', text: 'white' },
            error: { bg: '#f5576c', text: 'white' },
            warning: { bg: '#ffb300', text: 'white' },
            info: { bg: '#4a90e2', text: 'white' }
        };

        const color = colors[type] || colors.info;
        notification.style.background = color.bg;
        notification.style.color = color.text;

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }, duration);
    }

    static success(message) { this.show(message, 'success'); }
    static error(message) { this.show(message, 'error'); }
    static warning(message) { this.show(message, 'warning'); }
    static info(message) { this.show(message, 'info'); }
}

// Add animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
document.head.appendChild(notificationStyles);

// Usage:
// Notification.success('Item added to cart!');
// Notification.error('Something went wrong');
```

---

## Best Practices

### ✅ Code Organization
- Keep JavaScript modular with separate classes
- One class per concern
- Use meaningful variable names
- Add comments for complex logic

### ✅ Performance
- Minimize DOM manipulations
- Use event delegation
- Debounce/throttle scroll events
- Lazy load images
- Remove unused CSS

### ✅ Accessibility
- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast

### ✅ Browser Compatibility
- Test on multiple browsers
- Use vendor prefixes for CSS
- Provide fallbacks for CSS features
- Test on different devices

### ✅ Code Quality
- Use consistent formatting
- Follow naming conventions
- Document complex functions
- Use linters (ESLint, Stylelint)
- Write small, focused functions

---

## Common Issues & Solutions

### Issue: Dark mode not applying
**Solution**: Check that `body.dark-mode` class is being added
```javascript
console.log(document.body.classList); // Should show 'dark-mode' when enabled
```

### Issue: Animations stutter/lag
**Solution**: Use GPU-accelerated properties
```css
/* Good */
transform: translateY(10px);
opacity: 0.5;

/* Avoid */
top: 10px;
display: none;
```

### Issue: Cart items not persisting
**Solution**: Check browser localStorage is enabled and not full
```javascript
try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
} catch(e) {
    console.error('localStorage not available');
}
```

### Issue: Search not finding products
**Solution**: Check product names are case-insensitive
```javascript
.toLowerCase().includes(query.toLowerCase())
```

---

## Testing Checklist

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test dark mode functionality
- [ ] Test all hover effects
- [ ] Test cart add/remove/update
- [ ] Test search functionality
- [ ] Test form validation
- [ ] Test responsive breakpoints
- [ ] Test keyboard navigation
- [ ] Test with accessibility tools

---

## Deployment Checklist

- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Remove console.log() statements
- [ ] Test on production domain
- [ ] Set up proper error tracking
- [ ] Configure caching headers
- [ ] Enable GZIP compression
- [ ] Test all forms work correctly
- [ ] Verify analytics are recording
- [ ] Test payment flow (if applicable)

---

## Additional Resources

- MDN Web Docs: https://developer.mozilla.org
- CSS Tricks: https://css-tricks.com
- JavaScript.info: https://javascript.info
- Web.dev: https://web.dev
- Accessibility Guidelines: https://www.w3.org/WAI/

---

Happy coding! 🚀
