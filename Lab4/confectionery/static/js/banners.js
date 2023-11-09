const banner = document.getElementById('banner');
const imageList = [
    "/static/assets/bannerimage1.jpg",
    "/static/assets/bannerimage2.jpg",
    "/static/assets/bannerimage3.webp",
];


let currentImageIndex = 0;
let rotationInterval;
document.addEventListener('DOMContentLoaded', () => {
    startRotation();
});
function rotateBanner() {
    console.log('rotate')
    banner.style.opacity = 0;
    banner.classList.add('fade-out');
    setTimeout(() => {
        currentImageIndex = (currentImageIndex + 1) % imageList.length;
        banner.src = imageList[currentImageIndex];
        banner.style.opacity = 1;
        banner.classList.remove('fade-out');
    }, 1000);
}

function startRotation() {
    rotationInterval = setInterval(rotateBanner, 5000);
    banner.src = imageList[currentImageIndex];

}

function stopRotation() {
    clearInterval(rotationInterval);
}


document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        stopRotation();
    } else {
        startRotation();
    }
});

const rotationForm = document.getElementById('rotation-form');
const rotationIntervalInput = document.getElementById('rotation-interval');
const updateIntervalButton = document.getElementById('update-interval');

updateIntervalButton.addEventListener('click', () => {
    console.log("Button clicked"); // Добавьте это для отладки
    const newInterval = parseInt(rotationIntervalInput.value) * 1000;
    clearInterval(rotationInterval);
    rotationInterval = setInterval(rotateBanner, newInterval);
});
