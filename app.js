const STORAGE_KEY = 'agastya-premium-dashboard-v2';
const AUTH_KEY = 'agastya-auth-v1';

const navItems = [
  { id: 'overview', label: 'Overview', icon: '▣' },
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'attendance', label: 'Attendance', icon: '✓' },
  { id: 'fees', label: 'Fees', icon: '₹' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'schedule', label: 'Schedule', icon: '🗓️' },
  { id: 'team', label: 'Team', icon: '🏆' },
  { id: 'reports', label: 'Reports', icon: '📊' },
];

const defaultState = {
  activeTab: 'overview',
  clients: [
    { id: 1, name: 'Aarav Sharma', program: 'Muay Thai', batch: 'Evening Elite', status: 'Active', fee: '₹7,500', lastPaid: '2026-10-01', phone: '+91 98765 43210' },
    { id: 2, name: 'Diya Nair', program: 'Functional Fitness', batch: '6:00 AM Core', status: 'Active', fee: '₹6,200', lastPaid: '2026-09-25', phone: '+91 98210 44552' },
    { id: 3, name: 'Kabir Rao', program: 'Brazilian Jiu-Jitsu', batch: 'Weekday Combat', status: 'Pending', fee: '₹8,000', lastPaid: '2026-08-18', phone: '+91 99880 11223' },
    { id: 4, name: 'Meera Patel', program: 'Boxing', batch: 'Saturday Sparring', status: 'Active', fee: '₹5,500', lastPaid: '2026-10-02', phone: '+91 97444 30110' },
    { id: 5, name: 'Rohan Iyer', program: 'Taekwondo', batch: 'Junior Fighters', status: 'Active', fee: '₹4,500', lastPaid: '2026-09-28', phone: '+91 98444 78812' },
  ],
  attendance: [
    { id: 1, name: 'Aarav Sharma', batch: 'Evening Elite', status: 'present' },
    { id: 2, name: 'Diya Nair', batch: '6:00 AM Core', status: 'present' },
    { id: 3, name: 'Kabir Rao', batch: 'Weekday Combat', status: 'absent' },
    { id: 4, name: 'Meera Patel', batch: 'Saturday Sparring', status: 'present' },
    { id: 5, name: 'Rohan Iyer', batch: 'Taekwondo Juniors', status: 'absent' },
  ],
  fees: [
    { id: 1, name: 'Aarav Sharma', amount: 7500, month: 'October 2026', status: 'Paid', method: 'UPI' },
    { id: 2, name: 'Diya Nair', amount: 6200, month: 'October 2026', status: 'Paid', method: 'Card' },
    { id: 3, name: 'Kabir Rao', amount: 8000, month: 'October 2026', status: 'Pending', method: 'Bank Transfer' },
    { id: 4, name: 'Meera Patel', amount: 5500, month: 'October 2026', status: 'Paid', method: 'Cash' },
  ],
  notifications: [
    { id: 1, title: 'Elite team seminar', tag: 'Event', body: 'Saturday tactical workshop scheduled at 9:00 AM. Bring gloves and hydration kit.', time: '2 hours ago' },
    { id: 2, title: 'Fee reminder', tag: 'Payment', body: 'Kabir Rao has an outstanding payment. Kindly clear dues before the next class.', time: 'Today' },
    { id: 3, title: 'New youth batch', tag: 'Update', body: 'A new junior self-defense batch is now live every Tuesday evening.', time: 'Yesterday' },
  ],
  schedule: [
    { id: 1, title: 'Muay Thai Fundamentals', time: '06:00 AM', coach: 'Coach Aiden', room: 'Arena 1', intensity: 'High' },
    { id: 2, title: 'Strength Conditioning', time: '08:30 AM', coach: 'Coach Sia', room: 'Gym Floor', intensity: 'Medium' },
    { id: 3, title: 'BJJ Combat Lab', time: '06:30 PM', coach: 'Coach Arjun', room: 'Combat Studio', intensity: 'High' },
    { id: 4, title: 'Kids Taekwondo', time: '05:00 PM', coach: 'Coach Riya', room: 'Blue Hall', intensity: 'Low' },
  ],
  team: [
    { name: 'Coach Aiden', role: 'Head Muay Thai', focus: 'Elite striking', rating: '4.9' },
    { name: 'Coach Sia', role: 'Strength Coach', focus: 'Performance fitness', rating: '4.8' },
    { name: 'Coach Arjun', role: 'BJJ Specialist', focus: 'Combat systems', rating: '4.9' },
    { name: 'Coach Riya', role: 'Youth Mentor', focus: 'Discipline & mobility', rating: '4.7' },
  ],
  reportCards: [
    { label: 'Members', value: 248, delta: '+8.2%', direction: 'up' },
    { label: 'Class retention', value: '92%', delta: '+3.1%', direction: 'up' },
    { label: 'Fees collected', value: '₹2.4L', delta: '+12.4%', direction: 'up' },
    { label: 'No-shows', value: '11', delta: '-1.4%', direction: 'down' },
  ],
};

