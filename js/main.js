const initializeSite = () => {
  const config = window.NA_CONFIG || {};
  const body = document.body;
  const contact = {
    ...config.contact,
    phone: '+91 90102 71777',
    email: 'taxorithm@gmail.com',
    whatsapp: '+919010271777',
    address: 'Sattenapalli, Palnadu District, Andhra Pradesh, India.'
  };

  document.title = document.title.replace(/Shree Narasimha Associates|Narasimha Associates/gi, 'TAXORITHM');
  document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"]').forEach((meta) => {
    meta.content = meta.content.replace(/Shree Narasimha Associates|Narasimha Associates/gi, 'TAXORITHM');
  });
  const brandPattern = /Shree Narasimha Associates|Narasimha Associates|SHREE NARASIMHA|NARASIMHA\s*ASSOCIATES/gi;
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (textWalker.nextNode()) {
    textWalker.currentNode.textContent = textWalker.currentNode.textContent.replace(brandPattern, 'TAXORITHM');
  }
  document.querySelectorAll('.brand-text').forEach((element) => {
    element.textContent = 'TAXORITHM';
  });
  document.querySelectorAll('[aria-label], img[alt]').forEach((element) => {
    ['aria-label', 'alt'].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value) element.setAttribute(attribute, value.replace(brandPattern, 'TAXORITHM'));
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.href = `tel:${(contact.phone || '+91 90102 71777').replace(/\s+/g, '')}`;
    if (link.textContent.replace(/\D/g, '').length >= 10) link.textContent = contact.phone || '+91 90102 71777';
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = `mailto:${contact.email || 'taxorithm@gmail.com'}`;
    link.textContent = contact.email || 'taxorithm@gmail.com';
  });

  document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
    const url = new URL(link.href);
    url.pathname = `/${(contact.whatsapp || '+919010271777').replace(/\D/g, '')}`;
    link.href = url.toString();
  });

  document.querySelectorAll('.contact-list li').forEach((item) => {
    if (item.querySelector('.contact-icon')?.textContent.includes('📍')) {
      const location = item.querySelector('span:not(.contact-icon)');
      if (location) location.textContent = contact.address || 'Sattenapalli, Palnadu District, Andhra Pradesh, India.';
    }
  });

  document.querySelectorAll('.footer-links li').forEach((item) => {
    if (/District|Andhra Pradesh|Sattenapalli|Telangana|Guntur/i.test(item.textContent)) {
      item.textContent = contact.address || 'Sattenapalli, Palnadu District, Andhra Pradesh, India.';
    }
  });

  document.querySelectorAll('iframe[src*="google.com/maps"]').forEach((map) => {
    const url = new URL(map.src);
    url.searchParams.set('q', 'Sattenapalli, Palnadu District, Andhra Pradesh, India');
    map.src = url.toString();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const backToTop = document.querySelector('.fab.top');
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const footerYear = document.querySelector('[data-year]');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  if (document.querySelector('#important-dates-list')) {
    const dates = config.importantDates || [];
    const list = document.querySelector('#important-dates-list');
    list.innerHTML = dates.map((item) => `
      <article class="date-card ${item.upcoming ? 'upcoming' : ''} reveal">
        <div class="meta">
          <span class="badge">${item.category}</span>
          <span class="date-chip">${new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.note}</p>
      </article>
    `).join('');
  }

  if (document.querySelector('#team-grid')) {
    const team = config.team || [];
    const grid = document.querySelector('#team-grid');
    grid.innerHTML = team.map((member, index) => `
      <article class="team-card card reveal">
        <div class="team-photo">
          <img src="https://images.unsplash.com/photo-${index === 0 ? '1544005313-94ddf0286df2' : index === 1 ? '1556157382-97eda2d62296' : index === 2 ? '1500648767791-00dcc994a43e' : '1524504388940-b1c1722653e1'}?auto=format&fit=crop&w=900&q=80" alt="${member.name}" loading="lazy" />
        </div>
        <div class="team-card-body">
          <h3>${member.name}</h3>
          <div class="role">${member.role}</div>
          <div class="qual">${member.qualification}</div>
          <p>${member.bio}</p>
        </div>
      </article>
    `).join('');
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      const target = document.querySelector('[data-filter-target]');
      if (!target) return;
      const items = Array.from(target.children);
      filterButtons.forEach((item) => item.classList.toggle('active', item === button));
      items.forEach((item) => {
        const shouldShow = filter === 'all' || item.dataset.category === filter;
        item.style.display = shouldShow ? '' : 'none';
      });
    });
  });

  const searchInput = document.querySelector('[data-search-input]');
  const searchTarget = document.querySelector('[data-search-target]');
  if (searchInput && searchTarget) {
    searchInput.addEventListener('input', (event) => {
      const term = event.target.value.toLowerCase();
      Array.from(searchTarget.children).forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }

  document.querySelectorAll('.accordion-head').forEach((button) => {
    button.addEventListener('click', () => {
      const body = button.nextElementSibling;
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) {
        body.style.maxHeight = '0px';
        return;
      }
      body.style.maxHeight = `${body.scrollHeight}px`;
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSite, { once: true });
} else {
  initializeSite();
}
