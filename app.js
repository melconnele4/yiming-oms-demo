// === Main App Controller ===

// Breadcrumb mapping
const PAGE_NAMES = {
  'dashboard': '工作台', 'order-review': '订单审核', 'order-create': '订单新建',
  'order-query': '订单查询', 'order-transfer': '订单调货',
  'rule-deadline': '截止时间规则', 'rule-gift': '附赠品规则',
  'rule-bom': '组合商品BOM', 'rule-noorder': '不可要货规则', 'rule-urgent': '紧急加单数量',
  'rule-transfer': '调货规则', 'rule-audit': '定时审核规则', 'rule-split': '物流拆单分类',
  'rule-store': '奶吧开闭店', 'monitor': '订单监控', 'reports': '报表查询',
  'messages': '消息通知', 'log-operation': '操作日志', 'log-system': '系统日志',
  'settings': '系统管理',
  'settings-user': '用户管理', 'settings-role': '角色管理', 'settings-menu': '菜单管理',
  'settings-baseinfo': '基础信息管理', 'settings-assoc': '关联规则管理', 'settings-master': '主数据管理'
};
const PAGE_SECTIONS = {
  'dashboard': '首页', 'order-review': '业务管理', 'order-create': '业务管理',
  'order-query': '业务管理', 'order-transfer': '业务管理',
  'rule-deadline': '后台管理', 'rule-gift': '后台管理',
  'rule-bom': '后台管理', 'rule-noorder': '后台管理', 'rule-urgent': '后台管理',
  'rule-transfer': '后台管理', 'rule-audit': '后台管理', 'rule-split': '后台管理',
  'rule-store': '后台管理', 'monitor': '数据中心', 'reports': '数据中心',
  'messages': '数据中心', 'log-operation': '日志管理', 'log-system': '日志管理',
  'settings': '系统设置',
  'settings-user': '系统设置', 'settings-role': '系统设置', 'settings-menu': '系统设置',
  'settings-baseinfo': '系统设置', 'settings-assoc': '系统设置', 'settings-master': '系统设置'
};

// Login
function handleLogin(e) {
  e.preventDefault();
  const page = document.getElementById('login-page');
  page.classList.add('hiding');
  setTimeout(() => {
    page.style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    navigateTo('dashboard', document.querySelector('[data-page="dashboard"]'));
  }, 500);
}

function handleLogout() {
  document.getElementById('app').style.display = 'none';
  const page = document.getElementById('login-page');
  page.style.display = 'flex';
  page.classList.remove('hiding');
  showToast('info', '已安全退出系统');
}

// Navigation
function navigateTo(pageId, el) {
  if (el) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
  }
  document.getElementById('breadcrumb').innerHTML =
    `<span>${PAGE_SECTIONS[pageId]||'首页'}</span><span class="separator">›</span><span class="current">${PAGE_NAMES[pageId]||pageId}</span>`;

  const container = document.getElementById('page-content');
  const renderers = {
    'dashboard': renderDashboard, 'order-review': renderOrderReview,
    'order-create': renderOrderCreate, 'order-query': renderOrderQuery,
    'rule-deadline': renderRuleDeadline, 'rule-gift': renderRuleGift,
    'rule-bom': renderRuleBom, 'rule-noorder': renderRuleNoOrder,
    'rule-urgent': renderRuleUrgent, 'rule-transfer': renderRuleTransfer,
    'rule-audit': renderRuleAutoAudit, 'rule-split': renderRuleSplit,
    'rule-store': renderRuleStore, 'order-transfer': renderOrderTransfer,
    'monitor': renderMonitor, 'reports': renderReports,
    'messages': renderMessages, 'log-operation': renderLogOperation,
    'log-system': renderLogSystem, 'settings': renderSettings,
    'settings-user': renderUserManage, 'settings-role': renderRoleManage,
    'settings-menu': renderMenuManage, 'settings-baseinfo': renderBaseInfoManage,
    'settings-assoc': renderAssocRuleManage, 'settings-master': renderMasterDataManage,
  };
  container.innerHTML = (renderers[pageId] || renderDashboard)();
  container.scrollTop = 0;
  return false;
}

// Sidebar toggle
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

// Toast
function showToast(type, message) {
  const icons = {
    success: '<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
    info: '<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>',
    warning: '<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
    danger: '<svg viewBox="0 0 20 20" fill="currentColor" class="toast-icon"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
  };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type]||icons.info}<span class="toast-text">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, 3000);
}

// Modal
function openRuleModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>选择区域编码 <span class="required">*</span></label><select class="form-control"><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select></div>
    <div class="form-field"><label>选择销售地区编码</label><select class="form-control"><option value="">全部</option><option>N00001-奶茶事业部杭州区</option><option>W00001-温州区销售组织</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>选择客户编码</label><select class="form-control"><option value="">全部</option><option>N1001-染墨青茶肆萧山奥体印象城店</option><option>N1002-染墨青茶肆国大店</option></select></div>
    <div class="form-field"><label>选择物料编码</label><select class="form-control"><option value="">全部</option><option>400293-DIY酸奶</option><option>400330-巧克力富力亚</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>提前天数 <span class="required">*</span></label><input class="form-control" type="number" value="2" min="0"></div>
    <div class="form-field"><label>截止时间 <span class="required">*</span></label><input class="form-control" type="time" value="15:00"></div></div>
    <div class="form-row single"><div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
}

// Table helpers
function toggleAll(master) {
  document.querySelectorAll('.row-check').forEach(cb => cb.checked = master.checked);
}

function approveOrder(id) {
  showToast('success', `订单 ${id} 审核成功`);
}

function showOrderDetail(id) {
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];
  document.getElementById('modal-title').textContent = `订单详情 - ${order.id}`;
  document.getElementById('modal-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:0.85rem">
      ${[['订单编号',order.id],['客户编码',order.cust],['客户名称',order.custName],['区域',order.areaName],
        ['订单类型',order.typeName],['订单状态',`<span class="status-badge ${statusClass(order.status)}">${order.status}</span>`],
        ['业务员',order.user],['下单日期',order.date],['交货日期',order.delivery],['订单金额',order.amount]
      ].map(([k,v])=>`<div><span style="color:var(--text-muted)">${k}：</span><span style="font-weight:500">${v}</span></div>`).join('')}
    </div>
    <h4 style="margin:20px 0 12px;font-size:0.92rem">订单明细</h4>
    <table class="data-table"><thead><tr><th>物料编码</th><th>物料名称</th><th>数量</th><th>单位</th><th>单价</th><th>金额</th></tr></thead><tbody>
    ${ORDER_ITEMS.map(it=>`<tr><td>${it.sku}</td><td>${it.name}</td><td>${it.qty}</td><td>${it.unit}</td><td>¥${it.price}</td><td>¥${(it.qty*parseFloat(it.price)).toFixed(2)}</td></tr>`).join('')}
    </tbody></table>`;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal()">关闭</button>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// Login particles
function initParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;opacity:${Math.random()*0.5+0.1}`;
    container.appendChild(p);
  }
}

// Theme toggle
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  if (isDark) {
    html.removeAttribute('data-theme');
    localStorage.setItem('oms-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('oms-theme', 'dark');
  }
}

function initTheme() {
  const saved = localStorage.getItem('oms-theme');
  // Default to light theme
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticles();
});