const appStore = loadState();

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return JSON.parse(JSON.stringify(defaultState));

  try {
    return { ...JSON.parse(JSON.stringify(defaultState)), ...JSON.parse(saved) };
  } catch {
    return JSON.parse(JSON.stringify(defaultState));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appStore));
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || 'false');
  } catch {
    return false;
  }
}

function setUser(flag) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(flag));
}

function currency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function renderAuthScreen() {
  document.body.innerHTML = `
    <div class="auth-screen">
      <div class="auth-panel">
        <div class="auth-header">
          <div class="brand-mark auth-mark">A</div>
          <div>
            <p class="eyebrow">Agastya</p>
            <h1>Martial Arts & Fitness Academy</h1>
          </div>
        </div>

        <div class="auth-copy">
          <h2>Executive Control Room</h2>
          <p>Luxury academy operations for coaching, attendance, payment, and member performance.</p>
        </div>

        <form id="authForm" class="auth-form">
          <div class="field">
            <label for="username">Username</label>
            <input id="username" name="username" type="text" placeholder="agastya" required />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>
          <div class="auth-meta">
            <span>Demo access</span>
            <strong>admin / agastya123</strong>
          </div>
          <button class="primary-btn auth-btn" type="submit">Enter dashboard</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('authForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username')).trim().toLowerCase();
    const password = String(formData.get('password')).trim();

    if ((username === 'admin' || username === 'agastya' || username === 'director') && password === 'agastya123') {
      setUser(true);
      renderDashboard();
      return;
    }

    const failed = document.querySelector('.auth-meta');
    failed.innerHTML = '<span style="color:#ffb0ae">Invalid access</span><strong>Try admin / agastya123</strong>';
  });
}

function renderDashboard() {
  document.body.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand-block">
          <div class="brand-mark">A</div>
          <div>
            <p class="eyebrow">Ascend with discipline</p>
            <h1>Agastya</h1>
          </div>
        </div>

        <div class="brand-subtitle">
          Martial Arts & Fitness Academy
        </div>

        <nav id="sidebarNav" class="sidebar-nav" aria-label="Main navigation"></nav>

        <div class="sidebar-footer">
          <div class="profile-pill">
            <span class="profile-dot"></span>
            Director access
          </div>
          <button id="logoutBtn" class="ghost-btn full" type="button">Logout</button>
        </div>
      </aside>

      <main class="main-panel">
        <header class="topbar">
          <div>
            <p class="topbar-label">Coaching dashboard</p>
            <h2 id="pageTitle">Overview</h2>
          </div>
          <div class="topbar-actions">
            <button class="ghost-btn" id="exportBtn" type="button">Export</button>
            <button class="primary-btn" type="button" id="quickAddClientBtn">+ New Client</button>
          </div>
        </header>

        <section id="pageContent" class="page-content"></section>
      </main>
    </div>
  `;

  renderNav();
  renderCurrentTab();

  document.getElementById('logoutBtn').addEventListener('click', () => {
    setUser(false);
    renderAuthScreen();
  });

  document.getElementById('quickAddClientBtn').addEventListener('click', () => {
    appStore.activeTab = 'clients';
    saveState();
    renderCurrentTab();
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    const today = new Date().toISOString().slice(0, 10);
    const data = JSON.stringify({ exportedAt: today, academy: 'Agastya Martial Arts & Fitness Academy', summary: appStore }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'agastya-academy-export.json';
    anchor.click();
    URL.revokeObjectURL(url);
  });
}

function renderNav() {
  const navContainer = document.getElementById('sidebarNav');
  navContainer.innerHTML = navItems
    .map(
      (item) => `
        <button class="nav-item ${appStore.activeTab === item.id ? 'active' : ''}" type="button" data-tab="${item.id}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `
    )
    .join('');

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      appStore.activeTab = button.dataset.tab;
      saveState();
      renderCurrentTab();
    });
  });
}

