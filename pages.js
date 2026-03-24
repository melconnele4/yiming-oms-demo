// === Page Renderers ===
function statusClass(s){return s==='审核成功'?'success':s==='未审核'?'warning':s==='部分处理'?'info':s==='完全处理'?'success':'neutral';}

function renderDashboard(){
  return `<div class="fade-in">
  <div class="page-header"><h1>工作台</h1><p>欢迎回来，陈文静。今天是 2026年3月17日，您有 12 条待审核订单</p></div>
  <div class="stats-grid">
    <div class="stat-card accent"><div class="stat-icon accent"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clip-rule="evenodd"/></svg></div><div class="stat-value">1,847</div><div class="stat-label">今日订单数</div><div class="stat-trend up">↑ 12.5% 较昨日</div><div class="mini-chart">${[60,45,70,55,80,65,90,75,85,95,70,88].map(h=>`<div class="mini-bar" style="height:${h}%;background:rgba(99,102,241,${h/150+0.2})"></div>`).join('')}</div></div>
    <div class="stat-card success"><div class="stat-icon success"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div><div class="stat-value">1,623</div><div class="stat-label">已审核订单</div><div class="stat-trend up">↑ 8.3% 较昨日</div><div class="mini-chart">${[50,65,45,70,60,80,55,75,90,85,72,80].map(h=>`<div class="mini-bar" style="height:${h}%;background:rgba(34,197,94,${h/150+0.2})"></div>`).join('')}</div></div>
    <div class="stat-card warning"><div class="stat-icon warning"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/></svg></div><div class="stat-value">12</div><div class="stat-label">待审核订单</div><div class="stat-trend down">↓ 3.2% 较昨日</div><div class="mini-chart">${[30,20,35,15,25,10,18,22,15,12,8,12].map(h=>`<div class="mini-bar" style="height:${h}%;background:rgba(245,158,11,${h/100+0.3})"></div>`).join('')}</div></div>
    <div class="stat-card info"><div class="stat-icon info"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"/></svg></div><div class="stat-value">¥2.86M</div><div class="stat-label">今日订单金额</div><div class="stat-trend up">↑ 15.7% 较昨日</div><div class="mini-chart">${[40,55,60,70,50,65,75,80,68,85,78,90].map(h=>`<div class="mini-bar" style="height:${h}%;background:rgba(59,130,246,${h/150+0.2})"></div>`).join('')}</div></div>
  </div>
  <div class="content-grid">
    <div class="card"><div class="card-header"><h3>订单趋势（近7日）</h3><div><button class="btn btn-ghost btn-sm">日</button> <button class="btn btn-primary btn-sm">周</button></div></div><div class="card-body"><div class="chart-bar-group">${[{l:'3/11',v:1520,c:'accent'},{l:'3/12',v:1680,c:'success'},{l:'3/13',v:1450,c:'accent'},{l:'3/14',v:1890,c:'info'},{l:'3/15',v:1760,c:'accent'},{l:'3/16',v:2010,c:'warning'},{l:'3/17',v:1847,c:'accent'}].map(d=>`<div class="chart-bar-item"><div class="chart-bar-value">${d.v}</div><div class="chart-bar ${d.c}" style="height:${d.v/2200*100}%"></div><div class="chart-bar-label">${d.l}</div></div>`).join('')}</div></div></div>
    <div class="card"><div class="card-header"><h3>最新动态</h3><button class="btn btn-ghost btn-sm">查看全部</button></div><div class="card-body"><div class="activity-list">${ACTIVITIES.slice(0,5).map(a=>`<div class="activity-item"><div class="activity-dot ${a.type}"></div><div><div class="activity-text">${a.text}</div><div class="activity-time">${a.time}</div></div></div>`).join('')}</div></div></div>
  </div></div>`;
}

