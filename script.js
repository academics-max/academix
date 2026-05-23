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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^05\d[-]?\d{7}$/;

function showError(id, msg) {
  const el = document.getElementById(id + '-error');
  const input = document.getElementById(id);
  if (el) el.textContent = msg;
  if (input) input.classList.toggle('input-error', !!msg);
}

function validateForm() {
  let valid = true;

  const name = document.getElementById('name').value.trim();
  if (name.length < 2) {
    showError('name', 'נא להזין שם מלא (לפחות 2 תווים)');
    valid = false;
  } else {
    showError('name', '');
  }

  const email = document.getElementById('email').value.trim();
  if (!EMAIL_RE.test(email)) {
    showError('email', 'כתובת אימייל לא תקינה — לדוגמה: name@gmail.com');
    valid = false;
  } else {
    showError('email', '');
  }

  const phone = document.getElementById('phone').value.trim();
  if (!PHONE_RE.test(phone)) {
    showError('phone', 'מספר טלפון לא תקין — פורמט נדרש: 05X-XXXXXXX');
    valid = false;
  } else {
    showError('phone', '');
  }

  return valid;
}

function submitForm(e) {
  e.preventDefault();
  if (!validateForm()) return;
  const btn = e.target.querySelector('.btn-submit');
  btn.textContent = 'שולח...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('success-msg').style.display = 'block';
  }, 800);
}
