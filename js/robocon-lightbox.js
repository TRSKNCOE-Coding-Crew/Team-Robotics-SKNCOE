// Simple Robocon Lightbox - Clean Implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Robocon lightbox initializing...');
    
    // Get all Robocon images
    const roboconImages = document.querySelectorAll('.robocon-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    console.log('Found elements:', {
        images: roboconImages.length,
        lightbox: !!lightbox,
        lightboxImg: !!lightboxImg,
        lightboxTitle: !!lightboxTitle,
        lightboxDesc: !!lightboxDesc,
        lightboxClose: !!lightboxClose
    });
    
    // Add click handlers to all Robocon images
    roboconImages.forEach((img, index) => {
        console.log(`Adding click handler to image ${index + 1}:`, img.src);
        
        img.style.cursor = 'pointer';
        img.title = 'Click to view full size';
        
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Image clicked:', this.alt);
            
            if (lightbox && lightboxImg && lightboxTitle && lightboxDesc) {
                // Set lightbox content
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightboxTitle.textContent = this.alt || 'Robocon Image';
                lightboxDesc.textContent = 'Captured moment from ' + (this.alt || 'Robocon competition');
                
                // Show lightbox
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                console.log('Lightbox opened');
            } else {
                console.error('Lightbox elements not found');
            }
        });
    });
    
    // Close lightbox function
    function closeLightbox() {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('Lightbox closed');
        }
    }
    
    // Close button handler
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Click outside to close
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
    
    console.log('Robocon lightbox setup complete');
});