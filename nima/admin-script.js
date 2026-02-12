// Preview image when selected
function previewImage(input, imgId, filename) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.getElementById(imgId);
            const noPhoto = img.nextElementSibling;
            
            img.src = e.target.result;
            img.style.display = 'block';
            noPhoto.style.display = 'none';
            
            showMessage('Photo loaded! Right-click and save as "' + filename + '"', 'success');
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Delete photo (clear preview)
function deletePhoto(filename, imgId) {
    const img = document.getElementById(imgId);
    const noPhoto = img.nextElementSibling;
    
    if (confirm('Remove this photo from preview?\n\nNote: This only clears the preview. To permanently delete, remove the file from your folder.')) {
        img.src = '';
        img.style.display = 'none';
        noPhoto.style.display = 'block';
        
        showMessage('Photo removed from preview', 'success');
    }
}

// Show success/error message
function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        message.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => message.remove(), 300);
    }, 4000);
}

// Download image helper
function downloadImage(imgId, filename) {
    const img = document.getElementById(imgId);
    
    if (img.src && !img.src.includes('data:')) {
        showMessage('Right-click the image and select "Save image as..."', 'error');
        return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = img.src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showMessage('Download started! Save as "' + filename + '"', 'success');
}

// Check for existing photos on load
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.photo-preview img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            if (this.naturalWidth > 0) {
                this.style.display = 'block';
                this.nextElementSibling.style.display = 'none';
            }
        });
    });
    
    showMessage('Admin panel loaded! Upload photos to get started.', 'success');
});

// Drag and drop support
document.querySelectorAll('.photo-preview').forEach(preview => {
    preview.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.border = '3px dashed #667eea';
        this.style.background = '#e7f5ff';
    });
    
    preview.addEventListener('dragleave', function(e) {
        this.style.border = 'none';
        this.style.background = '#e9ecef';
    });
    
    preview.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.border = 'none';
        this.style.background = '#e9ecef';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const img = this.querySelector('img');
            const reader = new FileReader();
            
            reader.onload = function(event) {
                img.src = event.target.result;
                img.style.display = 'block';
                img.nextElementSibling.style.display = 'none';
                showMessage('Photo loaded! Right-click and save with the correct filename.', 'success');
            };
            
            reader.readAsDataURL(file);
        } else {
            showMessage('Please drop an image file', 'error');
        }
    });
});
