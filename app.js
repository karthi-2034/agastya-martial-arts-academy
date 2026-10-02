const STORAGE_KEY = 'agastya-academy-state-v1';

const navItems = [
  { id: 'overview', label: 'Overview', icon: '▣' },
  { id: 'clients', label: 'Clients', icon: '👥' },
  { id: 'attendance', label: 'Attendance', icon: '✓' },
  { id: 'fees', label: 'Fees', icon: '₹' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'reports', label: 'Reports', icon: '📊' },
];

const baseState = {
  activeTab: 'overview',
  clients: [
    { id: 1, name: 'Aarav Sharma', program: 'Muay Thai', batch: 'Evening Elite', status: 'Active', fee: '₹7,500', lastPaid: '2026-10-01' },
    { id: 2, name: 'Diya Nair', program: 'Functional Fitness', batch: '6:00 AM Core', status: 'Active', fee: '₹6,200', lastPaid: '2026-09-25' },
    { id: 3, name: 'Kabir Rao', program: 'Brazilian Jiu-Jitsu', batch: 'Weekday Combat', status: 'Pending', fee: '₹8,000', lastPaid: '2026-08-18' },
    { id: 4, name: 'Meera Patel', program: 'Boxing', batch: 'Saturday Sparring', status: 'Active', fee: '₹5,500', lastPaid: '2026-10-02' },
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
    {
      id: 1,
      title: 'Elite team seminar',
      tag: 'Event',
      body: 'Saturday tactical workshop is scheduled at 9:00 AM. Bring your gloves and hydration kit.',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Fee reminder',
      tag: 'Payment',
      body: 'Kabir Rao has an outstanding payment for October. Kindly clear dues before the next class.',
      time: 'Today',
    },
    {
      id: 3,
      title: 'New youth batch',
      tag: 'Update',
      body: 'A new junior self-defense batch has been added for ages 9–12 every Tuesday evening.',
      time: 'Yesterday',
    },
  ],
  reportCards: [
    { label: 'Members', value: 248, delta: '+8.2%', direction: 'up' },
    { label: 'Class retention', value: '92%', delta: '+3.1%', direction: 'up' },
    { label: 'Fees collected', value: '₹2.4L', delta: '+12.4%', direction: 'up' },
    { label: 'No-shows', value: '11', delta: '-1.4%', direction: 'down' },
  ],
};

const state = loadState();

const pageContent = document.getElementById('pageContent');
const navContainer = document.getElementById('sidebarNav');
const pageTitle = document.getElementById('pageTitle');
const quickAddClientBtn = document.getElementById('quickAddClientBtn');

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return JSON.parse(JSON.stringify(baseState));

  try {
    return { ...JSON.parse(JSON.stringify(baseState)), ...JSON.parse(saved) };
  } catch {
    return JSON.parse(JSON.stringify(baseState));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function renderNav() {
  navContainer.innerHTML = navItems
    .map(
      (item) => `
        <button class="nav-item ${state.activeTab === item.id ? 'active' : ''}" type="button" data-tab="${item.id}">
          <span class="nav-icon">${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `
    )
    .join('');

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeTab = button.dataset.tab;
      saveState();
      render();
    });
  });
}

function renderOverview() {
  pageTitle.textContent = 'Overview';

  const stats = `
    <section class="summary-grid">
      ${state.reportCards
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
      <article class="panel">
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

      <article class="panel">
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

  const actionBlocks = `
    <section class="card-grid">
      <article class="panel">
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

      <article class="panel">
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

  pageContent.innerHTML = `${stats}${chart}${actionBlocks}`;
}