function renderCurrentTab() {
  const pageTitle = document.getElementById('pageTitle');
  const pageContent = document.getElementById('pageContent');

  switch (appStore.activeTab) {
    case 'clients':
      pageTitle.textContent = 'Clients';
      renderClients(pageContent);
      break;
    case 'attendance':
      pageTitle.textContent = 'Attendance';
      renderAttendance(pageContent);
      break;
    case 'fees':
      pageTitle.textContent = 'Fees';
      renderFees(pageContent);
      break;
    case 'notifications':
      pageTitle.textContent = 'Notifications';
      renderNotifications(pageContent);
      break;
    case 'schedule':
      pageTitle.textContent = 'Schedule';
      renderSchedule(pageContent);
      break;
    case 'team':
      pageTitle.textContent = 'Team';
      renderTeam(pageContent);
      break;
    case 'reports':
      pageTitle.textContent = 'Reports';
      renderReports(pageContent);
      break;
    case 'overview':
    default:
      pageTitle.textContent = 'Overview';
      renderOverview(pageContent);
      break;
  }

  renderNav();
}

function renderOverview(pageContent) {
  const stats = `
    <section class="summary-grid">
      ${appStore.reportCards
        .map(
          (card) => `
            <article class="stat-card">
              <div class="stat-label">${card.label}</div>
              <div class="stat-value">
                <strong>${card.value}</strong>
                <span class="delta ${card.direction === 'up' ? 'up' : 'down'}">${card.delta}</span>
              </div>
            </article>
          `
        )
        .join('')}
    </section>
  `;

  const chart = `
    <section class="metrics-grid">
      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Class attendance trend</h3>
          <span class="stat-mini">This month</span>
        </div>
        <div class="chart-bars">
          ${[
            { label: 'M', value: 68 },
            { label: 'T', value: 77 },
            { label: 'W', value: 86 },
            { label: 'T', value: 92 },
            { label: 'F', value: 89 },
            { label: 'S', value: 98 },
            { label: 'S', value: 83 },
          ]
            .map(
              (bar) => `
                <div class="bar-column">
                  <div class="bar" style="height: ${bar.value}%"></div>
                  <span class="bar-label">${bar.label}</span>
                </div>
              `
            )
            .join('')}
        </div>
      </article>

      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Top programs</h3>
          <span class="stat-mini">Live</span>
        </div>
        <ul class="tiny-list">
          <li><span class="label">Muay Thai</span><span class="value">78 members</span></li>
          <li><span class="label">BJJ</span><span class="value">54 members</span></li>
          <li><span class="label">Strength</span><span class="value">61 members</span></li>
          <li><span class="label">Boxing</span><span class="value">41 members</span></li>
        </ul>
      </article>
    </section>
  `;

  const highlights = `
    <section class="card-grid">
      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Coach focus</h3>
          <span class="stat-mini">Today</span>
        </div>
        <div class="pill-row">
          <span class="pill">Power training</span>
          <span class="pill">Sparring drills</span>
          <span class="pill">Mobility</span>
          <span class="pill">Conditioning</span>
        </div>
      </article>

      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Facility status</h3>
          <span class="stat-mini">Operational</span>
        </div>
        <ul class="tiny-list">
          <li><span class="label">Mats</span><span class="value">Ready</span></li>
          <li><span class="label">Weights</span><span class="value">Filtered</span></li>
          <li><span class="label">Lighting</span><span class="value">Optimal</span></li>
        </ul>
      </article>
    </section>
  `;

  const membershipCards = `
    <section class="premium-grid">
      <article class="luxury-card">
        <div class="luxury-label">Premium client club</div>
        <h3>Silver, Gold & Black Belt memberships</h3>
        <p>Offer VIP perks, private training, diet guidance, and priority event access.</p>
        <button class="primary-btn" type="button">Manage plans</button>
      </article>

      <article class="luxury-card highlight">
        <div class="luxury-label">Next up</div>
        <h3>Championship prep camp</h3>
        <p>14 elite athletes selected for the national conditioning camp this weekend.</p>
        <button class="secondary-btn" type="button">View schedule</button>
      </article>
    </section>
  `;

  pageContent.innerHTML = `${stats}${chart}${highlights}${membershipCards}`;
}

