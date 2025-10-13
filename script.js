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
window.addEventListener("load", () => {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const allProducts = document.querySelectorAll(".product-card");

  // Collect product info
  const productList = Array.from(allProducts).map(card => ({
    title: card.querySelector("h4")?.textContent.trim() || "",
    category: card.querySelector(".category")?.textContent.trim() || "",
  }));

  // Show matching results as user types
  searchInput.addEventListener("input", e => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    const matches = productList.filter(
      p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchResults.style.display = "none";
      return;
    }

    matches.slice(0, 10).forEach(match => {
      const li = document.createElement("li");
      li.textContent = `${match.title} (${match.category})`;
      li.addEventListener("click", () => {
        searchInput.value = "";
        searchResults.style.display = "none";

        // Scroll to first matching product in grid
        allProducts.forEach(card => {
          const title = card.querySelector("h4")?.textContent.trim().toLowerCase();
          if (title.includes(match.title.toLowerCase())) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.style.outline = "2px solid #ff6f61";
            setTimeout(() => (card.style.outline = "none"), 2000);
          }
        });
      });
      searchResults.appendChild(li);
    });

    searchResults.style.display = "block";
  });

  // Hide list when clicking elsewhere
  document.addEventListener("click", e => {
    if (!e.target.closest(".search")) {
      searchResults.style.display = "none";
    }
  });
});