function renderOrderReview(){
  const rows=MOCK_ORDERS.map((o,i)=>`<tr>
    <td><input type="checkbox" class="row-check" data-idx="${i}"></td>
    <td style="color:var(--accent-light);cursor:pointer" onclick="showOrderDetail('${o.id}')">${o.id}</td>
    <td>${o.cust}</td><td>${o.custName}</td><td>${o.areaName}</td>
    <td>${o.typeName}</td><td><span class="status-badge ${statusClass(o.status)}">${o.status}</span></td>
    <td>${o.user}</td><td>${o.date}</td><td>${o.delivery}</td><td>${o.amount}</td>
    <td><button class="btn btn-primary btn-sm" ${o.status!=='未审核'?'disabled style="opacity:0.4"':''} onclick="approveOrder('${o.id}')">审核</button> <button class="btn btn-ghost btn-sm" onclick="showOrderDetail('${o.id}')">详情</button></td>
  </tr>`).join('');
  return `<div class="fade-in"><div class="page-header"><h1>销售订单审核</h1><p>审核来自各渠道的待处理订单</p></div>
  <div class="card"><div class="card-header"><h3>订单列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <select class="filter-select"><option value="">订单状态</option><option>未审核</option><option>审核成功</option><option>部分处理</option><option>完全处理</option></select>
    <input class="filter-input" placeholder="订单编号" style="width:180px">
    <input class="filter-input" placeholder="客户编码/名称" style="width:160px">
    <input class="filter-input" type="date" value="2026-03-17" style="width:150px">
    <button class="btn btn-primary btn-sm" onclick="showToast('info','查询完成，共 ${MOCK_ORDERS.length} 条记录')"><svg viewBox="0 0 20 20" fill="currentColor" style="width:14px;height:14px"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/></svg> 查询</button>
    <button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions"><button class="btn btn-success btn-sm" onclick="showToast('success','批量审核成功')">批量审核</button></div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th><input type="checkbox" onclick="toggleAll(this)"></th>
    <th>订单编号</th><th>客户编码</th><th>客户名称</th><th>区域</th><th>订单类型</th><th>订单状态</th><th>业务员</th><th>下单日期</th><th>交货日期</th><th>订单金额</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_ORDERS.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>2</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function renderOrderCreate(){
  return `<div class="fade-in"><div class="page-header"><h1>订单新建</h1><p>手工录入订单或批量导入</p></div>
  <div class="create-form-card"><h3>📋 订单基本信息</h3><div class="form-grid">
    <div class="form-field"><label>客户编码 <span class="required">*</span></label><input class="form-control" placeholder="输入或搜索客户编码" value="N1001"></div>
    <div class="form-field"><label>客户名称</label><input class="form-control" value="染墨青茶肆萧山奥体印象城店" readonly style="color:var(--text-muted)"></div>
    <div class="form-field"><label>订单类型 <span class="required">*</span></label><select class="form-control"><option>ZR01 - 拉式订单</option><option>ZN20 - 销售订单</option><option>ZW11 - 紧急加单</option></select></div>
    <div class="form-field"><label>计划交货日期 <span class="required">*</span></label><input class="form-control" type="date" value="2026-03-19"></div>
    <div class="form-field"><label>销售组织</label><input class="form-control" value="N001 - 奶茶事业部杭州区销售组织" readonly style="color:var(--text-muted)"></div>
    <div class="form-field"><label>订单备注</label><input class="form-control" placeholder="选填"></div>
  </div></div>
  <div class="create-form-card"><h3>📦 订单明细</h3>
    <div class="toolbar-actions" style="margin-bottom:12px"><button class="btn btn-primary btn-sm" onclick="showToast('info','已添加新行')"><svg viewBox="0 0 20 20" fill="currentColor" style="width:14px;height:14px"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/></svg> 添加物料</button> <button class="btn btn-ghost btn-sm" onclick="showToast('info','请选择Excel文件')">📥 导入Excel</button></div>
    <div class="inline-table" style="overflow-x:auto"><table class="data-table"><thead><tr><th>行号</th><th>物料编码</th><th>物料名称</th><th>订单数量</th><th>物料规格</th><th>单位</th><th>单价</th><th>金额</th><th>操作</th></tr></thead><tbody>
    ${ORDER_ITEMS.map((it,i)=>`<tr><td>${(i+1)*10}</td><td>${it.sku}</td><td>${it.name}</td><td><input class="form-control" style="width:80px" type="number" value="${it.qty}"></td><td>${it.spec}</td><td>${it.unit}</td><td>¥${it.price}</td><td>¥${(it.qty*parseFloat(it.price)).toFixed(2)}</td><td><button class="btn btn-danger btn-sm">删除</button></td></tr>`).join('')}
    </tbody></table></div>
    <button class="add-row-btn" onclick="showToast('info','已添加新行')">+ 点击添加物料行</button>
  </div>
  <div style="display:flex;gap:12px;justify-content:flex-end">
    <button class="btn btn-ghost" onclick="showToast('info','单据已暂存')">保存单据</button>
    <button class="btn btn-primary" onclick="showToast('success','订单创建成功！订单号: 20260317153944')">添加单据</button>
  </div></div>`;
}

function renderOrderQuery(){
  const rows=MOCK_ORDERS.map(o=>`<tr>
    <td style="color:var(--accent-light);cursor:pointer" onclick="showOrderDetail('${o.id}')">${o.id}</td>
    <td>${o.cust}</td><td>${o.custName}</td><td>${o.areaName}</td><td>${o.typeName}</td>
    <td><span class="status-badge ${statusClass(o.status)}">${o.status}</span></td>
    <td>${o.user}</td><td>${o.date}</td><td>${o.delivery}</td><td>${o.amount}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="showOrderDetail('${o.id}')">详情</button></td>
  </tr>`).join('');
  return `<div class="fade-in"><div class="page-header"><h1>订单查询</h1><p>查询历史订单信息和履约进度</p></div>
  <div class="card"><div class="card-header"><h3>查询结果</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <input class="filter-input" placeholder="订单编号" style="width:180px">
    <input class="filter-input" placeholder="客户编码/名称" style="width:160px">
    <select class="filter-select"><option value="">订单状态</option><option>未审核</option><option>审核成功</option><option>部分处理</option><option>完全处理</option></select>
    <input class="filter-input" type="date" style="width:150px">
    <button class="btn btn-primary btn-sm">查询</button><button class="btn btn-ghost btn-sm">重置</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th>订单编号</th><th>客户编码</th><th>客户名称</th><th>区域</th><th>订单类型</th><th>状态</th><th>业务员</th><th>下单日期</th><th>交货日期</th><th>金额</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_ORDERS.length} 条</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

