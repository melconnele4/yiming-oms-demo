// === Rule Pages & Other Pages ===

function renderRuleTable(title, desc, headers, rows, editTitle, editFields) {
  return `<div class="fade-in"><div class="page-header"><h1>${title}</h1><p>${desc}</p></div>
  <div class="card"><div class="card-header"><h3>规则列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <select class="filter-select"><option value="">区域编码</option><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select>
    <input class="filter-input" placeholder="物料编码" style="width:150px">
    <select class="filter-select"><option value="">状态</option><option>启用</option><option>禁用</option></select>
    <button class="btn btn-primary btn-sm">查询</button><button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-primary btn-sm" onclick="openRuleModal('${editTitle}')">＋ 新增</button>
    <button class="btn btn-danger btn-sm">批量删除</button>
    <button class="btn btn-ghost btn-sm">📥 下载模板</button>
    <button class="btn btn-ghost btn-sm">📤 导入新增</button>
    <button class="btn btn-ghost btn-sm">📊 下载明细</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr><th><input type="checkbox" onclick="toggleAll(this)"></th>${headers}</tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${rows.split('</tr>').length-1} 条</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function renderRuleDeadline() {
  const hdrs = '<th>区域编码</th><th>区域名称</th><th>销售地区编码</th><th>销售地区名称</th><th>客户编码</th><th>客户名称</th><th>物料编码</th><th>物料名称</th><th>提前天数</th><th>截止时间</th><th>状态</th><th>操作</th>';
  const rows = MOCK_DEADLINE_RULES.map((r,i) => `<tr>
    <td><input type="checkbox"></td><td>${r.area}</td><td>${r.areaName}</td><td>${r.saleArea||'—'}</td><td>${r.saleAreaName||'全部'}</td>
    <td>${r.cust||'—'}</td><td>${r.custName||'全部'}</td><td>${r.sku||'—'}</td><td>${r.skuName||'全部'}</td>
    <td><span style="font-weight:600">${r.days}天</span></td><td><span style="font-weight:600">${r.time}</span></td>
    <td><label class="toggle-switch"><input type="checkbox" ${r.enabled?'checked':''} onchange="showToast('success','状态已更新')"><span class="toggle-slider"></span></label></td>
    <td><button class="btn btn-ghost btn-sm" onclick="openRuleModal('编辑截止时间规则')">修改</button> <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button></td>
  </tr>`).join('');
  return renderRuleTable('截止时间规则维护', '维护区域、销售地区、客户、物料四个维度组合的要货提前天数与截止时间', hdrs, rows, '编辑截止时间规则');
}

function renderRuleGift() {
  const hdrs = '<th>主物料编码</th><th>主物料名称</th><th>数量</th><th>附赠品编码</th><th>附赠品名称</th><th>数量</th><th>规格审核</th><th>操作</th>';
  const rows = MOCK_GIFT_RULES.map(r => `<tr>
    <td><input type="checkbox"></td><td>${r.mainSku}</td><td>${r.mainName}</td><td>${r.mainQty}</td>
    <td>${r.giftSku}</td><td>${r.giftName}</td><td>${r.giftQty}</td>
    <td><label class="toggle-switch"><input type="checkbox" ${r.enabled?'checked':''} onchange="showToast('success','状态已更新')"><span class="toggle-slider"></span></label></td>
    <td><button class="btn btn-ghost btn-sm" onclick="openRuleModal('编辑附赠品维护规则')">修改</button> <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button></td>
  </tr>`).join('');
  return renderRuleTable('附赠品规则维护', '维护主物料与附赠品的绑定关系及数量配比', hdrs, rows, '编辑附赠品维护规则');
}

function renderRuleBom() {
  const hdrs = '<th>主物料编码</th><th>主物料名称</th><th>数量</th><th>子物料编码</th><th>子物料名称</th><th>数量</th><th>操作</th>';
  const rows = MOCK_BOM_RULES.map(r => `<tr>
    <td><input type="checkbox"></td><td>${r.mainSku}</td><td>${r.mainName}</td><td>${r.mainQty}</td>
    <td>${r.subSku}</td><td>${r.subName}</td><td>${r.subQty}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="openRuleModal('编辑组合商品BOM规则')">修改</button> <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button></td>
  </tr>`).join('');
  return renderRuleTable('组合商品BOM维护', '维护套餐商品的物料绑定关系及数量配比，支持自动拆单', hdrs, rows, '编辑组合商品BOM规则');
}

function renderMonitor() {
  return `<div class="fade-in"><div class="page-header"><h1>订单监控</h1><p>实时监控订单全链路处理状态</p></div>
  <div class="monitor-grid">
    <div class="monitor-card"><div class="monitor-label">要货端→OMS 同步</div><div class="monitor-value" style="color:var(--success)">1,847</div><div class="monitor-sub">今日已同步订单数</div><div class="progress-bar-container"><div class="progress-bar-fill success" style="width:98%"></div></div><div class="monitor-sub" style="margin-top:6px">同步率 98.2%</div></div>
    <div class="monitor-card"><div class="monitor-label">OMS→WMS 推送</div><div class="monitor-value" style="color:var(--accent-light)">1,623</div><div class="monitor-sub">已推送明细数</div><div class="progress-bar-container"><div class="progress-bar-fill accent" style="width:87%"></div></div><div class="monitor-sub" style="margin-top:6px">推送率 87.9%</div></div>
    <div class="monitor-card"><div class="monitor-label">WMS→OMS 回传</div><div class="monitor-value" style="color:var(--warning)">1,456</div><div class="monitor-sub">已过账回传数</div><div class="progress-bar-container"><div class="progress-bar-fill warning" style="width:78%"></div></div><div class="monitor-sub" style="margin-top:6px">回传率 78.8%</div></div>
  </div>
  <div class="card" style="margin-bottom:20px"><div class="card-header"><h3>订单处理流转链路</h3></div><div class="card-body">
    <div class="pipeline">
      <div class="pipeline-step"><div class="step-num" style="color:var(--success)">1,847</div><div class="step-label">要货端订单接收</div></div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step"><div class="step-num" style="color:var(--accent-light)">1,835</div><div class="step-label">OMS建单完成</div></div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step"><div class="step-num" style="color:var(--info)">1,623</div><div class="step-label">推送WMS</div></div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step"><div class="step-num" style="color:var(--warning)">1,456</div><div class="step-label">WMS过账回传</div></div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step"><div class="step-num" style="color:var(--success)">1,389</div><div class="step-label">推送ECC完成</div></div>
    </div>
  </div></div>
  <div class="content-grid"><div class="card"><div class="card-header"><h3>异常订单</h3><span class="status-badge danger">5条待处理</span></div><div class="card-body"><div class="activity-list">
    <div class="activity-item"><div class="activity-dot danger"></div><div><div class="activity-text">订单 20260317095800 建单失败：客户 N1008 付款方已冻结</div><div class="activity-time">15分钟前</div></div></div>
    <div class="activity-item"><div class="activity-dot warning"></div><div><div class="activity-text">订单 20260317093200 WMS推送超时，已重试2次</div><div class="activity-time">28分钟前</div></div></div>
    <div class="activity-item"><div class="activity-dot danger"></div><div><div class="activity-text">物料 400350 价格校验失败：无有效采购价格</div><div class="activity-time">45分钟前</div></div></div>
  </div></div></div>
  <div class="card"><div class="card-header"><h3>系统状态</h3></div><div class="card-body"><div class="activity-list">
    <div class="activity-item"><div class="activity-dot success"></div><div><div class="activity-text">SAP连接正常 · 响应 45ms</div><div class="activity-time">实时</div></div></div>
    <div class="activity-item"><div class="activity-dot success"></div><div><div class="activity-text">WMS接口正常 · 响应 128ms</div><div class="activity-time">实时</div></div></div>
    <div class="activity-item"><div class="activity-dot success"></div><div><div class="activity-text">Redis服务正常 · 内存 62%</div><div class="activity-time">实时</div></div></div>
    <div class="activity-item"><div class="activity-dot warning"></div><div><div class="activity-text">ZNYH接口延迟偏高 · 响应 890ms</div><div class="activity-time">实时</div></div></div>
  </div></div></div></div></div>`;
}

function renderReports() {
  return `<div class="fade-in"><div class="page-header"><h1>报表查询</h1><p>按生产区域、装运点等维度统计汇总订单需求量</p></div>
  <div class="stats-grid" style="grid-template-columns:repeat(3,1fr)">
    <div class="stat-card accent"><div class="stat-icon accent"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/></svg></div><div class="stat-value">186,432</div><div class="stat-label">今日订单明细总量</div></div>
    <div class="stat-card success"><div class="stat-icon success"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9z" clip-rule="evenodd"/></svg></div><div class="stat-value">¥12.8M</div><div class="stat-label">今日订单总金额</div></div>
    <div class="stat-card info"><div class="stat-icon info"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg></div><div class="stat-value">892</div><div class="stat-label">活跃客户数</div></div>
  </div>
  <div class="content-grid"><div class="card"><div class="card-header"><h3>各区域订单量分布</h3></div><div class="card-body">
    <div class="chart-bar-group" style="height:200px">${[{l:'杭州',v:580,c:'accent'},{l:'温州',v:420,c:'success'},{l:'宁波',v:350,c:'info'},{l:'常州',v:210,c:'warning'},{l:'金华',v:180,c:'accent'},{l:'台州',v:107,c:'success'}].map(d=>`<div class="chart-bar-item"><div class="chart-bar-value">${d.v}</div><div class="chart-bar ${d.c}" style="height:${d.v/600*100}%"></div><div class="chart-bar-label">${d.l}</div></div>`).join('')}</div>
  </div></div>
  <div class="card"><div class="card-header"><h3>热门物料TOP 5</h3></div><div class="card-body"><table class="data-table"><thead><tr><th>排名</th><th>物料编码</th><th>物料名称</th><th>订单量</th></tr></thead><tbody>
    <tr><td>🥇 1</td><td>400293</td><td>DIY酸奶</td><td style="font-weight:700;color:var(--accent-light)">12,580</td></tr>
    <tr><td>🥈 2</td><td>400267</td><td>一鸣热奶饮料210ML</td><td style="font-weight:700">10,230</td></tr>
    <tr><td>🥉 3</td><td>411237</td><td>醇奶家纯牛奶200ml</td><td style="font-weight:700">8,950</td></tr>
    <tr><td>4</td><td>400330</td><td>巧克力富力亚</td><td>7,120</td></tr>
    <tr><td>5</td><td>400104</td><td>经典肉松面包</td><td>6,340</td></tr>
  </tbody></table></div></div></div></div>`;
}

// ==========================================
// 不可要货规则
// ==========================================
function renderRuleNoOrder() {
  const hdrs = '<th>区域编码</th><th>区域名称</th><th>销售地区编码</th><th>销售地区名称</th><th>客户编码</th><th>客户名称</th><th>物料编码</th><th>物料名称</th><th>禁止原因</th><th>状态</th><th>创建时间</th><th>操作</th>';
  const rows = MOCK_NO_ORDER_RULES.map(r => `<tr>
    <td><input type="checkbox"></td><td>${r.area}</td><td>${r.areaName}</td>
    <td>${r.saleArea||'—'}</td><td>${r.saleAreaName||'全部'}</td>
    <td>${r.cust||'—'}</td><td>${r.custName||'全部'}</td>
    <td>${r.sku||'—'}</td><td>${r.skuName||'全部'}</td>
    <td><span style="font-size:0.78rem;color:var(--text-secondary)">${r.reason}</span></td>
    <td><label class="toggle-switch"><input type="checkbox" ${r.enabled?'checked':''} onchange="showToast('success','状态已更新')"><span class="toggle-slider"></span></label></td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${r.createTime}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="openNoOrderModal('编辑不可要货规则')">修改</button> <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button></td>
  </tr>`).join('');
  return renderRuleTable('不可要货规则维护', '维护区域、销售地区、客户、物料四个维度组合的不可要货限制规则', hdrs, rows, '编辑不可要货规则');
}

function openNoOrderModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>选择区域编码 <span class="required">*</span></label><select class="form-control"><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select></div>
    <div class="form-field"><label>选择销售地区编码</label><select class="form-control"><option value="">全部</option><option>N00001-奶茶事业部杭州区</option><option>W00001-温州区销售组织</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>选择客户编码</label><select class="form-control"><option value="">全部</option><option>N1001-染墨青茶肆萧山奥体印象城店</option><option>20694-瑞安市婷轩副食品经营部</option></select></div>
    <div class="form-field"><label>选择物料编码</label><select class="form-control"><option value="">全部</option><option>400293-DIY酸奶</option><option>400350-酸奶勺(赠品)</option><option>400104-大米蒸蛋糕</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>禁止原因 <span class="required">*</span></label><input class="form-control" placeholder="请输入禁止要货的原因"></div>
    <div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 紧急加单数量
// ==========================================
function renderRuleUrgent() {
  const rows = MOCK_URGENT_RULES.map(r => {
    const pct = Math.round(r.currentUsed/r.maxQty*100);
    const pctCls = pct >= 100 ? 'danger' : pct >= 70 ? 'warning' : 'success';
    return `<tr>
    <td><input type="checkbox"></td><td>${r.area}</td><td>${r.areaName}</td>
    <td>${r.sku}</td><td>${r.skuName}</td>
    <td><span style="font-weight:700;color:var(--accent-light)">${r.maxQty}</span></td>
    <td>${r.unit}</td>
    <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar-container" style="flex:1;height:8px"><div class="progress-bar-fill ${pctCls}" style="width:${Math.min(pct,100)}%"></div></div><span style="font-weight:600;font-size:0.78rem;min-width:64px">${r.currentUsed}/${r.maxQty}</span></div></td>
    <td><label class="toggle-switch"><input type="checkbox" ${r.enabled?'checked':''} onchange="showToast('success','状态已更新')"><span class="toggle-slider"></span></label></td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${r.createTime}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="openUrgentModal('编辑紧急加单配额')">修改</button> <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button></td>
  </tr>`;}).join('');

  const hdrs = '<th>区域编码</th><th>区域名称</th><th>物料编码</th><th>物料名称</th><th>最大配额</th><th>单位</th><th>今日使用量</th><th>状态</th><th>创建时间</th><th>操作</th>';
  return renderRuleTable('紧急加单数量维护', '维护各区域物料的每日紧急加单最大配额，超过配额将自动阻断', hdrs, rows, '编辑紧急加单配额');
}

function openUrgentModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>选择区域编码 <span class="required">*</span></label><select class="form-control"><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select></div>
    <div class="form-field"><label>选择物料编码 <span class="required">*</span></label><select class="form-control"><option>400293-DIY酸奶</option><option>400267-一鸣热奶饮料210ML</option><option>400330-巧克力富力亚</option><option>411237-醇奶家纯牛奶200ml</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>最大配额数量 <span class="required">*</span></label><input class="form-control" type="number" value="500" min="1"></div>
    <div class="form-field"><label>单位</label><input class="form-control" value="瓶" readonly style="color:var(--text-muted)"></div></div>
    <div class="form-row single"><div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 调货规则
// ==========================================
function renderRuleTransfer() {
  const hdrs = '<th>调出区域</th><th>调出名称</th><th>调入区域</th><th>调入名称</th><th>运输组</th><th>运输组名称</th><th>提前天数</th><th>截止时间</th><th>状态</th><th>创建时间</th><th>操作</th>';
  const rows = MOCK_TRANSFER_RULES.map(r => `<tr>
    <td><input type="checkbox"></td>
    <td>${r.fromArea}</td><td>${r.fromAreaName}</td>
    <td>${r.toArea}</td><td>${r.toAreaName}</td>
    <td>${r.transGroup}</td><td>${r.transGroupName}</td>
    <td><span style="font-weight:600">${r.advanceDays}天</span></td>
    <td><span style="font-weight:600">${r.cutoffTime}</span></td>
    <td><label class="toggle-switch"><input type="checkbox" ${r.enabled?'checked':''} onchange="showToast('success','状态已更新')"><span class="toggle-slider"></span></label></td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${r.createTime}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="openTransferModal('编辑调货规则')">修改</button> <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button></td>
  </tr>`).join('');
  return renderRuleTable('调货规则维护', '维护跨区域调货的运输组、提前天数与截止时间', hdrs, rows, '编辑调货规则');
}

function openTransferModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>调出区域 <span class="required">*</span></label><select class="form-control"><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select></div>
    <div class="form-field"><label>调入区域 <span class="required">*</span></label><select class="form-control"><option>W001-温州</option><option>N001-杭州</option><option>C001-常州</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>运输组 <span class="required">*</span></label><select class="form-control"><option>01-冷藏运输组</option><option>02-常温运输组</option></select></div>
    <div class="form-field"><label>提前天数 <span class="required">*</span></label><input class="form-control" type="number" value="1" min="0"></div></div>
    <div class="form-row"><div class="form-field"><label>截止时间 <span class="required">*</span></label><input class="form-control" type="time" value="14:00"></div>
    <div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 定时审核规则
// ==========================================
function renderRuleAutoAudit() {
  const hdrs = '<th>区域编码</th><th>区域名称</th><th>提前天数</th><th>审核时间</th><th>订单类型</th><th>类型名称</th><th>状态</th><th>创建时间</th><th>操作</th>';
  const rows = MOCK_AUTO_AUDIT_RULES.map(r => `<tr>
    <td><input type="checkbox"></td>
    <td>${r.area}</td><td>${r.areaName}</td>
    <td><span style="font-weight:600">${r.advanceDays}天</span></td>
    <td><span style="font-weight:700;color:var(--accent-light);font-size:1rem">${r.auditTime}</span></td>
    <td style="font-family:monospace;font-size:0.78rem">${r.orderType}</td><td>${r.orderTypeName}</td>
    <td><label class="toggle-switch"><input type="checkbox" ${r.enabled?'checked':''} onchange="showToast('success','状态已更新')"><span class="toggle-slider"></span></label></td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${r.createTime}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="openAuditRuleModal('编辑定时审核规则')">修改</button> <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button></td>
  </tr>`).join('');
  return renderRuleTable('定时审核规则维护', '配置各区域不同订单类型的自动审核时间点，到时系统将自动完成订单审核', hdrs, rows, '编辑定时审核规则');
}

function openAuditRuleModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>选择区域编码 <span class="required">*</span></label><select class="form-control"><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select></div>
    <div class="form-field"><label>订单类型 <span class="required">*</span></label><select class="form-control"><option>ZR01-拉式订单</option><option>ZN20-销售订单</option><option>ZW11-紧急加单</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>提前天数 <span class="required">*</span></label><input class="form-control" type="number" value="2" min="0"><p style="font-size:0.72rem;color:var(--text-muted);margin-top:4px">交货日期前N天自动审核</p></div>
    <div class="form-field"><label>审核时间 <span class="required">*</span></label><input class="form-control" type="time" value="06:00"><p style="font-size:0.72rem;color:var(--text-muted);margin-top:4px">到达该时间点自动审核</p></div></div>
    <div class="form-row single"><div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 物流拆单分类
// ==========================================
function renderRuleSplit() {
  const hdrs = '<th>运输组</th><th>运输组名称</th><th>装载组</th><th>装载组名称</th><th>物料分类</th><th>拆单优先级</th><th>温控范围</th><th>状态</th><th>创建时间</th><th>操作</th>';
  const rows = MOCK_SPLIT_RULES.map(r => `<tr>
    <td><input type="checkbox"></td>
    <td>${r.transGroup}</td><td>${r.transGroupName}</td>
    <td style="font-weight:600">${r.loadGroup}</td><td>${r.loadGroupName}</td>
    <td>${r.category}</td>
    <td><span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--accent-bg);color:var(--accent-light);font-weight:700;font-size:0.78rem">${r.splitPriority}</span></td>
    <td><span class="status-badge ${r.tempRange.includes('-')?'info':'warning'}">${r.tempRange}</span></td>
    <td><label class="toggle-switch"><input type="checkbox" ${r.enabled?'checked':''} onchange="showToast('success','状态已更新')"><span class="toggle-slider"></span></label></td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${r.createTime}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="openSplitModal('编辑物流拆单分类')">修改</button> <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button></td>
  </tr>`).join('');
  return renderRuleTable('物流拆单分类维护', '维护物流配送的运输组与装载组的分类规则，用于订单自动拆单及温控分类', hdrs, rows, '编辑物流拆单分类');
}

function openSplitModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>运输组 <span class="required">*</span></label><select class="form-control"><option>01-冷藏运输组</option><option>02-常温运输组</option><option>03-混合运输组</option></select></div>
    <div class="form-field"><label>装载组 <span class="required">*</span></label><select class="form-control"><option>A-冷链A类</option><option>B-冷链B类</option><option>C-常温A类</option><option>D-常温B类</option><option>E-混合类</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>物料分类 <span class="required">*</span></label><input class="form-control" placeholder="如：低温乳制品"></div>
    <div class="form-field"><label>拆单优先级 <span class="required">*</span></label><input class="form-control" type="number" value="1" min="1" max="10"></div></div>
    <div class="form-row"><div class="form-field"><label>温控范围</label><input class="form-control" placeholder="如：-2~8℃"></div>
    <div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 奶吧开闭店
// ==========================================
function renderRuleStore() {
  const statusColorMap = {'营业中':'success','临时闭店':'warning','永久闭店':'danger','重新开业':'info'};
  const rows = MOCK_STORE_STATUS.map(s => `<tr>
    <td>${s.id}</td>
    <td style="font-weight:600">${s.storeCode}</td>
    <td>${s.storeName}</td>
    <td>${s.area}</td><td>${s.areaName}</td>
    <td><span class="status-badge ${statusColorMap[s.status]||'neutral'}">${s.status}</span></td>
    <td>${s.openDate}</td><td>${s.closeDate}</td><td>${s.reopenDate}</td><td>${s.permCloseDate}</td>
    <td style="font-family:monospace;font-size:0.72rem;color:var(--text-muted)">${s.oaFlow}</td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${s.updateTime}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="openStoreModal('编辑门店状态')">编辑</button> <button class="btn btn-ghost btn-sm" onclick="showStoreDetail('${s.storeCode}')">详情</button></td>
  </tr>`).join('');

  const statusCounts = {};
  MOCK_STORE_STATUS.forEach(s => { statusCounts[s.status] = (statusCounts[s.status]||0)+1; });

  return `<div class="fade-in"><div class="page-header"><h1>奶吧开闭店管理</h1><p>管理奶吧门店的开业、闭店、重新开业、永久闭店日期及 OA 审批流程</p></div>
  <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
    <div class="stat-card success"><div class="stat-value">${statusCounts['营业中']||0}</div><div class="stat-label">营业中</div></div>
    <div class="stat-card warning"><div class="stat-value">${statusCounts['临时闭店']||0}</div><div class="stat-label">临时闭店</div></div>
    <div class="stat-card info"><div class="stat-value">${statusCounts['重新开业']||0}</div><div class="stat-label">重新开业</div></div>
    <div class="stat-card accent"><div class="stat-value">${statusCounts['永久闭店']||0}</div><div class="stat-label">永久闭店</div></div>
  </div>
  <div class="card"><div class="card-header"><h3>门店列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <input class="filter-input" placeholder="门店编码 / 名称" style="width:180px">
    <select class="filter-select"><option value="">门店状态</option><option>营业中</option><option>临时闭店</option><option>重新开业</option><option>永久闭店</option></select>
    <select class="filter-select"><option value="">区域</option><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select>
    <button class="btn btn-primary btn-sm">查询</button><button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-primary btn-sm" onclick="openStoreModal('新增门店')">＋ 新增门店</button>
    <button class="btn btn-ghost btn-sm" onclick="showToast('info','同步OA流程中...')">🔄 同步OA状态</button>
    <button class="btn btn-ghost btn-sm">📥 导出</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th>ID</th><th>门店编码</th><th>门店名称</th><th>区域</th><th>区域名称</th><th>状态</th><th>开业日期</th><th>闭店日期</th><th>重开日期</th><th>永久闭店</th><th>OA流程</th><th>更新时间</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_STORE_STATUS.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function openStoreModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>门店编码 <span class="required">*</span></label><input class="form-control" placeholder="请输入门店编码"></div>
    <div class="form-field"><label>门店名称 <span class="required">*</span></label><input class="form-control" placeholder="请输入门店名称"></div></div>
    <div class="form-row"><div class="form-field"><label>所属区域 <span class="required">*</span></label><select class="form-control"><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select></div>
    <div class="form-field"><label>门店状态 <span class="required">*</span></label><select class="form-control"><option>营业中</option><option>临时闭店</option><option>重新开业</option><option>永久闭店</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>开业日期 <span class="required">*</span></label><input class="form-control" type="date" value="2026-03-20"></div>
    <div class="form-field"><label>闭店日期</label><input class="form-control" type="date"></div></div>
    <div class="form-row"><div class="form-field"><label>重新开业日期</label><input class="form-control" type="date"></div>
    <div class="form-field"><label>永久闭店日期</label><input class="form-control" type="date"></div></div>
    <div class="form-row single"><div class="form-field"><label>OA审批流程编号</label><input class="form-control" placeholder="如：RT107-2026031001"></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

