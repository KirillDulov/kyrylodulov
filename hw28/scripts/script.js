class Slider {
    #track;
    #sliderContainer;
    #sliderWindow;
    #slides;
    #prevButton;
    #nextButton;
    #dotsContainer;
    #sliderRotationInterval;
    #sliderWidth;
    #slideWidth;
    #currentSlideIndex = 0;
    #timer = null;
    #startX = 0;
    #isMoving = false;
    #ratio = 1.33;
    #sliderBasicWidth;
    #slideWindowWidth;

    constructor(options = {}) {
        this.#sliderContainer = document.getElementById(options.sliderContainerId);
        this.#sliderWindow = document.getElementById(options.sliderWindow);
        this.#track = document.getElementById(options.trackId);
        this.#slides = document.querySelectorAll(options.slidesClass);

        this.#dotsContainer = document.getElementById(options.dotsContainerId);
        this.#prevButton = document.getElementById(options.prevButtonId);
        this.#nextButton = document.getElementById(options.nextButtonId);

        this.#sliderRotationInterval = options.sliderRotationInterval;
        this.#sliderBasicWidth = options.sliderWidth;

        this.#updateDimensions();
        this.#setSlideWidth();

        this.#initDots();
        this.#showSlide(this.#currentSlideIndex);
        this.startRotation();
        this.#attachEventListeners();

        window.addEventListener('resize', () => this.#handleResize());
    }

    #updateDimensions() {
        const viewportWidth = window.innerWidth;
        this.#sliderWidth = Math.min(this.#sliderBasicWidth, viewportWidth);
        this.#slideWindowWidth = this.#sliderWidth - 180;

        this.#sliderContainer.style.width = this.#sliderWidth + 'px';
        this.#sliderWindow.style.width = this.#slideWindowWidth + 'px';
        this.#sliderWindow.style.height = Math.floor(this.#slideWindowWidth / this.#ratio) + 'px';

        this.#slides.forEach(slide => {
            slide.style.width = this.#slideWindowWidth + 'px';
            slide.style.height = Math.floor(this.#slideWindowWidth / this.#ratio) + 'px';
        });
    }

    #handleResize() {
        this.#updateDimensions();
        this.#setSlideWidth();
        this.#showSlide(this.#currentSlideIndex);
    }

    #setSlideWidth() {
        if (this.#slides.length > 0) {
            this.#slideWidth = this.#slides[0].offsetWidth;
        }
    }

    startRotation() {
        this.#timer = setInterval(() => {
            this.#nextSlide();
        }, this.#sliderRotationInterval);
    }

    #initDots() {
        this.#dotsContainer.innerHTML = '';
        this.#slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                clearInterval(this.#timer);
                this.#showSlide(index);
                this.startRotation();
            });
            this.#dotsContainer.append(dot);
        });
    }

    #updateDots() {
        const dots = this.#dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[this.#currentSlideIndex]) {
            dots[this.#currentSlideIndex].classList.add('active');
        }
    }

    #showSlide(index) {
        this.#track.style.transform = `translateX(-${index * this.#slideWidth}px)`;
        this.#currentSlideIndex = index;
        this.#updateDots();
    }

    #nextSlide() {
        const nextIndex = (this.#currentSlideIndex + 1) % this.#slides.length;
        this.#showSlide(nextIndex);
    }

    #prevSlide() {
        const prevIndex = (this.#currentSlideIndex - 1 + this.#slides.length) % this.#slides.length;
        this.#showSlide(prevIndex);
    }

    #attachEventListeners() {
        this.#nextButton.addEventListener('click', () => {
            clearInterval(this.#timer);
            this.#nextSlide();
            this.startRotation();
        });

        this.#prevButton.addEventListener('click', () => {
            clearInterval(this.#timer);
            this.#prevSlide();
            this.startRotation();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                this.#nextButton.click();
            } else if (event.key === 'ArrowLeft') {
                this.#prevButton.click();
            }
        });

        this.#track.addEventListener('touchstart', (event) => {
            clearInterval(this.#timer);
            if (event.touches.length > 1) return;
            this.#startX = event.touches[0].clientX;
            this.#isMoving = true;
        });

        this.#track.addEventListener('touchmove', (event) => {
            if (!this.#isMoving) return;
            const dx = event.touches[0].clientX - this.#startX;
            this.#track.style.transform = `translateX(${-this.#currentSlideIndex * this.#slideWidth + dx}px)`;
        });

        this.#track.addEventListener('touchend', (event) => {
            if (!this.#isMoving) return;
            this.#isMoving = false;
            const dx = event.changedTouches[0].clientX - this.#startX;
            if (dx > 50) {
                this.#prevSlide();
            } else if (dx < -50) {
                this.#nextSlide();
            } else {
                this.#showSlide(this.#currentSlideIndex);
            }
            this.startRotation();
        });

        this.#track.addEventListener('mouseenter', () => clearInterval(this.#timer));
        this.#track.addEventListener('mouseleave', () => this.startRotation());
    };
}
const slider = new Slider({
    sliderContainerId: 'slider-container',
    trackId: 'slider-track',
    slidesClass: '.slide',
    prevButtonId: 'prev',
    nextButtonId: 'next',
    dotsContainerId: 'dots',
    sliderRotationInterval: 3000,
    sliderWidth: 1202, 
    sliderWindow: 'slider'
});