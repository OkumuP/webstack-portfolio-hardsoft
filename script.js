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