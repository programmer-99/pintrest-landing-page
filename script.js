// collapse by default; expand on click; also push page wrapper
const toggleBtn = document.getElementById('sbToggle');

function setExpanded(expanded){
  document.body.classList.toggle('sb-expanded', expanded);
  document.body.classList.toggle('sb-collapsed', !expanded);
  toggleBtn.setAttribute('aria-expanded', String(expanded));
  // (optional) persist choice
  localStorage.setItem('sbExpanded', expanded ? '1' : '0');
}

// init from storage
setExpanded(localStorage.getItem('sbExpanded') === '1');

// toggle on click
toggleBtn.addEventListener('click', () => {
  const next = !document.body.classList.contains('sb-expanded');
  setExpanded(next);
});

// CTA demo
document.querySelector('.shop-btn')?.addEventListener('click', () => {
  // replace with navigation if you want
  alert('Redirecting to products…');
});
const swiper = new Swiper('.testimonial-container', {
  loop: true,
  autoplay: { delay: 4000 },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", function() {
    const item = this.parentElement;
    item.classList.toggle("active");
  });
});
// Related products carousel
const relatedSwiper = new Swiper('.rp-swiper', {
  slidesPerView: 1.2,
  spaceBetween: 16,
  loop: false,
  grabCursor: true,
  navigation: {
    nextEl: '.rp-next',
    prevEl: '.rp-prev',
  },
  pagination: {
    el: '.rp-pagination',
    clickable: true,
  },
  breakpoints: {
    576: { slidesPerView: 2.2, spaceBetween: 18 },
    768: { slidesPerView: 3,   spaceBetween: 20 },
    1200:{ slidesPerView: 4,   spaceBetween: 24 }
  }
});