// Backend API URL
const API = 'https://jaldhara-rajsthan-ma2b.onrender.com/api';

let token = localStorage.getItem('token');
let deleteId = null;
let quill = null;
let selectedImageFile = null;

const loginView = document.getElementById('loginView');
const dashView  = document.getElementById('dashView');

/* ── Show/Hide Views ── */
function showDash()  { loginView.classList.add('hidden');  dashView.classList.remove('hidden'); initQuill(); loadStats(); loadRows(); }
function showLogin() { dashView.classList.add('hidden');   loginView.classList.remove('hidden'); }

if (token) showDash(); else showLogin();

/* ── Init Quill Rich Text Editor ── */
function initQuill() {
  if (quill) return; // already initialized
  quill = new Quill('#quillEditor', {
    theme: 'snow',
    placeholder: 'यहाँ लेख लिखें... टेक्स्ट के साथ चित्र भी जोड़ सकते हैं।',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['blockquote'],
        ['link', 'image'],   // image button inside editor
        ['clean']
      ]
    }
  });

  // Handle image insertion inside editor via URL or base64
  const toolbar = quill.getModule('toolbar');
  toolbar.addHandler('image', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', e.target.result);
        quill.setSelection(range.index + 1);
      };
      reader.readAsDataURL(file);
    };
  });
}

/* ── Featured Image Upload ── */
document.getElementById('featuredImage').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  selectedImageFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById('imagePreview');
    const placeholder = document.getElementById('uploadPlaceholder');
    const removeBtn = document.getElementById('removeImage');
    preview.src = e.target.result;
    preview.classList.remove('hidden');
    placeholder.classList.add('hidden');
    removeBtn.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

document.getElementById('removeImage').addEventListener('click', () => {
  selectedImageFile = null;
  document.getElementById('featuredImage').value = '';
  document.getElementById('imagePreview').classList.add('hidden');
  document.getElementById('uploadPlaceholder').classList.remove('hidden');
  document.getElementById('removeImage').classList.add('hidden');
});

// Drag & drop on upload area
const uploadArea = document.getElementById('uploadArea');
uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.style.borderColor = 'var(--accent)'; });
uploadArea.addEventListener('dragleave', () => { uploadArea.style.borderColor = ''; });
uploadArea.addEventListener('drop', e => {
  e.preventDefault();
  uploadArea.style.borderColor = '';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const dt = new DataTransfer();
    dt.items.add(file);
    document.getElementById('featuredImage').files = dt.files;
    document.getElementById('featuredImage').dispatchEvent(new Event('change'));
  }
});

/* ── Login ── */
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorEl  = document.getElementById('loginErr');
  errorEl.textContent = '';
  try {
    const res  = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) { errorEl.textContent = data.error || 'गलत ईमेल या पासवर्ड'; return; }
    token = data.token;
    localStorage.setItem('token', token);
    document.getElementById('who').textContent = data.user.name;
    showDash();
  } catch {
    errorEl.textContent = 'सर्वर से कनेक्शन विफल।';
  }
});

/* ── Logout ── */
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token'); token = null; showLogin();
});

/* ── Load Stats ── */
async function loadStats() {
  try {
    const res = await fetch(`${API}/articles/admin/stats`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 401) { localStorage.removeItem('token'); showLogin(); return; }
    const s = await res.json();
    document.getElementById('sArticles').textContent = s.articles  || 0;
    document.getElementById('sVlogs').textContent    = s.vlogs     || 0;
    document.getElementById('sCats').textContent     = s.categories|| 0;
  } catch { /* silent */ }
}

/* ── Load Articles Table ── */
async function loadRows() {
  try {
    const res      = await fetch(`${API}/articles`);
    const articles = await res.json();
    if (!articles.length) {
      document.getElementById('rows').innerHTML = '<tr><td colspan="4" style="text-align:center;padding:20px;color:#888;">अभी कोई लेख नहीं। ऊपर से जोड़ें।</td></tr>';
      return;
    }
    document.getElementById('rows').innerHTML = articles.map(a => `
      <tr>
        <td>${a.title}</td>
        <td><span style="background:#eaf0fc;color:#3b6fd4;padding:2px 8px;border-radius:20px;font-size:13px;">${a.category || 'समाचार'}</span></td>
        <td class="${a.status === 'published' ? 'status-pub' : 'status-draft'}">${a.status === 'published' ? '✅ प्रकाशित' : '📝 ड्राफ्ट'}</td>
        <td>
          <button class="act" title="देखें" onclick="window.open('../frontend/article.html?id=${a._id}','_blank')">👁</button>
          <button class="act del" title="हटाएं" data-id="${a._id}">🗑</button>
        </td>
      </tr>`).join('');
    document.querySelectorAll('.act.del').forEach(b => b.addEventListener('click', () => {
      deleteId = b.dataset.id;
      document.getElementById('modal').classList.remove('hidden');
    }));
  } catch {
    document.getElementById('rows').innerHTML = '<tr><td colspan="4" style="text-align:center;color:red;padding:16px;">लेख लोड करने में त्रुटि।</td></tr>';
  }
}

/* ── Create Article ── */
document.getElementById('createForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msgEl = document.getElementById('formMsg');
  msgEl.textContent = '⏳ प्रकाशित हो रहा है...';
  msgEl.className = 'form-msg';

  const title    = document.getElementById('cTitle').value.trim();
  const category = document.getElementById('cCategory').value.trim() || 'समाचार';
  const type     = document.getElementById('cType').value;
  const body     = quill.root.innerHTML;  // Gets HTML with text + embedded images

  if (!title) { msgEl.textContent = '❌ शीर्षक आवश्यक है।'; msgEl.className = 'form-msg error'; return; }
  if (!quill.getText().trim()) { msgEl.textContent = '❌ सामग्री आवश्यक है।'; msgEl.className = 'form-msg error'; return; }

  try {
    // Use FormData to support featured image upload
    const formData = new FormData();
    formData.append('title',    title);
    formData.append('category', category);
    formData.append('type',     type);
    formData.append('body',     body);
    formData.append('language', 'hi');
    formData.append('status',   'published');
    if (selectedImageFile) formData.append('image', selectedImageFile);

    const res = await fetch(`${API}/articles`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    if (res.ok) {
      msgEl.textContent = '✅ लेख सफलतापूर्वक प्रकाशित हुआ!';
      msgEl.className = 'form-msg success';
      // Reset form
      e.target.reset();
      quill.setText('');
      selectedImageFile = null;
      document.getElementById('imagePreview').classList.add('hidden');
      document.getElementById('uploadPlaceholder').classList.remove('hidden');
      document.getElementById('removeImage').classList.add('hidden');
      loadStats();
      loadRows();
      setTimeout(() => { msgEl.textContent = ''; }, 3000);
    } else {
      const err = await res.json();
      msgEl.textContent = '❌ त्रुटि: ' + (err.error || 'लेख नहीं जोड़ा जा सका');
      msgEl.className = 'form-msg error';
    }
  } catch {
    msgEl.textContent = '❌ सर्वर से कनेक्शन विफल। पुनः प्रयास करें।';
    msgEl.className = 'form-msg error';
  }
});

/* ── Delete Article ── */
document.getElementById('cancelDel').addEventListener('click',  () => document.getElementById('modal').classList.add('hidden'));
document.getElementById('confirmDel').addEventListener('click', async () => {
  try {
    await fetch(`${API}/articles/${deleteId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    document.getElementById('modal').classList.add('hidden');
    loadStats();
    loadRows();
  } catch { alert('हटाने में त्रुटि।'); }
});
