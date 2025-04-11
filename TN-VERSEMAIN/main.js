document.addEventListener('DOMContentLoaded', function() {
    const mainVideo = document.getElementById('mainVideo');
    const locationOptions = document.querySelectorAll('.location-option');
    const navbar = document.querySelector('.navbar');

    // Create custom controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'custom-video-controls';
    document.querySelector('.video-container').appendChild(controlsContainer);

    // Create pause button
    const pauseBtn = document.createElement('button');
    pauseBtn.innerHTML = '⏸';
    pauseBtn.addEventListener('click', () => {
        if (mainVideo.paused) {
            mainVideo.play();
            pauseBtn.innerHTML = '⏸';
        } else {
            mainVideo.pause();
            pauseBtn.innerHTML = '▶';
        }
    });
    controlsContainer.appendChild(pauseBtn);

    // Create mute button
    const muteBtn = document.createElement('button');
    muteBtn.innerHTML = '🔇';
    muteBtn.addEventListener('click', () => {
        mainVideo.muted = !mainVideo.muted;
        muteBtn.innerHTML = mainVideo.muted ? '🔇' : '🔊';
    });
    controlsContainer.appendChild(muteBtn);

    // Initialize with first video and details
    if (locationOptions.length > 0) {
        const firstOption = locationOptions[0];
        const firstVideo = firstOption.getAttribute('data-video');
        const firstTitle = firstOption.getAttribute('data-title');
        const firstDescription = firstOption.getAttribute('data-description');
        
        // Add error event listener
        mainVideo.addEventListener('error', function() {
            console.error('Video error:', mainVideo.error);
            alert('Error loading video. Please check console for details.');
        });
        
        if (firstVideo) {
            mainVideo.src = firstVideo;
            firstOption.classList.add('active');
            
            // Set initial details
            document.querySelector('.location-title').textContent = firstTitle;
            document.querySelector('.location-description').textContent = firstDescription;
        }
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Location selection and scrolling
    const optionsContainer = document.querySelector('.location-options-container');
    const optionsWrapper = document.querySelector('.location-options');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let scrollPosition = 0;
    const scrollStep = 100;

    function updateArrows() {
        const maxScroll = optionsWrapper.scrollWidth - optionsContainer.offsetWidth;
        leftArrow.disabled = scrollPosition >= 0;
        rightArrow.disabled = scrollPosition <= -maxScroll || maxScroll <= 0;
    }

    locationOptions.forEach(option => {
        option.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            mainVideo.src = videoSrc;
            mainVideo.load();
            mainVideo.play();
            
            locationOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Update details panel
            document.querySelector('.location-title').textContent = title;
            document.querySelector('.location-description').textContent = description;
        });
    });

    leftArrow.addEventListener('click', () => {
        const newPosition = scrollPosition + scrollStep;
        scrollPosition = Math.min(newPosition, 0);
        optionsWrapper.style.transform = `translateX(${scrollPosition}px)`;
        updateArrows();
    });

    rightArrow.addEventListener('click', () => {
        const maxScroll = optionsWrapper.scrollWidth - optionsContainer.offsetWidth;
        const newPosition = scrollPosition - scrollStep;
        scrollPosition = Math.max(newPosition, -maxScroll);
        optionsWrapper.style.transform = `translateX(${scrollPosition}px)`;
        updateArrows();
    });

    // Initialize arrows
    updateArrows();

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
});
const scrollContainer = document.getElementById("scrollableCards");
let isDown = false;
let startX;
let scrollStart;

scrollContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  scrollContainer.classList.add("active");
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollStart = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener("mouseleave", () => {
  isDown = false;
});

scrollContainer.addEventListener("mouseup", () => {
  isDown = false;
});

scrollContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2;
  scrollContainer.scrollLeft = scrollStart - walk;
});

function scrollLeftArrow() {
  scrollContainer.scrollBy({
    left: -250,
    behavior: "smooth"
  });
}

function scrollRightArrow() {
  scrollContainer.scrollBy({
    left: 250,
    behavior: "smooth"
  });
}