function renderClients() {
  pageTitle.textContent = 'Clients';

  const rows = state.clients
    .map(
      (client) => `
        <tr>
          <td>${client.name}</td>
          <td>${client.program}</td>
          <td>${client.batch}</td>
          <td><span class="badge ${client.status === 'Active' ? 'green' : 'red'}">${client.status}</span></td>
          <td>${client.fee}</td>
          <td>${client.lastPaid}</td>
        </tr>
      `
    )
    .join('');

  pageContent.innerHTML = `
    <section class="list-grid">
      <article class="table-card">
        <div class="panel-header">
          <h3>Client database</h3>
          <span class="stat-mini">${state.clients.length} active profiles</span>
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
                <th>Last payment</th>
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
            <div class="field full">
              <label for="clientNotes">Notes</label>
              <textarea id="clientNotes" name="notes" rows="3" placeholder="Goal, injury notes, or assesssment remarks"></textarea>
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
    const nextId = Date.now();
    const newClient = {
      id: nextId,
      name: formData.get('name'),
      program: formData.get('program'),
      batch: formData.get('batch'),
      status: 'Active',
      fee: formData.get('fee'),
      lastPaid: new Date().toISOString().slice(0, 10),
    };

    state.clients.unshift(newClient);
    saveState();
    render();
  });
}

function renderAttendance() {
  pageTitle.textContent = 'Attendance';

  const rows = state.attendance
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

  pageContent.innerHTML = `
    <section class="list-grid">
      <article class="panel">
        <div class="panel-header">
          <h3>Daily attendance register</h3>
          <span class="stat-mini">2026-10-02</span>
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
      const item = state.attendance.find((entry) => entry.id === id);
      item.status = item.status === 'present' ? 'absent' : 'present';
      saveState();
      render();
    });
  });
}

function renderFees() {
  pageTitle.textContent = 'Fees';

  const generatedReceipt = state.fees[0];
  const subtotal = state.fees.reduce((sum, fee) => sum + (fee.status === 'Paid' ? fee.amount : 0), 0);
  const pending = state.fees.reduce((sum, fee) => sum + (fee.status === 'Pending' ? fee.amount : 0), 0);

  pageContent.innerHTML = `
    <section class="payment-grid">
      <article class="panel">
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
                ${state.clients
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

      <article class="panel">
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
            <div><strong>Receipt</strong><br />#AAM-${generatedReceipt.id.toString().padStart(4, '0')}</div>
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
            ${state.fees
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

    state.fees.unshift({
      id: Date.now(),
      name,
      amount,
      month: 'October 2026',
      status: 'Paid',
      method,
    });

    saveState();
    render();
  });

  document.getElementById('generateReceiptBtn').addEventListener('click', () => {
    const topFee = state.fees[0];
    const receiptCard = document.querySelector('.receipt-box');
    receiptCard.innerHTML = `
      <div class="receipt-head">
        <h4>Agastya Academy</h4>
        <span class="badge gold">${topFee.status}</span>
      </div>
      <div class="receipt-meta">
        <div><strong>Receipt</strong><br />#AAM-${topFee.id.toString().padStart(4, '0')}</div>
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

function renderNotifications() {
  pageTitle.textContent = 'Notifications';

  const list = state.notifications
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
      <article class="panel">
        <div class="panel-header">
          <h3>Communication center</h3>
          <span class="stat-mini">${state.notifications.length} messages</span>
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

    state.notifications.unshift({
      id: Date.now(),
      title,
      tag,
      body,
      time: 'Just now',
    });

    saveState();
    render();
  });
}

function renderReports() {
  pageTitle.textContent = 'Reports';

  pageContent.innerHTML = `
    <section class="card-grid">
      <article class="panel">
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

      <article class="panel">
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

function render() {
  renderNav();

  switch (state.activeTab) {
    case 'overview':
      renderOverview();
      break;
    case 'clients':
      renderClients();
      break;
    case 'attendance':
      renderAttendance();
      break;
    case 'fees':
      renderFees();
      break;
    case 'notifications':
      renderNotifications();
      break;
    case 'reports':
      renderReports();
      break;
    default:
      renderOverview();
  }
}

quickAddClientBtn.addEventListener('click', () => {
  state.activeTab = 'clients';
  saveState();
  render();
});

render();
