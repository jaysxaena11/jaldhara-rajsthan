// Backend API URL - Change this for production deployment
const API = 'https://jaldhara-rajsthan-ma2b.onrender.com/api';
// For local development, use: const API = 'http://localhost:5000/api';
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
  const errorEl = document.getElementById('loginErr');
  
  errorEl.textContent = ''; // Clear previous errors
  
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    
    if (!res.ok) { 
      errorEl.textContent = data.error || 'लॉगिन विफल। कृपया पुनः प्रयास करें।';
      return; 
    }
    
    token = data.token;
    localStorage.setItem('token', token);
    document.getElementById('who').textContent = data.user.name;
    showDash();
  } catch (error) {
    console.error('Login error:', error);
    errorEl.textContent = 'सर्वर से कनेक्शन विफल। backend चालू है?';
  }
});

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token'); token = null; showLogin();
});

async function loadStats() {
  try {
    const res = await fetch(`${API}/articles/admin/stats`, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    
    if (res.status === 401) { 
      localStorage.removeItem('token'); 
      showLogin(); 
      return; 
    }
    
    const s = await res.json();
    document.getElementById('sArticles').textContent = s.articles || 0;
    document.getElementById('sVlogs').textContent = s.vlogs || 0;
    document.getElementById('sCats').textContent = s.categories || 0;
  } catch (error) {
    console.error('Error loading stats:', error);
    // Set default values if error
    document.getElementById('sArticles').textContent = '0';
    document.getElementById('sVlogs').textContent = '0';
    document.getElementById('sCats').textContent = '0';
  }
}

async function loadRows() {
  try {
    const res = await fetch(`${API}/articles`);
    const articles = await res.json();
    
    if (!articles || articles.length === 0) {
      document.getElementById('rows').innerHTML = '<tr><td colspan="4" style="text-align:center;">अभी कोई लेख नहीं। ऊपर से जोड़ें।</td></tr>';
      return;
    }
    
    document.getElementById('rows').innerHTML = articles.map(a => `
      <tr>
        <td>${a.title}</td>
        <td>${a.category || 'समाचार'}</td>
        <td class="${a.status === 'published' ? 'status-pub' : 'status-draft'}">${a.status === 'published' ? 'प्रकाशित' : 'ड्राफ्ट'}</td>
        <td>
          <button class="act" onclick="window.open('article.html?id=${a._id}', '_blank')">👁</button>
          <button class="act del" data-id="${a._id}">🗑</button>
        </td>
      </tr>`).join('');
      
    document.querySelectorAll('.act.del').forEach(b => b.addEventListener('click', () => {
      deleteId = b.dataset.id;
      document.getElementById('modal').classList.remove('hidden');
    }));
  } catch (error) {
    console.error('Error loading articles:', error);
    document.getElementById('rows').innerHTML = '<tr><td colspan="4" style="text-align:center;color:red;">लेख लोड करने में त्रुटि। backend चालू है?</td></tr>';
  }
}

document.getElementById('createForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('cTitle').value;
  const category = document.getElementById('cCategory').value || 'समाचार';
  const type = document.getElementById('cType').value;
  const bodyContent = document.getElementById('cBody').value;
  
  const body = {
    title: title,
    category: category,
    type: type,
    body: bodyContent,
    language: 'hi',
    status: 'published'
  };
  
  try {
    const res = await fetch(`${API}/articles`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(body)
    });
    
    if (res.ok) { 
      e.target.reset(); 
      loadStats(); 
      loadRows(); 
      alert('लेख सफलतापूर्वक जोड़ा गया!');
    } else {
      const error = await res.json();
      alert('त्रुटि: ' + (error.error || 'लेख नहीं जोड़ा जा सका'));
    }
  } catch (error) {
    console.error('Error creating article:', error);
    alert('सर्वर से कनेक्शन विफल। कृपया पुनः प्रयास करें।');
  }
});

document.getElementById('cancelDel').addEventListener('click', () => document.getElementById('modal').classList.add('hidden'));
document.getElementById('confirmDel').addEventListener('click', async () => {
  await fetch(`${API}/articles/${deleteId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  document.getElementById('modal').classList.add('hidden'); loadStats(); loadRows();
});
