const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const testimonials = [
    {
        name: "Sarah Hodgkinson",
        text: "Thank you so much for taking such care of Buster boy! We called upon Katie when an unplanned hospital trip arose and she went above and beyond for us, from a home pick up to regular updates, nothing was too much trouble. You can tell that Katie’s love for dogs begins at tip of their nose to the end of the waggiest tails ♥️🐾♥️"
    },
    {
        name: "Gemma Lawson",
        text: "Katie is fantastic with my 2 year old German pointer x Luna. Luna can be wary around strangers but Katie has a wonderful way with her. She is extremely reliable and her boarding service offers a home from home environment where I know Luna will be loved and well looked after"
    },
    {
        name: "Debra Fennel",
        text: "We recently left our dog Barney with Katie and her family. From the moment we all met up we felt totally at ease and that we were leaving Barney in the best care and environment. Barney thoroughly enjoyed his stay and made a good friend in Katie's dog lilly ❤️ I can't recommend Katie enough and we have other dates already booked in."
    }
];

let currentIndex = 0;

function createTestimonialElement(testimonial, index) {
    const div = document.createElement('div');
    div.className = 'testimonial';
    div.innerHTML = `
        <h3>${testimonial.name}</h3>
        <p>${testimonial.text}</p>
    `;
    return div;
}

function updateCarousel() {
    carousel.innerHTML = '';
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        carousel.appendChild(createTestimonialElement(testimonials[currentIndex], currentIndex));
    } else {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        const nextIndex = (currentIndex + 1) % testimonials.length;

        carousel.appendChild(createTestimonialElement(testimonials[prevIndex], prevIndex));
        const activeTestimonial = createTestimonialElement(testimonials[currentIndex], currentIndex);
        activeTestimonial.classList.add('active');
        carousel.appendChild(activeTestimonial);
        carousel.appendChild(createTestimonialElement(testimonials[nextIndex], nextIndex));
    }
}

function showNext() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
}

nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Responsive behavior
function handleResize() {
    updateCarousel();
}

window.addEventListener('resize', handleResize);

// Initial setup
updateCarousel();

// Auto-scroll (optional)
// setInterval(showNext, 5000);