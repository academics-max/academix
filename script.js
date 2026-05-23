const plans = {
  single:  { title: 'עבודה בודדת',  price: '10₪ לעבודה אחת' },
  monthly: { title: 'מנוי חודשי',   price: '30₪ לחודש' },
  yearly:  { title: 'מנוי שנתי',    price: '120₪ לשנה' },
};

// Scroll reveal
document.documentElement.classList.add('js-ready');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function openModal(planKey) {
  const plan = plans[planKey];
  document.getElementById('modal-title').textContent    = 'הרשמה — ' + plan.title;
  document.getElementById('modal-subtitle').textContent = plan.price;
  document.getElementById('price-display').textContent  = 'סך לתשלום: ' + plan.price;
  document.getElementById('signup-form').style.display  = 'block';
  document.getElementById('success-msg').style.display  = 'none';
  document.getElementById('signup-form').reset();
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (event && event.target !== document.getElementById('modalOverlay')) return;
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
});

function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = 'שולח...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('success-msg').style.display = 'block';
  }, 800);
}
