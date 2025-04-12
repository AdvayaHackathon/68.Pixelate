
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Side menu toggle
    const menuButton = document.getElementById('menuButton');
    const sideMenu = document.getElementById('sideMenu');
    
    menuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        document.body.classList.toggle('menu-open');
        sideMenu.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function() {
        if (sideMenu.classList.contains('open')) {
            document.body.classList.remove('menu-open');
            sideMenu.classList.remove('open');
        }
    });

    // Prevent menu from closing when clicking inside
    sideMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Category mapping
    const categoryMap = {
        'home': 'all',
        'attractions': 'attraction',
        'art & culture': 'Art & Culture',
        'picnic spots': 'Picnic Spots',
        'regions': 'Regions',
        'spirituality': 'Spirituality',
        'food': 'Food'
    };

    // Handle active state and product filtering
    document.querySelectorAll('.nav-link, .navbar-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link, .navbar-links a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get category from link text
            const linkText = this.textContent.trim().toLowerCase();
            const category = categoryMap[linkText] || 'all';
            
            // Filter products
            document.querySelectorAll('.products-box').forEach(product => {
                if (category === 'all') {
                    // Only show original attraction items (not variations)
                    const isOriginalAttraction = product.dataset.category === 'attraction' && 
                                               !product.closest('.related-images-container');
                    product.style.display = isOriginalAttraction ? 'block' : 'none';
                } else {
                    const productCategory = product.dataset.category;
                    product.style.display = productCategory === category ? 'block' : 'none';
                }
                
                // Hide all variations containers and remove active classes when switching categories
                document.querySelectorAll('.related-images-container').forEach(container => {
                    container.style.display = 'none';
                });
                document.querySelectorAll('.red-shirt-container.active, .light-blue-container.active').forEach(item => {
                    item.classList.remove('active');
                });
            });
            
            // Update URL hash if it's an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                window.location.hash = this.getAttribute('href');
            }
        });
    });

    // Initialize - show only attraction products by default
    document.querySelectorAll('.products-box').forEach(product => {
        product.style.display = product.dataset.category === 'attraction' ? 'block' : 'none';
    });
    
    // Set Attractions link as active by default
    document.querySelector('.navbar-links a[href="index.html"]').classList.add('active');

    // Handle attraction clicks to show related images
    function setupAttractionClickHandler(container) {
        container.addEventListener('click', function(e) {
            e.preventDefault();
            const relatedContainer = this.nextElementSibling?.classList.contains('related-images-container') 
                ? this.nextElementSibling 
                : null;
            
            if (relatedContainer) {
                const isShowing = relatedContainer.style.display !== 'none';
                
                // Hide all other products and related containers
                document.querySelectorAll('.products-box:not(.related-images-container .products-box)')
                    .forEach(item => item.style.display = isShowing ? 'block' : 'none');
                document.querySelectorAll('.related-images-container')
                    .forEach(item => item.style.display = 'none');
                
                // Toggle related images for clicked attraction
                if (!isShowing) {
                    relatedContainer.style.display = 'flex';
                    this.style.display = 'block';
                    this.classList.add('active');
                } else {
                    this.classList.remove('active');
                }
            }
        });
    }

    // Set up click handlers for all attractions including Art & Culture, Picnic Spots, Regions, Spirituality and Food
    document.querySelectorAll('.red-shirt-container, .light-blue-container, .attraction-container, .light-pink-container, [data-category="Art & Culture"], [data-category="Picnic Spots"], [data-category="Regions"], [data-category="Spirituality"], [data-category="Food"]').forEach(container => {
        setupAttractionClickHandler(container);
    });
});

