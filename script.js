const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () =>{
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () =>{
        nav.classList.remove('active');
    })
}
let currentImageIndex = 0;
        const images = document.querySelectorAll('.carousel-image');

        function showImage() {
            images.forEach((image, index) => {
                if (index === currentImageIndex) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage();
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage();
        }

        showImage();
        setInterval(nextImage, 5000);
        document.getElementById('current-year').textContent = new Date().getFullYear();
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('contact-form');
        
            form.addEventListener('submit', async (event) => {
                event.preventDefault(); // Prevent the default form submission
        
                // Gather the form data
                const formData = {
                    name: form.name.value,
                    email: form.email.value,
                    message: form.message.value
                };
        
                try {
                    // Send the form data to the server
                    const response = await fetch('/submit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });
        
                    // Handle the response from the server
                    if (response.ok) {
                        const result = await response.text();
                        alert(result); // Show a success message or handle it as needed
                        form.reset(); // Reset the form after successful submission
                    } else {
                        alert('There was an error submitting the form.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('There was an error submitting the form.');
                }
            });
        });
        
        