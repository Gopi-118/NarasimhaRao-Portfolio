const initializeNavigation = () => {
  const navMenu = document.querySelector('.nav-menu');
  const toggle = document.querySelector('.mobile-toggle');
  if (!navMenu || !toggle) return;

  const navItems = [...navMenu.querySelectorAll('.nav-item.has-mega, .nav-item.has-dropdown')];

  const closeDropdowns = (except = null) => {
    navItems.forEach((item) => {
      if (item === except) return;
      item.classList.remove('open');
      item.querySelector('.nav-link')?.setAttribute('aria-expanded', 'false');
    });
  };

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) closeDropdowns();
  });

  navItems.forEach((item) => {
    const link = item.querySelector('.nav-link');
    if (!link) return;
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
    link.addEventListener('click', (event) => {
      if (window.innerWidth <= 960 && !item.classList.contains('open')) {
        event.preventDefault();
        closeDropdowns(item);
        item.classList.add('open');
        link.setAttribute('aria-expanded', 'true');
      } else if (window.innerWidth <= 960) {
        closeDropdowns();
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  navMenu.querySelectorAll('a:not(.nav-link)').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 960) {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        closeDropdowns();
      }
    });
  });

  navMenu.querySelectorAll('.nav-link:not([aria-haspopup])').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 960) {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        closeDropdowns();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 960 && !event.target.closest('.navbar')) {
      navMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      closeDropdowns();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      closeDropdowns();
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      navMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      closeDropdowns();
    }
  });

  const activePath = window.location.pathname.split('/').pop() || 'index.html';
  navMenu.querySelectorAll('.nav-link[data-page]').forEach((link) => {
    if (link.dataset.page === activePath) {
      link.classList.add('active');
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNavigation, { once: true });
} else {
  initializeNavigation();
}