function showStoreDetail(code) {
  const store = MOCK_STORE_STATUS.find(s => s.storeCode === code) || MOCK_STORE_STATUS[0];
  const statusColorMap = {'营业中':'success','临时闭店':'warning','永久闭店':'danger','重新开业':'info'};
  document.getElementById('modal-title').textContent = `门店详情 - ${store.storeName}`;
  document.getElementById('modal-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:0.85rem">
      ${[['门店编码',store.storeCode],['门店名称',store.storeName],['所属区域',`${store.area} ${store.areaName}`],
        ['门店状态',`<span class="status-badge ${statusColorMap[store.status]}">${store.status}</span>`],
        ['开业日期',store.openDate],['闭店日期',store.closeDate],['重新开业日期',store.reopenDate],
        ['永久闭店日期',store.permCloseDate],['OA审批流程',store.oaFlow],['最后更新',store.updateTime]
      ].map(([k,v])=>`<div><span style="color:var(--text-muted)">${k}：</span><span style="font-weight:500">${v}</span></div>`).join('')}
    </div>`;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal()">关闭</button>`;
  document.getElementById('modal-overlay').classList.add('show');
}


function renderSettings() {
  const cards = [
    {icon:'👤',title:'用户管理',desc:'管理系统用户信息，包括账号创建、权限分配和状态管理',count:'128 位用户',page:'settings-user'},
    {icon:'🔐',title:'角色管理',desc:'配置系统角色及其对应的功能权限，支持细粒度权限控制',count:'6 个角色',page:'settings-role'},
    {icon:'📋',title:'菜单管理',desc:'管理系统菜单结构，配置菜单显示顺序和访问权限',count:'32 个菜单',page:'settings-menu'},
    {icon:'📊',title:'基础信息管理',desc:'快速查询获取基础信息，便于系统运维人员高效沟通问题',count:'12 个数据源',page:'settings-baseinfo'},
    {icon:'🔗',title:'关联规则管理',desc:'查询获取组织的关联规则，定位业务标准是否正常使用',count:'45 条规则',page:'settings-assoc'},
    {icon:'💾',title:'主数据管理',desc:'管理系统核心主数据，确保数据的准确性和一致性',count:'8 个数据集',page:'settings-master'}
  ];
  return `<div class="fade-in"><div class="page-header"><h1>系统管理</h1><p>系统用户、角色、菜单及基础信息管理</p></div>
  <div class="content-grid three">
    ${cards.map(c=>`
    <div class="card" style="cursor:pointer;transition:var(--transition)" onclick="navigateTo('${c.page}')" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.transform='';this.style.boxShadow=''">
      <div class="card-body" style="text-align:center;padding:32px 24px">
        <div style="font-size:2.5rem;margin-bottom:12px">${c.icon}</div>
        <h3 style="font-size:1.05rem;margin-bottom:8px">${c.title}</h3>
        <p style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:14px">${c.desc}</p>
        <span class="status-badge info">${c.count}</span>
      </div>
    </div>`).join('')}
  </div></div>`;
}

