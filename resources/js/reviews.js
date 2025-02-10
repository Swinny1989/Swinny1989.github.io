const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const testimonials = [
    {
        image: "https://scontent.fman6-1.fna.fbcdn.net/v/t39.30808-6/472992799_10170818694725626_905425183870470885_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=4JTTvqPUE7QQ7kNvgGpl6KV&_nc_oc=AdjGc1NkNn0b11h79Mvu34w0pC5WF0vW_DJQ7W67nxRWKHYXndEAXChv14T6L-nTHIs&_nc_zt=23&_nc_ht=scontent.fman6-1.fna&_nc_gid=AyAazDSJhfl63ZhDK0jgrEF&oh=00_AYAIVOFnjg4I02i7qb_ESSd1AXQhNQ9H04JZgdIt0FX2mA&oe=67AEFE4D",
        name: "Sarah Hodgkinson",
        text: "Thank you so much for taking such care of Buster boy! We called upon Katie when an unplanned hospital trip arose and she went above and beyond for us, from a home pick up to regular updates, nothing was too much trouble. You can tell that Katie’s love for dogs begins at tip of their nose to the end of the waggiest tails ♥️🐾♥️"
    },
    {
        image: "https://scontent.fman6-1.fna.fbcdn.net/v/t39.30808-6/427871620_10159305955981887_279181426754706408_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ykK8iKdysqUQ7kNvgGA8L1K&_nc_oc=AdhKU4Nkly_yc8p7bGzpuz-QK4Z0BidiDYhKYQJxXFIAogkO9lTeu2Yt5EBiFwmzPqA&_nc_zt=23&_nc_ht=scontent.fman6-1.fna&_nc_gid=Amx9sz6HNwIYqDeMnaZum0T&oh=00_AYA-qDXMb7xCse1REtfjMRXC_uHlkZuSd08LYmRcbSB0hg&oe=67AEE624",
        name: "Gemma Lawson",
        text: "Katie is fantastic with my 2 year old German pointer x Luna. Luna can be wary around strangers but Katie has a wonderful way with her. She is extremely reliable and her boarding service offers a home from home environment where I know Luna will be loved and well looked after"
    },
    {
        image: "https://scontent.fman6-1.fna.fbcdn.net/v/t1.6435-9/95930778_558788788163974_3048609563847688192_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=FY518gpGcRwQ7kNvgE2sLOF&_nc_oc=Adg3PoKmWQfyuGVi6Dxe8IQx0AMv05hky0uk-evpg84kT0cYklz9IO_rQFXuF5RA0_0&_nc_zt=23&_nc_ht=scontent.fman6-1.fna&_nc_gid=A-Qiz4C4nbneDBWpnetEABP&oh=00_AYBnqmDFqeKchoJcCcSbRmbGr_XeIzRyJnAnFY1W2VdMTQ&oe=67D1EEE7",
        name: "Debra Fennel",
        text: "We recently left our dog Barney with Katie and her family. From the moment we all met up we felt totally at ease and that we were leaving Barney in the best care and environment. Barney thoroughly enjoyed his stay and made a good friend in Katie's dog lilly ❤️ I can't recommend Katie enough and we have other dates already booked in."
    }
];

let currentIndex = 0;

function createTestimonialElement(testimonial, index) {
    const div = document.createElement('div');
    div.className = 'testimonial';
    div.innerHTML = `
        <img src="${testimonial.image}" alt="${testimonial.name}">
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