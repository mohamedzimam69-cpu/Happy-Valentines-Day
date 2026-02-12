// Page Navigation
function goToPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Re-trigger animations for memory gallery
    if (pageId === 'story') {
        const memoryItems = document.querySelectorAll('.memory-item');
        memoryItems.forEach((item, index) => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = '';
            }, 10);
        });
    }
}

// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // If image fails to load, show placeholder
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.display = 'block';
            }
        });
        
        img.addEventListener('load', function() {
            // If image loads successfully, hide placeholder
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.display = 'none';
            }
        });
    });
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
