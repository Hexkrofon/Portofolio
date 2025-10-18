/**
 * PORTFOLIO WEBSITE JAVASCRIPT
 * ===========================
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();        // Navigasi mobile/desktop
    initScrollAnimations();  // Animasi scroll
    initSkillBars();         // Progress bar skill
    initProjectFilter();     // Filter proyek
    initSmoothScrolling();   // Smooth scroll
    initTypingEffect();      // Efek typing
    initParallaxEffect();    // Efek parallax
});

/**
 * NAVIGATION FUNCTIONALITY
 * ========================
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle - Toggle class active pada hamburger dan nav-menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link - Menutup menu saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect disabled to keep header dark
    // Background and borders are handled via CSS only
}

/**
 * SCROLL ANIMATIONS
 * =================
 * Menambahkan animasi fade-in-up saat elemen masuk ke viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,                    // Trigger saat 10% elemen terlihat
        rootMargin: '0px 0px -50px 0px'    // Margin untuk trigger lebih awal
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');  // Tambahkan class animasi
            }
        });
    }, observerOptions);

    // Observe elements for animation - Amati elemen untuk animasi
    const animatedElements = document.querySelectorAll('.skill-card, .info-card, .interest-card, .project-card, .timeline-item, .stat-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * SKILL BARS ANIMATION
 * ====================
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');  // Ambil nilai width dari data-width
                progressBar.style.width = width;                       // Set width untuk animasi
                skillObserver.unobserve(progressBar);                  // Hentikan observe setelah animasi
            }
        });
    }, { threshold: 0.5 });  // Trigger saat 50% elemen terlihat

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

/**
 * PROJECT FILTER FUNCTIONALITY
 * ============================
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons - Hapus class active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button - Tambahkan class active ke tombol yang diklik
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');  // Ambil nilai filter

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';                                    // Tampilkan kartu
                    card.style.animation = 'fadeInUp 0.5s ease forwards';           // Tambahkan animasi
                } else {
                    card.style.display = 'none';                                     // Sembunyikan kartu
                }
            });
        });
    });
}


/**
 * SMOOTH SCROLLING FOR ANCHOR LINKS
 * ==================================
 * Mengatur smooth scrolling untuk link anchor
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');  // Pilih semua link yang dimulai dengan #
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // Mencegah default behavior link
            const targetId = this.getAttribute('href');      // Ambil ID target
            const targetElement = document.querySelector(targetId);  // Cari elemen target
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',  // Smooth scroll
                    block: 'start'       // Scroll ke posisi start elemen
                });
            }
        });
    });
}

/**
 * TYPING EFFECT FOR HERO TITLE
 * =============================
 * Membuat efek typing pada hero title
 */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;  // Keluar jika elemen tidak ditemukan

    const text = heroTitle.textContent;  // Simpan text asli
    heroTitle.textContent = '';          // Kosongkan elemen
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);  // Tambahkan karakter satu per satu
            i++;
            setTimeout(typeWriter, 100);              // Delay 100ms antar karakter
        }
    };

    // Start typing effect after a short delay - Mulai efek typing setelah delay 500ms
    setTimeout(typeWriter, 500);
}

/**
 * PARALLAX EFFECT FOR HERO SECTION
 * ================================
 * Membuat efek parallax pada hero section
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;  // Keluar jika elemen tidak ditemukan

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;  // Dapatkan posisi scroll
        const rate = scrolled * -0.5;         // Hitung rate parallax (negatif untuk efek ke atas)
        hero.style.transform = `translateY(${rate}px)`;  // Terapkan transform
    });
}