function renderClients(pageContent) {
  const rows = appStore.clients
    .map(
      (client) => `
        <tr>
          <td>${client.name}</td>
          <td>${client.program}</td>
          <td>${client.batch}</td>
          <td><span class="badge ${client.status === 'Active' ? 'green' : 'red'}">${client.status}</span></td>
          <td>${client.fee}</td>
          <td>${client.phone}</td>
        </tr>
      `
    )
    .join('');

  pageContent.innerHTML = `
    <section class="list-grid">
      <article class="table-card">
        <div class="panel-header">
          <h3>Client database</h3>
          <span class="stat-mini">${appStore.clients.length} active profiles</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Program</th>
                <th>Batch</th>
                <th>Status</th>
                <th>Fee</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </article>

      <article class="form-card">
        <h3>Add new client</h3>
        <form id="clientForm">
          <div class="form-grid">
            <div class="field">
              <label for="clientName">Name</label>
              <input id="clientName" name="name" type="text" placeholder="Full name" required />
            </div>
            <div class="field">
              <label for="clientProgram">Program</label>
              <select id="clientProgram" name="program">
                <option>Muay Thai</option>
                <option>Brazilian Jiu-Jitsu</option>
                <option>Boxing</option>
                <option>Functional Fitness</option>
                <option>Taekwondo</option>
              </select>
            </div>
            <div class="field">
              <label for="clientBatch">Batch</label>
              <input id="clientBatch" name="batch" type="text" placeholder="Evening Elite" required />
            </div>
            <div class="field">
              <label for="clientFee">Monthly fee</label>
              <input id="clientFee" name="fee" type="text" placeholder="₹7,500" required />
            </div>
            <div class="field">
              <label for="clientPhone">Phone</label>
              <input id="clientPhone" name="phone" type="text" placeholder="+91 98765 43210" required />
            </div>
            <div class="field full">
              <label for="clientNotes">Notes</label>
              <textarea id="clientNotes" name="notes" rows="3" placeholder="Goal, injury notes, or assessment remarks"></textarea>
            </div>
          </div>
          <div class="inline-actions">
            <button class="secondary-btn" type="reset">Reset</button>
            <button class="primary-btn" type="submit">Save client</button>
          </div>
        </form>
      </article>
    </section>
  `;

  document.getElementById('clientForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    appStore.clients.unshift({
      id: Date.now(),
      name: String(formData.get('name')).trim(),
      program: String(formData.get('program')).trim(),
      batch: String(formData.get('batch')).trim(),
      status: 'Active',
      fee: String(formData.get('fee')).trim(),
      phone: String(formData.get('phone')).trim(),
      lastPaid: new Date().toISOString().slice(0, 10),
    });
    saveState();
    renderCurrentTab();
  });
}

