// Backend API URL - Change this for production deployment
const API = 'https://jaldhara-rajsthan-ma2b.onrender.com/api';
// For local development, use: const API = 'http://localhost:5000/api';
let currentSort = 'latest';

function fmtDate(iso) {
  const d = new Date(iso);
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`; // dates always English
}

async function loadArticles() {
  const list = document.getElementById('list');
  list.innerHTML = '<div class="empty">लोड हो रहा है...</div>';
  try {
    const res = await fetch(`${API}/articles?sort=${currentSort}`);
    const articles = await res.json();
    if (!articles.length) { list.innerHTML = '<div class="empty">अभी कोई लेख नहीं। एडमिन पैनल से जोड़ें।</div>'; return; }
    list.innerHTML = articles.map((a, i) => `
      <a href="article.html?id=${a._id}" class="row">
        <span class="row-num">${String(i + 1).padStart(2, '0')}</span>
        <div class="row-main">
          <h3>${a.title}</h3>
          <div class="row-meta"><span class="pill">${a.category}</span><span>${fmtDate(a.createdAt)}</span></div>
        </div>
        <span class="row-arrow">→</span>
      </a>`).join('');
  } catch {
    list.innerHTML = '<div class="empty">सर्वर से कनेक्शन नहीं। backend चालू करें।</div>';
  }
}

document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSort = btn.dataset.sort;
    loadArticles();
  });
});

const langSelect = document.getElementById('langSelect');
if (langSelect) langSelect.addEventListener('change', e => { localStorage.setItem('lang', e.target.value); });

loadArticles();
