const track = document.querySelector('#slider-track')
const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dotsContainer = document.getElementById('dots');

const sliderRotationInterval = 3000;
const slideWidth = 1024;

let currentSlideIndex = 0;
let timer = null;

function startRotation() {
    timer = setInterval(() => {
        nextSlide();
    }, sliderRotationInterval);
}

function initDots() {
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.append(dot);

        dot.addEventListener('click', _ => {
            clearInterval(timer);
            showSlide(index);
            updateDots(index);
            startRotation();
        });
    });
}

function updateDots(dotIndex) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));

    dots.forEach((dot, index) => {
        if (index === dotIndex) {
            dot.classList.add('active');
        }
    });
}

function showSlide(idx) {
    track.style.transform = `translateX(-${idx * slideWidth}px)`;

    currentSlideIndex = idx;
    updateDots(idx);
}

function nextSlide() {
    currentSlideIndex = currentSlideIndex >= slides.length - 1 ? 0 : ++currentSlideIndex;
    showSlide(currentSlideIndex);
}
showSlide(currentSlideIndex);

function prevSlide() {
    currentSlideIndex = currentSlideIndex <= 0 ? slides.length - 1 : --currentSlideIndex;

    showSlide(currentSlideIndex);
}

function handleBackForward(direction = true) {
    clearInterval(timer);
    if (direction) nextSlide();
    else prevSlide();
    startRotation();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        handleBackForward(true);  
    } else if (event.key === 'ArrowLeft') {
        handleBackForward(false); 
    }
});

nextButton.addEventListener('click', () => {
    handleBackForward();
});

prevButton.addEventListener('click', () => {
    handleBackForward(false);
})


let startX = 0;
let isMoving = false;

track.addEventListener('touchstart', (event) => {
    clearInterval(timer);

    if (event.touches > 1) {
        return;
    }
    startX = event.touches[0].clientX;
    isMoving = true;
});

track.addEventListener('touchmove', (event) => {
    if (!isMoving) return;

    let dx = event.touches[0].clientX - startX;
    track.style.transform = `translateX(${-currentSlideIndex * slideWidth + dx}px)`;
});

track.addEventListener('touchend', (event) => {
    if (!isMoving) return;
    isMoving = false;
    const endX = event.changedTouches[0].clientX;
    const dx = endX - startX;

    if (dx > 250) {
        prevSlide;
    } else if (dx < -250) {
        nextSlide();
    } else {
        showSlide(currentSlideIndex);
    }

    startRotation();
});

track.addEventListener('mouseenter', () => {
    clearInterval(timer);
});

track.addEventListener('mouseleave', () => {
    startRotation();
});

showSlide(currentSlideIndex);
startRotation();
initDots();
updateDots(currentSlideIndex);


































//function showSlide(idx) {
//    slides.forEach((slide, index) => {
//        if (index + 1 === idx) {
//            slide.classList.add('active');
//        } else if (slide.classList.contains('active')) {
//            slide.classList.remove('active');
//        }
//    });
//}