
        // Cursor
        const cursor = document.getElementById('cursor');
        const ring = document.getElementById('cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; });
        (function animRing() { rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); })();
        document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.2)'; cursor.style.opacity = '0.4'; ring.style.width = '48px'; ring.style.height = '48px'; }); el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.opacity = '1'; ring.style.width = '32px'; ring.style.height = '32px'; }); });

        // Mobile menu toggle with remix icons
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        let menuOpen = false;
        menuToggle.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                navLinks.classList.add('active');
                menuToggle.innerHTML = '<i class="ri-close-line"></i>';
            } else {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
            }
        });
        // close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
                menuOpen = false;
            });
        });
        // ensure mobile cta shows inside nav-links
        if (window.innerWidth <= 700) {
            const mobileCta = document.querySelector('.nav-links .mobile-cta');
            if (mobileCta) mobileCta.style.display = 'list-item';
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth > 700) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
                menuOpen = false;
            } else {
                const mobileCta = document.querySelector('.nav-links .mobile-cta');
                if (mobileCta) mobileCta.style.display = 'list-item';
            }
        });

        // Scroll reveal
        const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }); }, { threshold: 0.1 });
        document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));

        // Skill bars
        let barsAnimated = false;
        new IntersectionObserver(entries => { if (entries[0].isIntersecting && !barsAnimated) { barsAnimated = true; document.querySelectorAll('.skill-fill').forEach(el => { setTimeout(() => { el.style.width = el.dataset.width + '%'; }, 400); }); } }, { threshold: 0.2 }).observe(document.getElementById('skills'));

        // Smooth nav scroll
        document.querySelectorAll('a[href^="#"]').forEach(a => { a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } }); });

        // Hero parallax
        window.addEventListener('scroll', () => { const y = window.scrollY; const title = document.querySelector('.hero-title'); if (title) title.style.transform = `translateY(${y * 0.15}px)`; const badge = document.querySelector('.hero-badge'); if (badge) badge.style.transform = `translateY(${y * 0.08}px)`; }, { passive: true });
 