function renderAttendance(pageContent) {
  const rows = appStore.attendance
    .map(
      (entry) => `
        <div class="attendance-item">
          <div>
            <div class="person-name">${entry.name}</div>
            <div class="person-meta">${entry.batch}</div>
          </div>
          <div>
            <span class="badge ${entry.status === 'present' ? 'green' : 'red'}">${entry.status === 'present' ? 'Present' : 'Absent'}</span>
          </div>
          <button class="toggle-presence ${entry.status === 'present' ? 'present' : 'absent'}" data-id="${entry.id}">
            ${entry.status === 'present' ? 'Mark absent' : 'Mark present'}
          </button>
        </div>
      `
    )
    .join('');

  const presentCount = appStore.attendance.filter((item) => item.status === 'present').length;
  const absentCount = appStore.attendance.length - presentCount;

  pageContent.innerHTML = `
    <section class="list-grid">
      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Daily attendance register</h3>
          <span class="stat-mini">2026-10-02</span>
        </div>
        <div class="attendance-summary-row">
          <div class="summary-tile">
            <span>Present</span>
            <strong>${presentCount}</strong>
          </div>
          <div class="summary-tile warning">
            <span>Absent</span>
            <strong>${absentCount}</strong>
          </div>
        </div>
        <div class="attendance-list">${rows}</div>
      </article>

      <article class="form-card">
        <h3>Quick attendance notes</h3>
        <div class="form-grid">
          <div class="field full">
            <label for="attendanceDate">Date</label>
            <input id="attendanceDate" type="date" value="2026-10-02" />
          </div>
          <div class="field full">
            <label for="attendanceSummary">Coach note</label>
            <textarea id="attendanceSummary" rows="5" placeholder="Session summary, improvements, or standout moments"></textarea>
          </div>
        </div>
        <div class="inline-actions">
          <button class="secondary-btn" type="button">Save notes</button>
          <button class="primary-btn" type="button">Submit register</button>
        </div>
      </article>
    </section>
  `;

  document.querySelectorAll('.toggle-presence').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      const item = appStore.attendance.find((entry) => entry.id === id);
      item.status = item.status === 'present' ? 'absent' : 'present';
      saveState();
      renderCurrentTab();
    });
  });
}

