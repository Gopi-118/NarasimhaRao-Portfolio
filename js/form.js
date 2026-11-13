document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullNameInput = form.querySelector('#fullName');
    const emailInput = form.querySelector('#email');
    const mobileInput = form.querySelector('#mobile');
    const serviceInput = form.querySelector('#service');
    const messageInput = form.querySelector('#message');
    const result = form.querySelector('.form-message');

    const fullName = (fullNameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const mobile = (mobileInput?.value || '').trim();
    const service = (serviceInput?.value || '').trim();
    const message = (messageInput?.value || '').trim();

    if (!fullName || !email || !mobile || !message) {
      result.textContent = 'Please complete all required fields before sending your enquiry.';
      result.className = 'form-message error';
      return;
    }

    const whatsapp = (window.NA_CONFIG?.contact?.whatsapp || '+917036776192').replace(/\D/g, '');
    const whatsappMessage = encodeURIComponent(
      `Hello TAXORITHM, I am ${fullName}.\nEmail: ${email}\nMobile: ${mobile}\nService Required: ${service || 'Not specified'}\nMessage: ${message}`
    );
    const link = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;

    window.location.assign(link);
  });
});
