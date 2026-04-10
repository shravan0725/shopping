/* ============================================
   MAIN JAVASCRIPT - CORE FUNCTIONALITY
   ============================================ */

class LuxeShop {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navItems = document.querySelectorAll('.nav-item');
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSearchModal();
        this.setupProfileModal();
        this.setupHeroInteractions();
        this.setupCategoryInteractions();
    }

    // Mobile hamburger menu
    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar-container')) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }

    // Search modal
    setupSearchModal() {
        const searchBtn = document.querySelector('.search-btn');
        
        searchBtn.addEventListener('click', () => {
            this.createSearchModal();
        });
    }

    createSearchModal() {
        // Remove existing modal
        const existing = document.querySelector('.search-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <input type="text" placeholder="Search products..." class="search-input" autofocus>
                    <button class="search-close" aria-label="Close search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="search-results">
                    <p class="search-placeholder">Start typing to search...</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.search-close');
        const input = modal.querySelector('.search-input');
        const resultsContainer = modal.querySelector('.search-results');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Handle search
        input.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const products = [
                'Premium Wireless Headphones',
                'Luxury Leather Handbag',
                'Smart Watch Elite',
                'Designer Sunglasses',
                'Premium Sneakers',
                'Luxury Perfume',
                'Tech Gadget',
                'Designer Belt',
                'Silk Scarf'
            ];

            if (query.length === 0) {
                resultsContainer.innerHTML = '<p class="search-placeholder">Start typing to search...</p>';
                return;
            }

            const results = products.filter(p => p.toLowerCase().includes(query));

            if (results.length === 0) {
                resultsContainer.innerHTML = '<p class="search-placeholder">No products found</p>';
            } else {
                resultsContainer.innerHTML = results.map(product => `
                    <a href="#" class="search-result-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        ${product}
                    </a>
                `).join('');
            }
        });

        // Add search modal styles
        this.addSearchModalStyles();
    }

    addSearchModalStyles() {
        if (document.querySelector('#search-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'search-modal-styles';
        style.textContent = `
            .search-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                z-index: 3000;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding: 2rem;
                animation: fadeIn 0.3s ease;
            }

            .search-modal-content {
                background: var(--bg-color);
                border-radius: 12px;
                width: 100%;
                max-width: 600px;
                max-height: 600px;
                display: flex;
                flex-direction: column;
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--border-color);
                margin-top: 4rem;
                animation: slideDown 0.4s ease;
            }

            .search-modal-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
            }

            .search-input {
                flex: 1;
                background: none;
                border: none;
                font-size: 16px;
                color: var(--text-color);
                font-family: 'Poppins', sans-serif;
                outline: none;
            }

            .search-close {
                background: none;
                border: none;
                cursor: pointer;
                width: 28px;
                height: 28px;
                color: var(--text-color);
                transition: all 0.3s ease;
            }

            .search-close:hover {
                color: #667eea;
                transform: rotate(90deg);
            }

            .search-close svg {
                width: 100%;
                height: 100%;
            }

            .search-results {
                flex: 1;
                overflow-y: auto;
                padding: 1rem 0;
            }

            .search-placeholder {
                text-align: center;
                color: var(--text-light);
                padding: 2rem;
                font-size: 14px;
            }

            .search-result-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 1.5rem;
                color: var(--text-color);
                text-decoration: none;
                transition: background 0.2s ease;
                border-bottom: 1px solid var(--border-color);
            }

            .search-result-item:hover {
                background: var(--bg-secondary);
            }

            .search-result-item svg {
                width: 20px;
                height: 20px;
                color: var(--text-light);
                flex-shrink: 0;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @media (max-width: 768px) {
                .search-modal {
                    padding: 1rem;
                }

                .search-modal-content {
                    max-height: 80vh;
                    margin-top: 2rem;
                }
            }
        `;

        document.head.appendChild(style);
    }

    // Profile modal
    setupProfileModal() {
        const profileBtn = document.querySelector('.profile-btn');
        
        profileBtn.addEventListener('click', () => {
            this.showProfileDropdown();
        });
    }

    showProfileDropdown() {
        const existing = document.querySelector('.profile-dropdown');
        if (existing) {
            existing.remove();
            return;
        }

        const profileBtn = document.querySelector('.profile-btn');
        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.innerHTML = `
            <a href="#" class="dropdown-item">My Account</a>
            <a href="#" class="dropdown-item">Orders</a>
            <a href="#" class="dropdown-item">Wishlist</a>
            <a href="#" class="dropdown-item">Settings</a>
            <hr style="border: none; border-top: 1px solid var(--border-color); margin: 0.5rem 0;">
            <a href="#" class="dropdown-item">Logout</a>
        `;

        profileBtn.parentElement.style.position = 'relative';
        profileBtn.parentElement.appendChild(dropdown);

        this.addProfileDropdownStyles();

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.profile-btn') && !e.target.closest('.profile-dropdown')) {
                dropdown.remove();
            }
        });
    }

    addProfileDropdownStyles() {
        if (document.querySelector('#profile-dropdown-styles')) return;

        const style = document.createElement('style');
        style.id = 'profile-dropdown-styles';
        style.textContent = `
            .profile-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: var(--bg-color);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                box-shadow: var(--shadow-lg);
                min-width: 200px;
                margin-top: 0.5rem;
                z-index: 1001;
                animation: slideDown 0.3s ease;
            }

            .dropdown-item {
                display: block;
                padding: 0.75rem 1.25rem;
                color: var(--text-color);
                text-decoration: none;
                transition: all 0.2s ease;
                border: none;
                background: none;
                cursor: pointer;
                width: 100%;
                text-align: left;
                font-family: 'Poppins', sans-serif;
            }

            .dropdown-item:first-child {
                border-radius: 7px 7px 0 0;
            }

            .dropdown-item:last-child {
                border-radius: 0 0 7px 7px;
            }

            .dropdown-item:hover {
                background: var(--bg-secondary);
                color: #667eea;
                padding-left: 1.5rem;
            }
        `;

        document.head.appendChild(style);
    }

    // Hero section interactions
    setupHeroInteractions() {
        const heroBtn = document.querySelector('.hero-btn');
        
        if (heroBtn) {
            heroBtn.addEventListener('click', () => {
                const featuredSection = document.getElementById('featured');
                if (featuredSection) {
                    featuredSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Category card interactions
    setupCategoryInteractions() {
        const categoryCards = document.querySelectorAll('.category-card');

        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                // In a real app, this would navigate to category page
                console.log('Category clicked');
            });
        });
    }
}

// Performance optimization - Lazy loading
class LazyLoadManager {
    constructor() {
        this.initLazyLoading();
    }

    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    new LuxeShop();
    new LazyLoadManager();
});

// Prevent accidental page navigation
window.addEventListener('beforeunload', (e) => {
    // Only show confirmation if cart has items
    if (window.cart && window.cart.cart.length > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Performance: Reduce main thread blocking
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Prefetch commonly accessed resources
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'product-detail.html';
        document.head.appendChild(link);
    });
}

// Analytics helper (can be integrated with real analytics service)
const Analytics = {
    trackEvent: (eventName, eventData) => {
        console.log(`Event: ${eventName}`, eventData);
        // Send to analytics service
    },

    trackPageView: (pageName) => {
        console.log(`Page View: ${pageName}`);
    }
};

// Track initial page view
Analytics.trackPageView('Homepage');
