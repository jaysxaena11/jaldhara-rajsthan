const API = 'http://localhost:5000/api';
let token = localStorage.getItem('token');
let deleteId = null;

const loginView = document.getElementById('loginView');
const dashView = document.getElementById('dashView');

function showDash() { loginView.classList.add('hidden'); dashView.classList.remove('hidden'); loadStats(); loadRows(); }
function showLogin() { dashView.classList.add('hidden'); loginView.classList.remove('hidden'); }

if (token) showDash(); else showLogin();

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) { document.getElementById('loginErr').textContent = data.error || 'लॉगिन विफल'; return; }
  token = data.token; localStorage.setItem('token', token);
  document.getElementById('who').textContent = data.user.name;
  showDash();
});

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token'); token = null; showLogin();
});

async function loadStats() {
  const res = await fetch(`${API}/articles/admin/stats`, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 401) { localStorage.removeItem('token'); showLogin(); return; }
  const s = await res.json();
  sArticles.textContent = s.articles; sVlogs.textContent = s.vlogs; sCats.textContent = s.categories;
}

async function loadRows() {
  const res = await fetch(`${API}/articles`);
  const articles = await res.json();
  document.getElementById('rows').innerHTML = articles.map(a => `
    <tr>
      <td>${a.title}</td>
      <td>${a.category}</td>
      <td class="${a.status === 'published' ? 'status-pub' : 'status-draft'}">${a.status === 'published' ? 'प्रकाशित' : 'ड्राफ्ट'}</td>
      <td>
        <button class="act" onclick="window.open('../frontend/article.html?id=${a._id}')">👁</button>
        <button class="act del" data-id="${a._id}">🗑</button>
      </td>
    </tr>`).join('');
  document.querySelectorAll('.act.del').forEach(b => b.addEventListener('click', () => {
    deleteId = b.dataset.id; document.getElementById('modal').classList.remove('hidden');
  }));
}

document.getElementById('createForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    title: cTitle.value, category: cCategory.value || 'समाचार',
    type: cType.value, body: cBody.value, language: 'hi', status: 'published'
  };
  const res = await fetch(`${API}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body)
  });
  if (res.ok) { e.target.reset(); loadStats(); loadRows(); }
});

document.getElementById('cancelDel').addEventListener('click', () => document.getElementById('modal').classList.add('hidden'));
document.getElementById('confirmDel').addEventListener('click', async () => {
  await fetch(`${API}/articles/${deleteId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  document.getElementById('modal').classList.add('hidden'); loadStats(); loadRows();
});
