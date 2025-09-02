(function () {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('.nav-list');
    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            const open = navList.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const themeBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved) {
        root.setAttribute('data-theme', saved);
    }
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            const current = root.getAttribute('data-theme') || 'auto';
            const next =
                current === 'light'
                    ? 'dark'
                    : current === 'dark'
                    ? 'auto'
                    : 'light';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    const path = location.pathname.replace(/\/$/, '') || '/index.html';
    const page = path.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('[data-nav]').forEach((a) => {
        if (a.dataset.nav === page) {
            a.setAttribute('aria-current', 'page');
        }
    });

    const projectsGrid = document.getElementById('projects-grid');
    const homeProjects = document.getElementById('home-projects');
    if (projectsGrid || homeProjects) {
        fetch('assets/data/projects.json')
            .then((r) => r.json())
            .then((items) => {
                function card(p) {
                    const el = document.createElement('article');
                    el.className = 'card project';
                    el.innerHTML = `
                        <img src="${p.image}" alt="${p.title}">
                        <h3>${p.title}</h3>
                        <p class="meta">${p.stack.join(' • ')}</p>
                        <p>${p.summary}</p>
                        <div class="actions">
                            ${
                                p.repo
                                    ? `<a class="btn code" href="${p.repo}" target="_blank" rel="noopener">
  <svg width="20" height="20" fill="currentColor" aria-hidden="true" style="vertical-align:middle;"><path d="M10 .3a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 10 5.8c.85.004 1.71.12 2.51.35 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 10 .3"/></svg>
  Code
</a>`
                                    : ''
                            }
                        </div>
                    `;
                    return el;
                }
                if (projectsGrid) {
                    items.forEach((p) => projectsGrid.appendChild(card(p)));
                }
                if (homeProjects) {
                    items.slice(0, 3).forEach((p) => homeProjects.appendChild(card(p)));
                }
            })
            .catch(() => {
                if (projectsGrid) {
                    projectsGrid.innerHTML = '<p>Projects will appear here.</p>';
                }
                if (homeProjects) {
                    homeProjects.innerHTML = '<p>Projects will appear here.</p>';
                }
            });
    }

    const form = document.getElementById('contact-form');
    if (form) {
        const status = document.getElementById('form-status');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if (!name || !email || !message) {
                if (status) {
                    status.textContent = 'Please fill all fields.';
                }
                return;
            }
            const subject = encodeURIComponent('Portfolio inquiry');
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            );
            window.location.href = `mailto:ozcan8479@gmail.com?subject=${subject}&body=${body}`;
            if (status) {
                status.textContent = 'Opening email app…';
            }
        });
    }
})();