function renderFees(pageContent) {
  const generatedReceipt = appStore.fees[0] || { id: 1, name: 'Agastya Academy', amount: 0, month: 'Current Month', status: 'Paid', method: 'UPI' };
  const subtotal = appStore.fees.reduce((sum, fee) => sum + (fee.status === 'Paid' ? fee.amount : 0), 0);
  const pending = appStore.fees.reduce((sum, fee) => sum + (fee.status === 'Pending' ? fee.amount : 0), 0);

  pageContent.innerHTML = `
    <section class="payment-grid">
      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Fee payment gateway</h3>
          <span class="stat-mini">Secure transactions</span>
        </div>

        <div class="fee-summary">
          <div class="summary-box">
            <span class="stat-label">Collected this month</span>
            <strong>${currency(subtotal)}</strong>
          </div>
          <div class="summary-box">
            <span class="stat-label">Pending balance</span>
            <strong>${currency(pending)}</strong>
          </div>
        </div>

        <form id="paymentForm" style="margin-top: 18px;">
          <div class="form-grid">
            <div class="field">
              <label for="payeeName">Client</label>
              <select id="payeeName">
                ${appStore.clients
                  .map((client) => `<option value="${client.name}">${client.name}</option>`)
                  .join('')}
              </select>
            </div>
            <div class="field">
              <label for="payeePlan">Program</label>
              <select id="payeePlan">
                <option>Monthly membership</option>
                <option>Premium combat pass</option>
                <option>Strength + conditioning</option>
              </select>
            </div>
            <div class="field">
              <label for="payeeAmount">Amount</label>
              <input id="payeeAmount" type="number" value="7500" />
            </div>
            <div class="field">
              <label for="paymentMethod">Method</label>
              <select id="paymentMethod">
                <option>UPI</option>
                <option>Card</option>
                <option>Net Banking</option>
                <option>Cash</option>
              </select>
            </div>
          </div>
          <div class="inline-actions">
            <button class="ghost-btn" type="button">Save draft</button>
            <button class="primary-btn" type="submit">Process payment</button>
          </div>
        </form>
      </article>

      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Receipt preview</h3>
          <button class="secondary-btn" type="button" id="generateReceiptBtn">Generate</button>
        </div>
        <div class="receipt-box">
          <div class="receipt-head">
            <h4>Agastya Academy</h4>
            <span class="badge gold">${generatedReceipt.status}</span>
          </div>
          <div class="receipt-meta">
            <div><strong>Receipt</strong><br />#AAM-${String(generatedReceipt.id).padStart(4, '0')}</div>
            <div><strong>Date</strong><br />${new Date().toISOString().slice(0, 10)}</div>
            <div><strong>Client</strong><br />${generatedReceipt.name}</div>
            <div><strong>Month</strong><br />${generatedReceipt.month}</div>
          </div>
          <div class="receipt-total">
            <span>Total Paid</span>
            <span>${currency(generatedReceipt.amount)}</span>
          </div>
        </div>
      </article>
    </section>

    <section class="table-card">
      <div class="panel-header">
        <h3>Payment ledger</h3>
        <span class="stat-mini">Recent transactions</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Month</th>
              <th>Method</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${appStore.fees
              .map(
                (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.month}</td>
                    <td>${item.method}</td>
                    <td><span class="badge ${item.status === 'Paid' ? 'green' : 'red'}">${item.status}</span></td>
                    <td>${currency(item.amount)}</td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;

  document.getElementById('paymentForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('payeeName').value;
    const amount = Number(document.getElementById('payeeAmount').value || 0);
    const method = document.getElementById('paymentMethod').value;

    appStore.fees.unshift({
      id: Date.now(),
      name,
      amount,
      month: 'October 2026',
      status: 'Paid',
      method,
    });

    saveState();
    renderCurrentTab();
  });

  document.getElementById('generateReceiptBtn').addEventListener('click', () => {
    const topFee = appStore.fees[0];
    const receiptCard = document.querySelector('.receipt-box');
    receiptCard.innerHTML = `
      <div class="receipt-head">
        <h4>Agastya Academy</h4>
        <span class="badge gold">${topFee.status}</span>
      </div>
      <div class="receipt-meta">
        <div><strong>Receipt</strong><br />#AAM-${String(topFee.id).padStart(4, '0')}</div>
        <div><strong>Date</strong><br />${new Date().toISOString().slice(0, 10)}</div>
        <div><strong>Client</strong><br />${topFee.name}</div>
        <div><strong>Method</strong><br />${topFee.method}</div>
      </div>
      <div class="receipt-total">
        <span>Total Paid</span>
        <span>${currency(topFee.amount)}</span>
      </div>
    `;
  });
}

function renderNotifications(pageContent) {
  const list = appStore.notifications
    .map(
      (note) => `
        <article class="notification-item">
          <div class="notification-topline">
            <strong>${note.title}</strong>
            <span class="notification-tag">${note.tag}</span>
          </div>
          <p>${note.body}</p>
          <div class="person-meta" style="margin-top: 12px;">${note.time}</div>
        </article>
      `
    )
    .join('');

  pageContent.innerHTML = `
    <section class="list-grid">
      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Communication center</h3>
          <span class="stat-mini">${appStore.notifications.length} messages</span>
        </div>
        <div class="notification-list">${list}</div>
      </article>

      <article class="form-card">
        <h3>Send announcement</h3>
        <form id="notificationForm">
          <div class="form-grid">
            <div class="field">
              <label for="notifyTitle">Title</label>
              <input id="notifyTitle" type="text" placeholder="Seminar / Payment reminder" required />
            </div>
            <div class="field">
              <label for="notifyTag">Category</label>
              <select id="notifyTag">
                <option>Event</option>
                <option>Payment</option>
                <option>Update</option>
                <option>Achievement</option>
              </select>
            </div>
            <div class="field full">
              <label for="notifyBody">Message</label>
              <textarea id="notifyBody" rows="5" placeholder="Share your message to the academy members" required></textarea>
            </div>
          </div>
          <div class="inline-actions">
            <button class="secondary-btn" type="reset">Clear</button>
            <button class="primary-btn" type="submit">Broadcast</button>
          </div>
        </form>
      </article>
    </section>
  `;

  document.getElementById('notificationForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('notifyTitle').value.trim();
    const tag = document.getElementById('notifyTag').value;
    const body = document.getElementById('notifyBody').value.trim();

    if (!title || !body) return;

    appStore.notifications.unshift({
      id: Date.now(),
      title,
      tag,
      body,
      time: 'Just now',
    });

    saveState();
    renderCurrentTab();
  });
}

function renderSchedule(pageContent) {
  const scheduleRows = appStore.schedule
    .map(
      (session) => `
        <tr>
          <td>${session.title}</td>
          <td>${session.time}</td>
          <td>${session.coach}</td>
          <td>${session.room}</td>
          <td><span class="badge ${session.intensity === 'High' ? 'red' : session.intensity === 'Medium' ? 'gold' : 'green'}">${session.intensity}</span></td>
        </tr>
      `
    )
    .join('');

  pageContent.innerHTML = `
    <section class="list-grid">
      <article class="table-card">
        <div class="panel-header">
          <h3>Class schedule</h3>
          <span class="stat-mini">Weekly setup</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Session</th>
                <th>Time</th>
                <th>Coach</th>
                <th>Room</th>
                <th>Intensity</th>
              </tr>
            </thead>
            <tbody>${scheduleRows}</tbody>
          </table>
        </div>
      </article>

      <article class="form-card">
        <h3>Add new session</h3>
        <form id="sessionForm">
          <div class="form-grid">
            <div class="field full">
              <label for="sessionTitle">Session title</label>
              <input id="sessionTitle" type="text" placeholder="Combat conditioning" required />
            </div>
            <div class="field">
              <label for="sessionTime">Time</label>
              <input id="sessionTime" type="text" placeholder="06:30 AM" required />
            </div>
            <div class="field">
              <label for="sessionCoach">Coach</label>
              <input id="sessionCoach" type="text" placeholder="Coach name" required />
            </div>
            <div class="field">
              <label for="sessionRoom">Room</label>
              <input id="sessionRoom" type="text" placeholder="Arena 2" required />
            </div>
            <div class="field">
              <label for="sessionIntensity">Intensity</label>
              <select id="sessionIntensity">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div class="inline-actions">
            <button class="secondary-btn" type="reset">Reset</button>
            <button class="primary-btn" type="submit">Save session</button>
          </div>
        </form>
      </article>
    </section>
  `;

  document.getElementById('sessionForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('sessionTitle').value.trim();
    const time = document.getElementById('sessionTime').value.trim();
    const coach = document.getElementById('sessionCoach').value.trim();
    const room = document.getElementById('sessionRoom').value.trim();
    const intensity = document.getElementById('sessionIntensity').value;

    if (!title || !time || !coach || !room) return;

    appStore.schedule.unshift({
      id: Date.now(),
      title,
      time,
      coach,
      room,
      intensity,
    });

    saveState();
    renderCurrentTab();
  });
}

function renderTeam(pageContent) {
  const cards = appStore.team
    .map(
      (member) => `
        <article class="team-card">
          <div class="team-avatar">${member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</div>
          <h3>${member.name}</h3>
          <div class="team-role">${member.role}</div>
          <p>${member.focus}</p>
          <div class="team-rating">★ ${member.rating}</div>
        </article>
      `
    )
    .join('');

  pageContent.innerHTML = `
    <section class="team-grid">
      ${cards}
    </section>
  `;
}

function renderReports(pageContent) {
  pageContent.innerHTML = `
    <section class="card-grid">
      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Academy snapshot</h3>
          <span class="stat-mini">Quarterly</span>
        </div>
        <ul class="tiny-list">
          <li><span class="label">New enrollments</span><span class="value">32</span></li>
          <li><span class="label">Avg. class attendance</span><span class="value">89%</span></li>
          <li><span class="label">Member churn</span><span class="value">4.2%</span></li>
          <li><span class="label">Average revenue</span><span class="value">₹1.2L</span></li>
        </ul>
      </article>

      <article class="panel premium-panel">
        <div class="panel-header">
          <h3>Upcoming milestones</h3>
          <span class="stat-mini">Planner</span>
        </div>
        <ul class="tiny-list">
          <li><span class="label">National level prep</span><span class="value">12 Nov</span></li>
          <li><span class="label">Fitness challenge</span><span class="value">18 Nov</span></li>
          <li><span class="label">Open seminar</span><span class="value">24 Nov</span></li>
          <li><span class="label">Anniversary event</span><span class="value">30 Nov</span></li>
        </ul>
      </article>
    </section>
  `;
}

if (getUser()) {
  renderDashboard();
} else {
  renderAuthScreen();
}
