/* ============================================
   DARK MODE & THEME TOGGLE
   ============================================ */

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.init();
    }

    init() {
        this.loadTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.prefersDark.addListener((e) => this.handleSystemThemeChange(e));
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Use system preference
            const isDark = this.prefersDark.matches;
            this.setTheme(isDark ? 'dark' : 'light');
        }
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        localStorage.setItem('theme', theme);
        this.updateMeta();
    }

    updateMeta() {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = document.body.classList.contains('dark-mode') ? '#0a0a0a' : '#ffffff';
            document.head.appendChild(meta);
        } else {
            metaThemeColor.content = document.body.classList.contains('dark-mode') ? '#0a0a0a' : '#ffffff';
        }
    }

    handleSystemThemeChange(e) {
        if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches ? 'dark' : 'light');
        }
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