// ==========================================
// 订单调货
// ==========================================
function renderOrderTransfer() {
  const statusMap = {'待审核':'warning','审核成功':'success','已完成':'info','已驳回':'danger'};
  const rows = MOCK_TRANSFERS.map(t => `<tr>
    <td><input type="checkbox"></td>
    <td style="font-weight:600;font-family:monospace;font-size:0.82rem">${t.id}</td>
    <td>${t.fromCust}</td><td>${t.fromCustName}</td><td>${t.fromAreaName}</td>
    <td style="font-size:1.2rem;color:var(--text-muted)">➜</td>
    <td>${t.toCust}</td><td>${t.toCustName}</td><td>${t.toAreaName}</td>
    <td>${t.sku}</td><td>${t.skuName}</td>
    <td style="font-weight:600">${t.qty} ${t.unit}</td>
    <td><span class="status-badge ${statusMap[t.status]||'neutral'}">${t.status}</span></td>
    <td>${t.user}</td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${t.date}</td>
    <td style="font-size:0.78rem">${t.delivery}</td>
    <td>
      ${t.status==='待审核'?'<button class="btn btn-primary btn-sm" onclick="showToast(\'success\',\'审核成功\')">审核</button> <button class="btn btn-danger btn-sm" onclick="showToast(\'warning\',\'已驳回\')">驳回</button>':'<button class="btn btn-ghost btn-sm" onclick="showTransferDetail(\''+t.id+'\')">详情</button>'}
    </td>
  </tr>`).join('');

  const statusCounts = {};
  MOCK_TRANSFERS.forEach(t => { statusCounts[t.status] = (statusCounts[t.status]||0)+1; });

  return `<div class="fade-in"><div class="page-header"><h1>订单调货</h1><p>管理跨客户、跨区域的订单调货申请与审核</p></div>
  <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
    <div class="stat-card"><div class="stat-value">${MOCK_TRANSFERS.length}</div><div class="stat-label">调货总数</div></div>
    <div class="stat-card warning"><div class="stat-value">${statusCounts['待审核']||0}</div><div class="stat-label">待审核</div></div>
    <div class="stat-card success"><div class="stat-value">${statusCounts['已完成']||0}</div><div class="stat-label">已完成</div></div>
    <div class="stat-card danger"><div class="stat-value">${statusCounts['已驳回']||0}</div><div class="stat-label">已驳回</div></div>
  </div>
  <div class="card"><div class="card-header"><h3>调货单列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <input class="filter-input" placeholder="调货单号" style="width:160px">
    <select class="filter-select"><option value="">状态</option><option>待审核</option><option>审核成功</option><option>已完成</option><option>已驳回</option></select>
    <select class="filter-select"><option value="">区域</option><option>N001-杭州</option><option>W001-温州</option><option>C001-常州</option></select>
    <button class="btn btn-primary btn-sm">查询</button><button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-primary btn-sm" onclick="openTransferOrderModal()">＋ 新建调货</button>
    <button class="btn btn-ghost btn-sm">📥 导出</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th><input type="checkbox"></th><th>调货单号</th><th>调出客户</th><th>调出名称</th><th>调出区域</th><th></th><th>调入客户</th><th>调入名称</th><th>调入区域</th><th>物料编码</th><th>物料名称</th><th>数量</th><th>状态</th><th>申请人</th><th>申请日期</th><th>交货日期</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_TRANSFERS.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function openTransferOrderModal() {
  document.getElementById('modal-title').textContent = '新建调货单';
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>调出客户 <span class="required">*</span></label><select class="form-control"><option>N1001-染墨青茶肆萧山奥体印象城店</option><option>N1002-染墨青茶肆国大店</option><option>20694-瑞安市婷轩副食品经营部</option></select></div>
    <div class="form-field"><label>调入客户 <span class="required">*</span></label><select class="form-control"><option>N1002-染墨青茶肆国大店</option><option>N1003-一鸣真鲜奶吧城西店</option><option>20694-瑞安市婷轩副食品经营部</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>物料编码 <span class="required">*</span></label><select class="form-control"><option>400293-DIY酸奶</option><option>400267-一鸣热奶饮料210ML</option><option>400330-巧克力富力亚</option><option>411237-醇奶家纯牛奶200ml</option></select></div>
    <div class="form-field"><label>调货数量 <span class="required">*</span></label><input class="form-control" type="number" value="50" min="1"></div></div>
    <div class="form-row"><div class="form-field"><label>交货日期 <span class="required">*</span></label><input class="form-control" type="date" value="2026-03-22"></div>
    <div class="form-field"><label>备注</label><input class="form-control" placeholder="请输入调货原因"></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

function showTransferDetail(id) {
  const t = MOCK_TRANSFERS.find(x => x.id === id) || MOCK_TRANSFERS[0];
  const statusMap = {'待审核':'warning','审核成功':'success','已完成':'info','已驳回':'danger'};
  document.getElementById('modal-title').textContent = `调货单详情 - ${t.id}`;
  document.getElementById('modal-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:0.85rem">
      ${[['调货单号',t.id],['状态',`<span class="status-badge ${statusMap[t.status]}">${t.status}</span>`],
        ['调出客户',`${t.fromCust} ${t.fromCustName}`],['调出区域',t.fromAreaName],
        ['调入客户',`${t.toCust} ${t.toCustName}`],['调入区域',t.toAreaName],
        ['物料',`${t.sku} ${t.skuName}`],['数量',`${t.qty} ${t.unit}`],
        ['申请人',t.user],['申请日期',t.date],['交货日期',t.delivery]
      ].map(([k,v])=>`<div><span style="color:var(--text-muted)">${k}：</span><span style="font-weight:500">${v}</span></div>`).join('')}
    </div>`;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal()">关闭</button>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 消息通知
// ==========================================
function renderMessages() {
  const levelIcons = {'info':'ℹ️','success':'✅','warning':'⚠️','danger':'🚨'};
  const unreadCount = MOCK_MESSAGES.filter(m => !m.read).length;
  const typeCounts = {};
  MOCK_MESSAGES.forEach(m => { typeCounts[m.type] = (typeCounts[m.type]||0)+1; });

  const msgCards = MOCK_MESSAGES.map(m => `
    <div class="card" style="margin-bottom:12px;border-left:4px solid var(--${m.level==='danger'?'danger':m.level==='warning'?'warning':m.level==='success'?'success':'accent-light'});${m.read?'opacity:0.75':''}">
      <div class="card-body" style="padding:16px 20px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-size:1.1rem">${levelIcons[m.level]||'📌'}</span>
              <span class="status-badge ${m.level}" style="font-size:0.7rem">${m.type}</span>
              ${m.read?'':'<span class="status-badge danger" style="font-size:0.65rem;padding:1px 6px">未读</span>'}
              <h4 style="font-size:0.92rem;margin:0;font-weight:600">${m.title}</h4>
            </div>
            <p style="font-size:0.82rem;color:var(--text-secondary);margin:0;line-height:1.5">${m.content}</p>
          </div>
          <div style="text-align:right;min-width:120px">
            <div style="font-size:0.72rem;color:var(--text-muted)">${m.time}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px">来源: ${m.sender}</div>
          </div>
        </div>
      </div>
    </div>`).join('');

  return `<div class="fade-in"><div class="page-header"><h1>消息通知</h1><p>查看系统通知、审核通知、异常告警和业务提醒</p></div>
  <div class="stats-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:20px">
    <div class="stat-card"><div class="stat-value">${MOCK_MESSAGES.length}</div><div class="stat-label">全部消息</div></div>
    <div class="stat-card danger"><div class="stat-value">${unreadCount}</div><div class="stat-label">未读</div></div>
    <div class="stat-card accent"><div class="stat-value">${typeCounts['系统通知']||0}</div><div class="stat-label">系统通知</div></div>
    <div class="stat-card warning"><div class="stat-value">${typeCounts['异常告警']||0}</div><div class="stat-label">异常告警</div></div>
    <div class="stat-card success"><div class="stat-value">${typeCounts['审核通知']||0}</div><div class="stat-label">审核通知</div></div>
  </div>
  <div class="table-toolbar" style="margin-bottom:16px"><div class="filter-group">
    <select class="filter-select"><option value="">全部类型</option><option>系统通知</option><option>审核通知</option><option>异常告警</option><option>业务提醒</option></select>
    <select class="filter-select"><option value="">阅读状态</option><option>未读</option><option>已读</option></select>
    <button class="btn btn-primary btn-sm">查询</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-ghost btn-sm" onclick="showToast('success','已全部标为已读')">✓ 全部已读</button>
    <button class="btn btn-ghost btn-sm" onclick="showToast('info','清理已读消息...')">🗑 清理已读</button>
  </div></div>
  ${msgCards}
  </div>`;
}

// ==========================================
// 操作日志
// ==========================================
function renderLogOperation() {
  const rows = MOCK_OP_LOGS.map(l => `<tr>
    <td style="font-family:monospace;font-size:0.75rem;color:var(--text-muted)">${l.id}</td>
    <td style="font-weight:600">${l.user}</td>
    <td style="font-family:monospace;font-size:0.78rem">${l.account}</td>
    <td><span class="status-badge info">${l.module}</span></td>
    <td>${l.action}</td>
    <td>${l.target}</td>
    <td style="font-size:0.78rem;color:var(--text-secondary);max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${l.detail}">${l.detail}</td>
    <td style="font-family:monospace;font-size:0.75rem;color:var(--text-muted)">${l.ip}</td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${l.time}</td>
  </tr>`).join('');

  const moduleCounts = {};
  MOCK_OP_LOGS.forEach(l => { moduleCounts[l.module] = (moduleCounts[l.module]||0)+1; });

  return `<div class="fade-in"><div class="page-header"><h1>操作日志查询</h1><p>记录用户操作行为，便于审计追踪与问题排查</p></div>
  <div class="card"><div class="card-header"><h3>操作日志</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <input class="filter-input" placeholder="操作人 / 账号" style="width:140px">
    <select class="filter-select"><option value="">操作模块</option><option>订单审核</option><option>订单新建</option><option>订单调货</option><option>订单查询</option><option>后台管理</option><option>系统管理</option></select>
    <select class="filter-select"><option value="">操作类型</option><option>审核通过</option><option>新建订单</option><option>修改规则</option><option>导出数据</option><option>批量审核</option></select>
    <input class="filter-input" type="date" value="2026-03-16" style="width:140px">
    <span style="color:var(--text-muted)">~</span>
    <input class="filter-input" type="date" value="2026-03-17" style="width:140px">
    <button class="btn btn-primary btn-sm">查询</button><button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-ghost btn-sm">📥 导出日志</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th>日志ID</th><th>操作人</th><th>账号</th><th>模块</th><th>操作类型</th><th>操作对象</th><th>操作详情</th><th>IP地址</th><th>操作时间</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_OP_LOGS.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

// ==========================================
// 系统日志
// ==========================================
function renderLogSystem() {
  const levelColors = {'INFO':'info','WARN':'warning','ERROR':'danger'};
  const rows = MOCK_SYS_LOGS.map(l => `<tr>
    <td><span class="status-badge ${levelColors[l.level]||'neutral'}" style="font-family:monospace;font-weight:700;min-width:52px;text-align:center">${l.level}</span></td>
    <td style="font-family:monospace;font-size:0.78rem;font-weight:600">${l.service}</td>
    <td style="font-size:0.82rem;max-width:400px">${l.message}</td>
    <td style="font-family:monospace;font-size:0.72rem;color:var(--text-muted)">${l.traceId}</td>
    <td style="font-family:monospace;font-size:0.78rem;${l.duration.includes('30,000')?'color:var(--danger);font-weight:700':''}">${l.duration}</td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${l.time}</td>
  </tr>`).join('');

  const levelCounts = {};
  MOCK_SYS_LOGS.forEach(l => { levelCounts[l.level] = (levelCounts[l.level]||0)+1; });

  return `<div class="fade-in"><div class="page-header"><h1>系统日志查询</h1><p>查看系统运行日志，监控服务状态与异常信息</p></div>
  <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
    <div class="stat-card"><div class="stat-value">${MOCK_SYS_LOGS.length}</div><div class="stat-label">全部日志</div></div>
    <div class="stat-card info"><div class="stat-value">${levelCounts['INFO']||0}</div><div class="stat-label">INFO</div></div>
    <div class="stat-card warning"><div class="stat-value">${levelCounts['WARN']||0}</div><div class="stat-label">WARN</div></div>
    <div class="stat-card danger"><div class="stat-value">${levelCounts['ERROR']||0}</div><div class="stat-label">ERROR</div></div>
  </div>
  <div class="card"><div class="card-header"><h3>系统日志</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <select class="filter-select"><option value="">日志级别</option><option>INFO</option><option>WARN</option><option>ERROR</option></select>
    <select class="filter-select"><option value="">服务名称</option><option>oms-gateway</option><option>oms-order</option><option>oms-integration</option><option>oms-sync</option></select>
    <input class="filter-input" placeholder="关键字 / Trace ID" style="width:180px">
    <input class="filter-input" type="date" value="2026-03-16" style="width:140px">
    <span style="color:var(--text-muted)">~</span>
    <input class="filter-input" type="date" value="2026-03-17" style="width:140px">
    <button class="btn btn-primary btn-sm">查询</button><button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-ghost btn-sm">📥 导出日志</button>
    <button class="btn btn-ghost btn-sm" onclick="showToast('info','正在刷新...')">🔄 实时刷新</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th>级别</th><th>服务</th><th>日志消息</th><th>Trace ID</th><th>耗时</th><th>时间</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_SYS_LOGS.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}
