// === Admin Management Sub-Pages (pages3.js) ===

// -- Back button helper --
function settingsBackBtn() {
  return `<button class="btn btn-ghost btn-sm" onclick="navigateTo('settings', document.querySelector('[data-page=\\'settings\\']'))">
    <svg viewBox="0 0 20 20" fill="currentColor" style="width:14px;height:14px"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/></svg>
    返回系统管理
  </button>`;
}

// ==========================================
// 1. 用户管理
// ==========================================
function renderUserManage() {
  const rows = MOCK_USERS.map(u => `<tr>
    <td><input type="checkbox" class="row-check"></td>
    <td>${u.id}</td>
    <td><div style="display:flex;align-items:center;gap:8px"><div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#a78bfa);display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:600;color:white;flex-shrink:0">${u.name[0]}</div>${u.name}</div></td>
    <td>${u.account}</td>
    <td><span class="status-badge info">${u.role}</span></td>
    <td>${u.dept}</td>
    <td>${u.phone}</td>
    <td><span class="status-badge ${u.status==='启用'?'success':'danger'}">${u.status}</span></td>
    <td>${u.lastLogin}</td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick="openUserModal('编辑用户', '${u.name}')">编辑</button>
      <button class="btn btn-ghost btn-sm" onclick="showToast('success','密码已重置')">重置密码</button>
      <button class="btn btn-${u.status==='启用'?'warning':'success'} btn-sm" onclick="showToast('success','状态已更新')">${u.status==='启用'?'停用':'启用'}</button>
    </td>
  </tr>`).join('');

  return `<div class="fade-in"><div class="page-header" style="display:flex;align-items:center;gap:16px">
    ${settingsBackBtn()}
    <div><h1>用户管理</h1><p>管理系统用户信息，包括账号创建、权限分配和状态管理</p></div>
  </div>
  <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
    <div class="stat-card accent"><div class="stat-value">${MOCK_USERS.length}</div><div class="stat-label">用户总数</div></div>
    <div class="stat-card success"><div class="stat-value">${MOCK_USERS.filter(u=>u.status==='启用').length}</div><div class="stat-label">启用用户</div></div>
    <div class="stat-card warning"><div class="stat-value">${MOCK_USERS.filter(u=>u.status==='停用').length}</div><div class="stat-label">停用用户</div></div>
    <div class="stat-card info"><div class="stat-value">${MOCK_USERS.filter(u=>u.lastLogin>='2026-03-17').length}</div><div class="stat-label">今日登录</div></div>
  </div>
  <div class="card"><div class="card-header"><h3>用户列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <input class="filter-input" placeholder="用户名 / 账号" style="width:160px">
    <select class="filter-select"><option value="">全部角色</option><option>系统管理员</option><option>订单中心专员</option><option>区域订单经理</option><option>订单审核员</option><option>数据分析员</option></select>
    <select class="filter-select"><option value="">全部状态</option><option>启用</option><option>停用</option></select>
    <button class="btn btn-primary btn-sm" onclick="showToast('info','查询完成')">查询</button>
    <button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-primary btn-sm" onclick="openUserModal('新增用户')">＋ 新增用户</button>
    <button class="btn btn-ghost btn-sm">📥 导出</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th><input type="checkbox" onclick="toggleAll(this)"></th>
    <th>用户ID</th><th>用户名</th><th>账号</th><th>角色</th><th>部门</th><th>手机号</th><th>状态</th><th>最后登录</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_USERS.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function openUserModal(title, userName) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>用户名 <span class="required">*</span></label><input class="form-control" value="${userName||''}" placeholder="请输入用户名"></div>
    <div class="form-field"><label>登录账号 <span class="required">*</span></label><input class="form-control" placeholder="请输入域账号"></div></div>
    <div class="form-row"><div class="form-field"><label>所属部门 <span class="required">*</span></label><select class="form-control"><option>供应链管理中心</option><option>杭州区域中心</option><option>温州区域中心</option><option>IT技术部</option></select></div>
    <div class="form-field"><label>角色 <span class="required">*</span></label><select class="form-control"><option>订单中心专员</option><option>区域订单经理</option><option>订单审核员</option><option>数据分析员</option><option>系统管理员</option><option>只读用户</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>手机号</label><input class="form-control" placeholder="请输入手机号"></div>
    <div class="form-field"><label>邮箱</label><input class="form-control" placeholder="请输入邮箱"></div></div>
    <div class="form-row single"><div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 2. 角色管理
// ==========================================
function renderRoleManage() {
  const rows = MOCK_ROLES.map(r => `<tr>
    <td><input type="checkbox" class="row-check"></td>
    <td>${r.id}</td>
    <td><span style="font-weight:600">${r.name}</span></td>
    <td style="font-family:monospace;font-size:0.78rem;color:var(--accent-light)">${r.code}</td>
    <td style="max-width:220px;white-space:normal;font-size:0.82rem;color:var(--text-secondary)">${r.desc}</td>
    <td><span style="font-weight:600;color:var(--accent-light)">${r.users}</span></td>
    <td><span style="font-weight:600">${r.perms}</span></td>
    <td><span class="status-badge ${r.status==='启用'?'success':'danger'}">${r.status}</span></td>
    <td>${r.createTime}</td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick="openRoleModal('编辑角色')">编辑</button>
      <button class="btn btn-ghost btn-sm" onclick="openRolePermModal('${r.name}')">权限</button>
      <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button>
    </td>
  </tr>`).join('');

  return `<div class="fade-in"><div class="page-header" style="display:flex;align-items:center;gap:16px">
    ${settingsBackBtn()}
    <div><h1>角色管理</h1><p>配置系统角色及其对应的功能权限，支持细粒度权限控制</p></div>
  </div>
  <div class="card"><div class="card-header"><h3>角色列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <input class="filter-input" placeholder="角色名称 / 编码" style="width:180px">
    <select class="filter-select"><option value="">全部状态</option><option>启用</option><option>停用</option></select>
    <button class="btn btn-primary btn-sm">查询</button>
    <button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-primary btn-sm" onclick="openRoleModal('新增角色')">＋ 新增角色</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th><input type="checkbox" onclick="toggleAll(this)"></th>
    <th>角色ID</th><th>角色名称</th><th>角色编码</th><th>描述</th><th>用户数</th><th>权限数</th><th>状态</th><th>创建时间</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_ROLES.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function openRoleModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>角色名称 <span class="required">*</span></label><input class="form-control" placeholder="请输入角色名称"></div>
    <div class="form-field"><label>角色编码 <span class="required">*</span></label><input class="form-control" placeholder="请输入角色编码"></div></div>
    <div class="form-row single"><div class="form-field"><label>描述</label><textarea class="form-control" rows="3" placeholder="请输入角色描述" style="resize:vertical"></textarea></div></div>
    <div class="form-row single"><div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

function openRolePermModal(roleName) {
  document.getElementById('modal-title').textContent = `权限配置 - ${roleName}`;
  const permGroups = [
    {name:'工作台', perms:['查看仪表盘','查看趋势图','查看动态']},
    {name:'订单审核', perms:['查看列表','审核订单','批量审核','查看详情']},
    {name:'订单新建', perms:['新建订单','导入Excel','保存草稿']},
    {name:'订单查询', perms:['查看所有订单','查看本区域订单','导出数据']},
    {name:'后台管理', perms:['截止时间规则','附赠品规则','组合商品BOM']},
    {name:'数据中心', perms:['订单监控','报表查询','数据导出']},
    {name:'系统管理', perms:['用户管理','角色管理','菜单管理','基础信息']},
  ];
  document.getElementById('modal-body').innerHTML = `
    <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:16px">为角色 <b style="color:var(--text-primary)">${roleName}</b> 配置功能权限</div>
    ${permGroups.map(g=>`
      <div style="margin-bottom:16px;padding:14px;background:var(--bg-tertiary);border-radius:var(--radius-md)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <input type="checkbox" checked style="accent-color:var(--accent)">
          <span style="font-weight:600;font-size:0.88rem">${g.name}</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;padding-left:24px">
          ${g.perms.map(p=>`<label style="display:flex;align-items:center;gap:4px;font-size:0.82rem;cursor:pointer"><input type="checkbox" checked style="accent-color:var(--accent)">${p}</label>`).join('')}
        </div>
      </div>
    `).join('')}`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 3. 菜单管理
// ==========================================
function renderMenuManage() {
  const rows = MOCK_MENUS.map(m => `<tr>
    <td><input type="checkbox" class="row-check"></td>
    <td>${m.id}</td>
    <td>${m.icon} ${m.name}</td>
    <td style="font-family:monospace;font-size:0.78rem;color:var(--accent-light)">${m.code}</td>
    <td>${m.parent}</td>
    <td><span class="status-badge ${m.type==='菜单'?'info':'neutral'}">${m.type}</span></td>
    <td style="font-weight:600">${m.sort}</td>
    <td><span class="status-badge ${m.status==='显示'?'success':'warning'}">${m.status}</span></td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick="openMenuModal('编辑菜单')">编辑</button>
      <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button>
    </td>
  </tr>`).join('');

  return `<div class="fade-in"><div class="page-header" style="display:flex;align-items:center;gap:16px">
    ${settingsBackBtn()}
    <div><h1>菜单管理</h1><p>管理系统菜单结构，配置菜单显示顺序和访问权限</p></div>
  </div>
  <div class="card"><div class="card-header"><h3>菜单列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <input class="filter-input" placeholder="菜单名称" style="width:160px">
    <select class="filter-select"><option value="">菜单类型</option><option>目录</option><option>菜单</option></select>
    <select class="filter-select"><option value="">显示状态</option><option>显示</option><option>隐藏</option></select>
    <button class="btn btn-primary btn-sm">查询</button>
    <button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-primary btn-sm" onclick="openMenuModal('新增菜单')">＋ 新增菜单</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th><input type="checkbox" onclick="toggleAll(this)"></th>
    <th>菜单ID</th><th>菜单名称</th><th>菜单编码</th><th>上级菜单</th><th>类型</th><th>排序</th><th>状态</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_MENUS.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function openMenuModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>上级菜单</label><select class="form-control"><option value="">无（顶级菜单）</option><option>业务管理</option><option>后台管理</option><option>数据中心</option></select></div>
    <div class="form-field"><label>菜单类型 <span class="required">*</span></label><select class="form-control"><option>目录</option><option>菜单</option><option>按钮</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>菜单名称 <span class="required">*</span></label><input class="form-control" placeholder="请输入菜单名称"></div>
    <div class="form-field"><label>菜单编码 <span class="required">*</span></label><input class="form-control" placeholder="请输入菜单编码"></div></div>
    <div class="form-row"><div class="form-field"><label>排序</label><input class="form-control" type="number" value="1" min="0"></div>
    <div class="form-field"><label>显示状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 4. 基础信息管理
// ==========================================
function renderBaseInfoManage() {
  const rows = MOCK_BASE_INFO.map(b => `<tr>
    <td>${b.id}</td>
    <td><span class="status-badge info">${b.type}</span></td>
    <td style="font-weight:600">${b.code}</td>
    <td>${b.name}</td>
    <td style="font-family:monospace;font-size:0.78rem">${b.sapCode}</td>
    <td><span class="status-badge ${b.status==='有效'?'success':'danger'}">${b.status}</span></td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${b.syncTime}</td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick="showBaseInfoDetail('${b.code}','${b.name}','${b.type}')">详情</button>
    </td>
  </tr>`).join('');

  const typeStats = {};
  MOCK_BASE_INFO.forEach(b => { typeStats[b.type] = (typeStats[b.type]||0)+1; });

  return `<div class="fade-in"><div class="page-header" style="display:flex;align-items:center;gap:16px">
    ${settingsBackBtn()}
    <div><h1>基础信息管理</h1><p>快速查询获取基础信息，便于系统运维人员高效沟通问题</p></div>
  </div>
  <div class="stats-grid" style="grid-template-columns:repeat(${Object.keys(typeStats).length},1fr);margin-bottom:20px">
    ${Object.entries(typeStats).map(([k,v],i)=>{
      const cls=['accent','success','info','warning','neutral'][i%5];
      return `<div class="stat-card ${cls}"><div class="stat-value">${v}</div><div class="stat-label">${k}</div></div>`;
    }).join('')}
  </div>
  <div class="card"><div class="card-header"><h3>基础信息列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <select class="filter-select"><option value="">信息类型</option><option>销售组织</option><option>工厂</option><option>装运点</option><option>分销渠道</option><option>产品组</option></select>
    <input class="filter-input" placeholder="编码 / 名称" style="width:180px">
    <select class="filter-select"><option value="">状态</option><option>有效</option><option>无效</option></select>
    <button class="btn btn-primary btn-sm">查询</button>
    <button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-ghost btn-sm" onclick="showToast('info','同步中，请稍后...')">🔄 从SAP同步</button>
    <button class="btn btn-ghost btn-sm">📥 导出</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th>ID</th><th>类型</th><th>编码</th><th>名称</th><th>SAP编码</th><th>状态</th><th>同步时间</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_BASE_INFO.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function showBaseInfoDetail(code, name, type) {
  document.getElementById('modal-title').textContent = `基础信息详情 - ${name}`;
  document.getElementById('modal-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:0.85rem">
      ${[['信息类型',type],['编码',code],['名称',name],['SAP编码',code],['状态','<span class=\"status-badge success\">有效</span>'],['最近同步','2026-03-17 06:00'],['创建时间','2025-01-01'],['数据来源','SAP ECC']].map(([k,v])=>`<div><span style="color:var(--text-muted)">${k}：</span><span style="font-weight:500">${v}</span></div>`).join('')}
    </div>`;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal()">关闭</button>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 5. 关联规则管理
// ==========================================
function renderAssocRuleManage() {
  const rows = MOCK_ASSOC_RULES.map(r => `<tr>
    <td><input type="checkbox" class="row-check"></td>
    <td>${r.id}</td>
    <td>${r.org}</td>
    <td>${r.orgName}</td>
    <td>${r.channel}</td>
    <td>${r.channelName}</td>
    <td>${r.factory}</td>
    <td>${r.factoryName}</td>
    <td>${r.shipPoint}</td>
    <td>${r.shipPointName}</td>
    <td>${r.prodGroup}</td>
    <td>${r.prodGroupName}</td>
    <td><span class="status-badge ${r.status==='启用'?'success':'danger'}">${r.status}</span></td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick="openAssocRuleModal('编辑关联规则')">编辑</button>
      <button class="btn btn-danger btn-sm" onclick="showToast('success','删除成功')">删除</button>
    </td>
  </tr>`).join('');

  return `<div class="fade-in"><div class="page-header" style="display:flex;align-items:center;gap:16px">
    ${settingsBackBtn()}
    <div><h1>关联规则管理</h1><p>查询获取组织的关联规则，定位业务标准是否正常使用。关联维度：销售组织 → 分销渠道 → 工厂 → 装运点 → 产品组</p></div>
  </div>
  <div class="card"><div class="card-header"><h3>关联规则列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <select class="filter-select"><option value="">销售组织</option><option>N001-杭州区</option><option>W001-温州区</option><option>C001-常州区</option></select>
    <select class="filter-select"><option value="">分销渠道</option><option>10-经销商</option><option>20-直营</option></select>
    <select class="filter-select"><option value="">状态</option><option>启用</option><option>停用</option></select>
    <button class="btn btn-primary btn-sm">查询</button>
    <button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-primary btn-sm" onclick="openAssocRuleModal('新增关联规则')">＋ 新增</button>
    <button class="btn btn-danger btn-sm">批量删除</button>
    <button class="btn btn-ghost btn-sm">📥 导出</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th><input type="checkbox" onclick="toggleAll(this)"></th>
    <th>ID</th><th>销售组织</th><th>组织名称</th><th>分销渠道</th><th>渠道名称</th><th>工厂</th><th>工厂名称</th><th>装运点</th><th>装运点名称</th><th>产品组</th><th>产品组名称</th><th>状态</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_ASSOC_RULES.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function openAssocRuleModal(title) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = `
    <div class="form-row"><div class="form-field"><label>销售组织 <span class="required">*</span></label><select class="form-control"><option>N001-杭州区销售组织</option><option>W001-温州区销售组织</option><option>C001-常州区销售组织</option></select></div>
    <div class="form-field"><label>分销渠道 <span class="required">*</span></label><select class="form-control"><option>10-经销商渠道</option><option>20-直营渠道</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>工厂 <span class="required">*</span></label><select class="form-control"><option>1100-平阳工厂</option><option>1200-杭州工厂</option></select></div>
    <div class="form-field"><label>装运点 <span class="required">*</span></label><select class="form-control"><option>1101-平阳中心仓</option><option>1201-杭州中心仓</option></select></div></div>
    <div class="form-row"><div class="form-field"><label>产品组 <span class="required">*</span></label><select class="form-control"><option>01-乳制品</option><option>02-烘焙食品</option><option>03-饮料</option></select></div>
    <div class="form-field"><label>状态</label><label class="toggle-switch" style="margin-top:4px"><input type="checkbox" checked><span class="toggle-slider"></span></label></div></div>`;
  document.getElementById('modal-overlay').classList.add('show');
}

// ==========================================
// 6. 主数据管理
// ==========================================
function renderMasterDataManage() {
  const rows = MOCK_MASTER_DATA.map(m => `<tr>
    <td>${m.id}</td>
    <td><span class="status-badge ${m.type==='客户主数据'?'info':m.type==='物料主数据'?'accent':'warning'}" style="${m.type==='物料主数据'?'background:var(--accent-bg);color:var(--accent-light)':''}">${m.type}</span></td>
    <td style="font-weight:600">${m.code}</td>
    <td>${m.name}</td>
    <td>${m.org}</td>
    <td>${m.orgName}</td>
    <td>${m.custGroup}</td>
    <td>${m.payerCode}</td>
    <td><span class="status-badge ${m.status==='正常'?'success':m.status==='冻结'?'danger':'warning'}">${m.status}</span></td>
    <td style="font-size:0.78rem;color:var(--text-muted)">${m.updateTime}</td>
    <td>
      <button class="btn btn-ghost btn-sm" onclick="showMasterDataDetail('${m.code}','${m.name}','${m.type}')">详情</button>
    </td>
  </tr>`).join('');

  const typeCount = {};
  MOCK_MASTER_DATA.forEach(m => { typeCount[m.type] = (typeCount[m.type]||0)+1; });

  return `<div class="fade-in"><div class="page-header" style="display:flex;align-items:center;gap:16px">
    ${settingsBackBtn()}
    <div><h1>主数据管理</h1><p>管理系统核心主数据，确保数据的准确性和一致性</p></div>
  </div>
  <div class="stats-grid" style="grid-template-columns:repeat(${Object.keys(typeCount).length},1fr);margin-bottom:20px">
    ${Object.entries(typeCount).map(([k,v],i)=>{
      const cls=['info','accent','warning'][i%3];
      return `<div class="stat-card ${cls}"><div class="stat-value">${v}</div><div class="stat-label">${k}</div></div>`;
    }).join('')}
  </div>
  <div class="card"><div class="card-header"><h3>主数据列表</h3></div><div class="card-body">
  <div class="table-toolbar"><div class="filter-group">
    <select class="filter-select"><option value="">数据类型</option><option>客户主数据</option><option>物料主数据</option><option>价格主数据</option></select>
    <input class="filter-input" placeholder="编码 / 名称" style="width:180px">
    <select class="filter-select"><option value="">销售组织</option><option>N001-杭州区</option><option>W001-温州区</option></select>
    <select class="filter-select"><option value="">状态</option><option>正常</option><option>冻结</option></select>
    <button class="btn btn-primary btn-sm">查询</button>
    <button class="btn btn-ghost btn-sm">重置</button>
  </div><div class="toolbar-actions">
    <button class="btn btn-ghost btn-sm" onclick="showToast('info','同步中，请稍后...')">🔄 从SAP同步</button>
    <button class="btn btn-ghost btn-sm">📥 导出</button>
  </div></div>
  <div style="overflow-x:auto"><table class="data-table"><thead><tr>
    <th>ID</th><th>数据类型</th><th>编码</th><th>名称</th><th>销售组织</th><th>组织名称</th><th>客户组</th><th>付款方</th><th>状态</th><th>更新时间</th><th>操作</th>
  </tr></thead><tbody>${rows}</tbody></table></div>
  <div class="pagination"><span>共 ${MOCK_MASTER_DATA.length} 条记录</span><div class="pagination-btns"><button>上一页</button><button class="active">1</button><button>下一页</button></div></div>
  </div></div></div>`;
}

function showMasterDataDetail(code, name, type) {
  document.getElementById('modal-title').textContent = `主数据详情 - ${name}`;
  const item = MOCK_MASTER_DATA.find(m => m.code === code) || MOCK_MASTER_DATA[0];
  document.getElementById('modal-body').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:0.85rem">
      ${[['数据类型',type],['编码',code],['名称',name],['销售组织',`${item.org} ${item.orgName}`],['客户组',item.custGroup],['付款方编码',item.payerCode],['状态',`<span class="status-badge ${item.status==='正常'?'success':'danger'}">${item.status}</span>`],['更新时间',item.updateTime]].map(([k,v])=>`<div><span style="color:var(--text-muted)">${k}：</span><span style="font-weight:500">${v}</span></div>`).join('')}
    </div>
    ${type === '客户主数据' ? `
    <h4 style="margin:20px 0 12px;font-size:0.92rem">关联信息</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;font-size:0.85rem">
      <div><span style="color:var(--text-muted)">分销渠道：</span><span style="font-weight:500">10 - 经销商渠道</span></div>
      <div><span style="color:var(--text-muted)">客户类型：</span><span style="font-weight:500">${item.custGroup}</span></div>
      <div><span style="color:var(--text-muted)">信贷额度：</span><span style="font-weight:500">¥200,000.00</span></div>
      <div><span style="color:var(--text-muted)">信贷使用：</span><span style="font-weight:500">¥45,820.00</span></div>
    </div>` : ''}`;
  document.getElementById('modal-footer').innerHTML = `<button class="btn btn-ghost" onclick="closeModal()">关闭</button>`;
  document.getElementById('modal-overlay').classList.add('show');
}
