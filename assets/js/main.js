/**
 * Indra Marriage Garden - Main JavaScript
 * Handling Navigation, Sliders, Tabs, Lightbox, FAQs, and WhatsApp Booking
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Sticky Header
  const header = document.querySelector('.main-header');
  const scrollTopBtn = document.querySelector('.float-scroll-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
      scrollTopBtn?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      scrollTopBtn?.classList.remove('visible');
    }
  });

  // Scroll to Top
  scrollTopBtn?.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile nav when clicking a nav link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && !link.classList.contains('has-dropdown')) {
          navMenu.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }

  // 3. Venue Showcase Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const venueCards = document.querySelectorAll('.venue-card-large');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      tabButtons.forEach(b => b.classList.remove('active'));
      venueCards.forEach(c => c.style.display = 'none');

      this.classList.add('active');
      const targetId = this.getAttribute('data-target');
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.style.display = 'grid';
      }
    });
  });

  // 4. Gallery Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterVal = this.getAttribute('data-filter');
      galleryItems.forEach(item => {
        if (filterVal === 'all' || item.getAttribute('data-category') === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 5. Lightbox Modal
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });

  // 6. FAQ Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const parent = this.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });

  // 7. Interactive Booking Form & Direct WhatsApp Sender
  const bookingForm = document.getElementById('bookingInquiryForm');
  const whatsappBtn = document.getElementById('sendWhatsAppInquiry');

  function getFormData() {
    return {
      name: document.getElementById('inqName')?.value.trim() || '',
      phone: document.getElementById('inqPhone')?.value.trim() || '',
      email: document.getElementById('inqEmail')?.value.trim() || '',
      eventType: document.getElementById('inqEventType')?.value || '',
      eventDate: document.getElementById('inqDate')?.value || '',
      guests: document.getElementById('inqGuests')?.value || '',
      venue: document.getElementById('inqVenue')?.value || '',
      message: document.getElementById('inqMessage')?.value.trim() || ''
    };
  }

  // Handle WhatsApp Enquire Button
  whatsappBtn?.addEventListener('click', function (e) {
    e.preventDefault();
    const data = getFormData();
    if (!data.name || !data.phone) {
      alert('कृपया अपना नाम और फ़ोन नंबर अवश्य भरें (Please enter your name and phone number).');
      return;
    }

    const text = `*New Event Booking Inquiry - Indra Marriage Garden*
----------------------------------------
*Name:* ${data.name}
*Phone:* ${data.phone}
*Email:* ${data.email || 'Not provided'}
*Event Type:* ${data.eventType || 'Not specified'}
*Date:* ${data.eventDate || 'Flexible'}
*Estimated Guests:* ${data.guests || 'Not specified'}
*Preferred Venue:* ${data.venue || 'Any'}
*Message/Notes:* ${data.message || 'I would like to check availability and get pricing details.'}`;

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/919589008911?text=${encodedText}`;
    window.open(waUrl, '_blank');
  });

  // Handle Direct Form Submit
  bookingForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = getFormData();
    if (!data.name || !data.phone) {
      alert('कृपया अपना नाम और फ़ोन नंबर दर्ज करें.');
      return;
    }

    const alertBox = document.getElementById('formSuccessMessage');
    if (alertBox) {
      alertBox.style.display = 'block';
      bookingForm.reset();
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 6000);
    } else {
      alert('धन्यवाद! आपकी इन्क्वायरी सफलतापूर्वक दर्ज कर ली गई है। हमारी टीम जल्द आपसे संपर्क करेगी।');
      bookingForm.reset();
    }
  });
});
