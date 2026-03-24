// === Mock Data ===
const MOCK_ORDERS = [
  {id:'20260317100001',cust:'N1001',custName:'染墨青茶肆萧山奥体印象城店',area:'N001',areaName:'杭州',type:'ZR01',typeName:'拉式订单',status:'未审核',user:'张三',date:'2026-03-17',delivery:'2026-03-19',amount:'¥12,580.00'},
  {id:'20260317100002',cust:'N1002',custName:'染墨青茶肆国大店',area:'N001',areaName:'杭州',type:'ZR01',typeName:'拉式订单',status:'未审核',user:'李四',date:'2026-03-17',delivery:'2026-03-19',amount:'¥8,340.00'},
  {id:'20260317100003',cust:'20694',custName:'瑞安市婷轩副食品经营部',area:'W001',areaName:'温州',type:'ZN20',typeName:'销售订单',status:'审核成功',user:'王五',date:'2026-03-17',delivery:'2026-03-19',amount:'¥23,100.00'},
  {id:'20260316094500',cust:'N1003',custName:'一鸣真鲜奶吧城西店',area:'N001',areaName:'杭州',type:'ZW11',typeName:'紧急加单',status:'审核成功',user:'赵六',date:'2026-03-16',delivery:'2026-03-18',amount:'¥5,620.00'},
  {id:'20260316083000',cust:'1001',custName:'温州横渎经营部(横渎奶吧)',area:'W001',areaName:'温州',type:'ZR01',typeName:'拉式订单',status:'部分处理',user:'ZNYH',date:'2026-03-16',delivery:'2026-03-18',amount:'¥15,200.00'},
  {id:'20260315112000',cust:'N1005',custName:'一鸣真鲜奶吧滨江店',area:'N001',areaName:'杭州',type:'ZN20',typeName:'销售订单',status:'完全处理',user:'钱七',date:'2026-03-15',delivery:'2026-03-17',amount:'¥9,870.00'},
  {id:'20260315093000',cust:'20695',custName:'苍南龙港鲜乐坊食品店',area:'W001',areaName:'温州',type:'ZR01',typeName:'拉式订单',status:'完全处理',user:'孙八',date:'2026-03-15',delivery:'2026-03-17',amount:'¥18,430.00'},
  {id:'20260314150000',cust:'N1006',custName:'染墨青茶肆拱墅万达店',area:'N001',areaName:'杭州',type:'ZR01',typeName:'拉式订单',status:'完全处理',user:'张三',date:'2026-03-14',delivery:'2026-03-16',amount:'¥7,260.00'},
];

const MOCK_DEADLINE_RULES = [
  {area:'N001',areaName:'杭州',saleArea:'N00001',saleAreaName:'奶茶事业部杭州区',cust:'',custName:'',sku:'',skuName:'',days:2,time:'15:00',enabled:true},
  {area:'N001',areaName:'杭州',saleArea:'N00001',saleAreaName:'奶茶事业部杭州区',cust:'N1002',custName:'染墨青茶肆国大店',sku:'400330',skuName:'巧克力富力亚',days:1,time:'12:00',enabled:true},
  {area:'W001',areaName:'温州',saleArea:'W00001',saleAreaName:'温州区销售组织',cust:'',custName:'',sku:'',skuName:'',days:2,time:'10:00',enabled:true},
  {area:'W001',areaName:'温州',saleArea:'',saleAreaName:'',cust:'',custName:'',sku:'400293',skuName:'DIY酸奶',days:3,time:'14:00',enabled:false},
  {area:'C001',areaName:'常州',saleArea:'C00001',saleAreaName:'常州区销售组织',cust:'',custName:'',sku:'',skuName:'',days:2,time:'13:00',enabled:true},
];

const MOCK_GIFT_RULES = [
  {mainSku:'400267',mainName:'一鸣热奶饮料210ML',mainQty:1,giftSku:'32261',giftName:'热奶20连排吸管16*3.8',giftQty:1,enabled:true},
  {mainSku:'400293',mainName:'DIY酸奶',mainQty:10,giftSku:'400350',giftName:'酸奶勺(赠品)',giftQty:10,enabled:true},
  {mainSku:'411237',mainName:'醇奶家纯牛奶200ml',mainQty:5,giftSku:'32262',giftName:'牛奶吸管',giftQty:5,enabled:false},
];

const MOCK_BOM_RULES = [
  {mainSku:'411851',mainName:'5元套餐(醇奶家+大米蒸蛋糕)',mainQty:1,subSku:'411237',subName:'醇奶家纯牛奶200ml',subQty:1},
  {mainSku:'411851',mainName:'5元套餐(醇奶家+大米蒸蛋糕)',mainQty:1,subSku:'400104',subName:'大米蒸蛋糕',subQty:1},
  {mainSku:'411852',mainName:'8元套餐(双拼)',mainQty:1,subSku:'400267',subName:'一鸣热奶饮料210ML',subQty:1},
  {mainSku:'411852',mainName:'8元套餐(双拼)',mainQty:1,subSku:'400330',subName:'巧克力富力亚',subQty:1},
];

const ACTIVITIES = [
  {type:'success',text:'订单 20260317100003 审核通过，已进入建单流程',time:'10分钟前'},
  {type:'info',text:'ZNYH系统同步了 238 条奶吧渠道订单',time:'25分钟前'},
  {type:'warning',text:'杭州区域截止时间规则即将触发（15:00）',time:'32分钟前'},
  {type:'success',text:'订单 20260316094500 已完成WMS过账',time:'1小时前'},
  {type:'danger',text:'物料 400330 在温州销售组织中已冻结',time:'2小时前'},
  {type:'info',text:'SAP基础数据同步完成，更新 1,256 条记录',time:'3小时前'},
];

const ORDER_ITEMS = [
  {sku:'400293',name:'DIY酸奶',qty:200,deliveryQty:200,spec:'1',unit:'瓶',price:'40.00'},
  {sku:'400330',name:'巧克力富力亚',qty:100,deliveryQty:100,spec:'1',unit:'个',price:'12.50'},
  {sku:'400267',name:'一鸣热奶饮料210ML',qty:50,deliveryQty:50,spec:'1',unit:'瓶',price:'8.00'},
];

// === Admin Management Mock Data ===
const MOCK_USERS = [
  {id:'U001',name:'陈文静',account:'chenwj',role:'订单中心专员',dept:'供应链管理中心',phone:'138****6789',status:'启用',lastLogin:'2026-03-17 09:12'},
  {id:'U002',name:'张三',account:'zhangs',role:'区域订单经理',dept:'杭州区域中心',phone:'139****1234',status:'启用',lastLogin:'2026-03-17 08:45'},
  {id:'U003',name:'李四',account:'lis',role:'区域订单经理',dept:'杭州区域中心',phone:'137****5678',status:'启用',lastLogin:'2026-03-17 09:01'},
  {id:'U004',name:'王五',account:'wangw',role:'区域订单经理',dept:'温州区域中心',phone:'136****9012',status:'启用',lastLogin:'2026-03-16 17:30'},
  {id:'U005',name:'赵六',account:'zhaol',role:'订单审核员',dept:'供应链管理中心',phone:'135****3456',status:'启用',lastLogin:'2026-03-17 08:50'},
  {id:'U006',name:'钱七',account:'qianq',role:'订单审核员',dept:'杭州区域中心',phone:'134****7890',status:'停用',lastLogin:'2026-03-10 14:20'},
  {id:'U007',name:'孙八',account:'sunb',role:'数据分析员',dept:'温州区域中心',phone:'133****2345',status:'启用',lastLogin:'2026-03-17 08:30'},
  {id:'U008',name:'周九',account:'zhouj',role:'系统管理员',dept:'IT技术部',phone:'132****6789',status:'启用',lastLogin:'2026-03-17 09:15'},
];

const MOCK_ROLES = [
  {id:'R001',name:'系统管理员',code:'ADMIN',desc:'系统最高权限，管理所有功能',users:2,perms:32,status:'启用',createTime:'2025-01-01'},
  {id:'R002',name:'订单中心专员',code:'ORDER_STAFF',desc:'订单审核、查询、新建、报表等全流程操作',users:8,perms:24,status:'启用',createTime:'2025-01-01'},
  {id:'R003',name:'区域订单经理',code:'AREA_MGR',desc:'负责所辖区域的订单管理与审核',users:12,perms:18,status:'启用',createTime:'2025-01-15'},
  {id:'R004',name:'订单审核员',code:'AUDITOR',desc:'仅负责订单审核操作',users:6,perms:8,status:'启用',createTime:'2025-02-01'},
  {id:'R005',name:'数据分析员',code:'ANALYST',desc:'查看报表、监控数据，不可操作订单',users:4,perms:6,status:'启用',createTime:'2025-03-01'},
  {id:'R006',name:'只读用户',code:'READONLY',desc:'仅可查看订单信息，无操作权限',users:96,perms:4,status:'启用',createTime:'2025-03-15'},
];

const MOCK_MENUS = [
  {id:'M001',name:'工作台',code:'dashboard',parent:'—',icon:'📊',sort:1,type:'菜单',status:'显示'},
  {id:'M002',name:'业务管理',code:'biz',parent:'—',icon:'📋',sort:2,type:'目录',status:'显示'},
  {id:'M003',name:'订单审核',code:'order-review',parent:'业务管理',icon:'✅',sort:1,type:'菜单',status:'显示'},
  {id:'M004',name:'订单新建',code:'order-create',parent:'业务管理',icon:'➕',sort:2,type:'菜单',status:'显示'},
  {id:'M005',name:'订单查询',code:'order-query',parent:'业务管理',icon:'🔍',sort:3,type:'菜单',status:'显示'},
  {id:'M006',name:'后台管理',code:'admin',parent:'—',icon:'⚙️',sort:3,type:'目录',status:'显示'},
  {id:'M007',name:'截止时间规则',code:'rule-deadline',parent:'后台管理',icon:'⏰',sort:1,type:'菜单',status:'显示'},
  {id:'M008',name:'附赠品规则',code:'rule-gift',parent:'后台管理',icon:'🎁',sort:2,type:'菜单',status:'显示'},
  {id:'M009',name:'组合商品BOM',code:'rule-bom',parent:'后台管理',icon:'📦',sort:3,type:'菜单',status:'显示'},
  {id:'M010',name:'数据中心',code:'data',parent:'—',icon:'📈',sort:4,type:'目录',status:'显示'},
  {id:'M011',name:'订单监控',code:'monitor',parent:'数据中心',icon:'🖥️',sort:1,type:'菜单',status:'显示'},
  {id:'M012',name:'报表查询',code:'reports',parent:'数据中心',icon:'📊',sort:2,type:'菜单',status:'显示'},
];

const MOCK_BASE_INFO = [
  {id:'B001',type:'销售组织',code:'N001',name:'奶茶事业部杭州区销售组织',sapCode:'N001',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B002',type:'销售组织',code:'W001',name:'温州区销售组织',sapCode:'W001',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B003',type:'销售组织',code:'C001',name:'常州区销售组织',sapCode:'C001',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B004',type:'工厂',code:'1100',name:'一鸣食品平阳工厂',sapCode:'1100',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B005',type:'工厂',code:'1200',name:'一鸣食品杭州工厂',sapCode:'1200',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B006',type:'装运点',code:'1101',name:'平阳中心仓装运点',sapCode:'1101',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B007',type:'装运点',code:'1201',name:'杭州中心仓装运点',sapCode:'1201',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B008',type:'分销渠道',code:'10',name:'经销商渠道',sapCode:'10',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B009',type:'分销渠道',code:'20',name:'直营渠道',sapCode:'20',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B010',type:'产品组',code:'01',name:'乳制品',sapCode:'01',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B011',type:'产品组',code:'02',name:'烘焙食品',sapCode:'02',status:'有效',syncTime:'2026-03-17 06:00'},
  {id:'B012',type:'产品组',code:'03',name:'饮料',sapCode:'03',status:'有效',syncTime:'2026-03-17 06:00'},
];

const MOCK_ASSOC_RULES = [
  {id:'A001',org:'N001',orgName:'杭州区销售组织',channel:'10',channelName:'经销商渠道',factory:'1200',factoryName:'杭州工厂',shipPoint:'1201',shipPointName:'杭州中心仓装运点',prodGroup:'01',prodGroupName:'乳制品',status:'启用'},
  {id:'A002',org:'N001',orgName:'杭州区销售组织',channel:'10',channelName:'经销商渠道',factory:'1200',factoryName:'杭州工厂',shipPoint:'1201',shipPointName:'杭州中心仓装运点',prodGroup:'02',prodGroupName:'烘焙食品',status:'启用'},
  {id:'A003',org:'N001',orgName:'杭州区销售组织',channel:'20',channelName:'直营渠道',factory:'1200',factoryName:'杭州工厂',shipPoint:'1201',shipPointName:'杭州中心仓装运点',prodGroup:'01',prodGroupName:'乳制品',status:'启用'},
  {id:'A004',org:'W001',orgName:'温州区销售组织',channel:'10',channelName:'经销商渠道',factory:'1100',factoryName:'平阳工厂',shipPoint:'1101',shipPointName:'平阳中心仓装运点',prodGroup:'01',prodGroupName:'乳制品',status:'启用'},
  {id:'A005',org:'W001',orgName:'温州区销售组织',channel:'10',channelName:'经销商渠道',factory:'1100',factoryName:'平阳工厂',shipPoint:'1101',shipPointName:'平阳中心仓装运点',prodGroup:'03',prodGroupName:'饮料',status:'启用'},
  {id:'A006',org:'C001',orgName:'常州区销售组织',channel:'10',channelName:'经销商渠道',factory:'1200',factoryName:'杭州工厂',shipPoint:'1201',shipPointName:'杭州中心仓装运点',prodGroup:'01',prodGroupName:'乳制品',status:'停用'},
];

const MOCK_MASTER_DATA = [
  {id:'MD001',type:'客户主数据',code:'N1001',name:'染墨青茶肆萧山奥体印象城店',org:'N001',orgName:'杭州区销售组织',custGroup:'奶茶门店',payerCode:'N1001',status:'正常',updateTime:'2026-03-16'},
  {id:'MD002',type:'客户主数据',code:'N1002',name:'染墨青茶肆国大店',org:'N001',orgName:'杭州区销售组织',custGroup:'奶茶门店',payerCode:'N1002',status:'正常',updateTime:'2026-03-16'},
  {id:'MD003',type:'客户主数据',code:'20694',name:'瑞安市婷轩副食品经营部',org:'W001',orgName:'温州区销售组织',custGroup:'经销商',payerCode:'20694',status:'正常',updateTime:'2026-03-15'},
  {id:'MD004',type:'物料主数据',code:'400293',name:'DIY酸奶',org:'—',orgName:'全部',custGroup:'—',payerCode:'—',status:'正常',updateTime:'2026-03-17'},
  {id:'MD005',type:'物料主数据',code:'400330',name:'巧克力富力亚',org:'—',orgName:'全部',custGroup:'—',payerCode:'—',status:'正常',updateTime:'2026-03-17'},
  {id:'MD006',type:'物料主数据',code:'400267',name:'一鸣热奶饮料210ML',org:'—',orgName:'全部',custGroup:'—',payerCode:'—',status:'正常',updateTime:'2026-03-17'},
  {id:'MD007',type:'物料主数据',code:'411237',name:'醇奶家纯牛奶200ml',org:'—',orgName:'全部',custGroup:'—',payerCode:'—',status:'正常',updateTime:'2026-03-17'},
  {id:'MD008',type:'价格主数据',code:'PR001',name:'N001标准价格表-乳制品',org:'N001',orgName:'杭州区销售组织',custGroup:'—',payerCode:'—',status:'正常',updateTime:'2026-03-15'},
  {id:'MD009',type:'价格主数据',code:'PR002',name:'W001标准价格表-乳制品',org:'W001',orgName:'温州区销售组织',custGroup:'—',payerCode:'—',status:'正常',updateTime:'2026-03-15'},
  {id:'MD010',type:'客户主数据',code:'N1008',name:'一鸣真鲜奶吧临平店',org:'N001',orgName:'杭州区销售组织',custGroup:'奶茶门店',payerCode:'N1008',status:'冻结',updateTime:'2026-03-14'},
];

// === 不可要货规则 ===
const MOCK_NO_ORDER_RULES = [
  {id:'NO001',area:'N001',areaName:'杭州',saleArea:'N00001',saleAreaName:'奶茶事业部杭州区',cust:'',custName:'',sku:'400350',skuName:'酸奶勺(赠品)',reason:'赠品物料不可单独要货',enabled:true,createTime:'2026-01-15'},
  {id:'NO002',area:'W001',areaName:'温州',saleArea:'',saleAreaName:'',cust:'20694',custName:'瑞安市婷轩副食品经营部',sku:'411852',skuName:'8元套餐(双拼)',reason:'该客户已终止套餐合作',enabled:true,createTime:'2026-02-20'},
  {id:'NO003',area:'N001',areaName:'杭州',saleArea:'N00001',saleAreaName:'奶茶事业部杭州区',cust:'',custName:'',sku:'400104',skuName:'大米蒸蛋糕',reason:'杭州区暂停供应',enabled:false,createTime:'2026-03-01'},
  {id:'NO004',area:'C001',areaName:'常州',saleArea:'C00001',saleAreaName:'常州区销售组织',cust:'',custName:'',sku:'',skuName:'',reason:'常州区全品类暂停要货',enabled:false,createTime:'2026-03-10'},
  {id:'NO005',area:'W001',areaName:'温州',saleArea:'W00001',saleAreaName:'温州区销售组织',cust:'',custName:'',sku:'411237',skuName:'醇奶家纯牛奶200ml',reason:'临时停产',enabled:true,createTime:'2026-03-12'},
];

// === 紧急加单数量 ===
const MOCK_URGENT_RULES = [
  {id:'UR001',area:'N001',areaName:'杭州',sku:'400293',skuName:'DIY酸奶',maxQty:500,unit:'瓶',currentUsed:320,enabled:true,createTime:'2026-01-10'},
  {id:'UR002',area:'N001',areaName:'杭州',sku:'400267',skuName:'一鸣热奶饮料210ML',maxQty:300,unit:'瓶',currentUsed:180,enabled:true,createTime:'2026-01-10'},
  {id:'UR003',area:'N001',areaName:'杭州',sku:'400330',skuName:'巧克力富力亚',maxQty:200,unit:'个',currentUsed:200,enabled:true,createTime:'2026-02-01'},
  {id:'UR004',area:'W001',areaName:'温州',sku:'400293',skuName:'DIY酸奶',maxQty:400,unit:'瓶',currentUsed:156,enabled:true,createTime:'2026-01-10'},
  {id:'UR005',area:'W001',areaName:'温州',sku:'411237',skuName:'醇奶家纯牛奶200ml',maxQty:600,unit:'瓶',currentUsed:420,enabled:true,createTime:'2026-01-15'},
  {id:'UR006',area:'C001',areaName:'常州',sku:'400293',skuName:'DIY酸奶',maxQty:200,unit:'瓶',currentUsed:45,enabled:false,createTime:'2026-02-15'},
];

// === 调货规则 ===
const MOCK_TRANSFER_RULES = [
  {id:'TR001',fromArea:'N001',fromAreaName:'杭州',toArea:'W001',toAreaName:'温州',transGroup:'01',transGroupName:'冷藏运输组',advanceDays:1,cutoffTime:'14:00',enabled:true,createTime:'2026-01-20'},
  {id:'TR002',fromArea:'N001',fromAreaName:'杭州',toArea:'C001',toAreaName:'常州',transGroup:'01',transGroupName:'冷藏运输组',advanceDays:2,cutoffTime:'10:00',enabled:true,createTime:'2026-01-20'},
  {id:'TR003',fromArea:'W001',fromAreaName:'温州',toArea:'N001',toAreaName:'杭州',transGroup:'02',transGroupName:'常温运输组',advanceDays:1,cutoffTime:'16:00',enabled:true,createTime:'2026-02-01'},
  {id:'TR004',fromArea:'W001',fromAreaName:'温州',toArea:'C001',toAreaName:'常州',transGroup:'01',transGroupName:'冷藏运输组',advanceDays:3,cutoffTime:'09:00',enabled:false,createTime:'2026-02-10'},
  {id:'TR005',fromArea:'C001',fromAreaName:'常州',toArea:'N001',toAreaName:'杭州',transGroup:'02',transGroupName:'常温运输组',advanceDays:2,cutoffTime:'12:00',enabled:true,createTime:'2026-03-01'},
];

// === 定时审核规则 ===
const MOCK_AUTO_AUDIT_RULES = [
  {id:'AA001',area:'N001',areaName:'杭州',advanceDays:2,auditTime:'06:00',orderType:'ZR01',orderTypeName:'拉式订单',enabled:true,createTime:'2026-01-05'},
  {id:'AA002',area:'N001',areaName:'杭州',advanceDays:1,auditTime:'08:00',orderType:'ZN20',orderTypeName:'销售订单',enabled:true,createTime:'2026-01-05'},
  {id:'AA003',area:'W001',areaName:'温州',advanceDays:2,auditTime:'06:30',orderType:'ZR01',orderTypeName:'拉式订单',enabled:true,createTime:'2026-01-10'},
  {id:'AA004',area:'W001',areaName:'温州',advanceDays:1,auditTime:'07:30',orderType:'ZN20',orderTypeName:'销售订单',enabled:true,createTime:'2026-01-10'},
  {id:'AA005',area:'C001',areaName:'常州',advanceDays:2,auditTime:'06:00',orderType:'ZR01',orderTypeName:'拉式订单',enabled:true,createTime:'2026-02-01'},
  {id:'AA006',area:'N001',areaName:'杭州',advanceDays:0,auditTime:'10:00',orderType:'ZW11',orderTypeName:'紧急加单',enabled:false,createTime:'2026-03-01'},
];

// === 物流拆单分类 ===
const MOCK_SPLIT_RULES = [
  {id:'SP001',transGroup:'01',transGroupName:'冷藏运输组',loadGroup:'A',loadGroupName:'冷链A类',category:'低温乳制品',splitPriority:1,tempRange:'-2~8℃',enabled:true,createTime:'2026-01-01'},
  {id:'SP002',transGroup:'01',transGroupName:'冷藏运输组',loadGroup:'B',loadGroupName:'冷链B类',category:'低温饮品',splitPriority:2,tempRange:'-2~8℃',enabled:true,createTime:'2026-01-01'},
  {id:'SP003',transGroup:'02',transGroupName:'常温运输组',loadGroup:'C',loadGroupName:'常温A类',category:'烘焙食品',splitPriority:1,tempRange:'15~25℃',enabled:true,createTime:'2026-01-01'},
  {id:'SP004',transGroup:'02',transGroupName:'常温运输组',loadGroup:'D',loadGroupName:'常温B类',category:'常温饮料',splitPriority:2,tempRange:'15~25℃',enabled:true,createTime:'2026-01-01'},
  {id:'SP005',transGroup:'03',transGroupName:'混合运输组',loadGroup:'E',loadGroupName:'混合类',category:'组合套餐',splitPriority:3,tempRange:'多温区',enabled:false,createTime:'2026-02-15'},
];

// === 奶吧开闭店 ===
const MOCK_STORE_STATUS = [
  {id:'SS001',storeCode:'MB001',storeName:'一鸣真鲜奶吧城西银泰店',area:'N001',areaName:'杭州',status:'营业中',openDate:'2024-06-15',closeDate:'—',reopenDate:'—',permCloseDate:'—',oaFlow:'—',updateTime:'2026-03-17'},
  {id:'SS002',storeCode:'MB002',storeName:'一鸣真鲜奶吧滨江宝龙店',area:'N001',areaName:'杭州',status:'营业中',openDate:'2024-08-20',closeDate:'—',reopenDate:'—',permCloseDate:'—',oaFlow:'—',updateTime:'2026-03-17'},
  {id:'SS003',storeCode:'MB003',storeName:'一鸣真鲜奶吧鹿城万达店',area:'W001',areaName:'温州',status:'临时闭店',openDate:'2023-12-01',closeDate:'2026-03-10',reopenDate:'2026-04-01',permCloseDate:'—',oaFlow:'RT107-2026031001',updateTime:'2026-03-10'},
  {id:'SS004',storeCode:'MB004',storeName:'一鸣真鲜奶吧瑞安玉海店',area:'W001',areaName:'温州',status:'营业中',openDate:'2024-03-18',closeDate:'—',reopenDate:'—',permCloseDate:'—',oaFlow:'—',updateTime:'2026-03-15'},
  {id:'SS005',storeCode:'MB005',storeName:'一鸣真鲜奶吧武进万达店',area:'C001',areaName:'常州',status:'永久闭店',openDate:'2023-06-01',closeDate:'2025-12-31',reopenDate:'—',permCloseDate:'2025-12-31',oaFlow:'RT143-2025123101',updateTime:'2025-12-31'},
  {id:'SS006',storeCode:'MB006',storeName:'一鸣真鲜奶吧新北万达店',area:'C001',areaName:'常州',status:'重新开业',openDate:'2024-01-15',closeDate:'2025-11-01',reopenDate:'2026-02-01',permCloseDate:'—',oaFlow:'RT109-2026020101',updateTime:'2026-02-01'},
  {id:'SS007',storeCode:'MB007',storeName:'一鸣真鲜奶吧萧山银隆店',area:'N001',areaName:'杭州',status:'营业中',openDate:'2025-09-10',closeDate:'—',reopenDate:'—',permCloseDate:'—',oaFlow:'—',updateTime:'2026-03-16'},
];

// === 订单调货 ===
const MOCK_TRANSFERS = [
  {id:'TF20260317001',fromCust:'N1001',fromCustName:'染墨青茶肆萧山奥体印象城店',fromArea:'N001',fromAreaName:'杭州',toCust:'N1002',toCustName:'染墨青茶肆国大店',toArea:'N001',toAreaName:'杭州',sku:'400293',skuName:'DIY酸奶',qty:50,unit:'瓶',status:'待审核',user:'张三',date:'2026-03-17',delivery:'2026-03-19'},
  {id:'TF20260317002',fromCust:'N1002',fromCustName:'染墨青茶肆国大店',fromArea:'N001',fromAreaName:'杭州',toCust:'N1003',toCustName:'一鸣真鲜奶吧城西店',toArea:'N001',toAreaName:'杭州',sku:'400267',skuName:'一鸣热奶饮料210ML',qty:30,unit:'瓶',status:'审核成功',user:'李四',date:'2026-03-17',delivery:'2026-03-19'},
  {id:'TF20260316001',fromCust:'20694',fromCustName:'瑞安市婷轩副食品经营部',fromArea:'W001',fromAreaName:'温州',toCust:'1001',toCustName:'温州横渎经营部(横渎奶吧)',toArea:'W001',toAreaName:'温州',sku:'411237',skuName:'醇奶家纯牛奶200ml',qty:100,unit:'瓶',status:'已完成',user:'王五',date:'2026-03-16',delivery:'2026-03-18'},
  {id:'TF20260316002',fromCust:'N1001',fromCustName:'染墨青茶肆萧山奥体印象城店',fromArea:'N001',fromAreaName:'杭州',toCust:'20694',toCustName:'瑞安市婷轩副食品经营部',toArea:'W001',toAreaName:'温州',sku:'400330',skuName:'巧克力富力亚',qty:80,unit:'个',status:'已驳回',user:'赵六',date:'2026-03-16',delivery:'2026-03-18'},
  {id:'TF20260315001',fromCust:'N1005',fromCustName:'一鸣真鲜奶吧滨江店',fromArea:'N001',fromAreaName:'杭州',toCust:'N1006',toCustName:'染墨青茶肆拱墅万达店',toArea:'N001',toAreaName:'杭州',sku:'400293',skuName:'DIY酸奶',qty:200,unit:'瓶',status:'已完成',user:'钱七',date:'2026-03-15',delivery:'2026-03-17'},
];

// === 消息通知 ===
const MOCK_MESSAGES = [
  {id:'MSG001',type:'系统通知',title:'SAP基础数据同步完成',content:'本次同步更新客户数据 256 条，物料数据 1,024 条，价格数据 512 条',level:'info',read:false,time:'2026-03-17 09:15',sender:'系统'},
  {id:'MSG002',type:'审核通知',title:'订单 20260317100003 审核通过',content:'订单已通过审核，进入建单流程。客户：瑞安市婷轩副食品经营部，金额：¥23,100.00',level:'success',read:false,time:'2026-03-17 09:10',sender:'系统'},
  {id:'MSG003',type:'异常告警',title:'客户 N1008 付款方已冻结',content:'客户 一鸣真鲜奶吧临平店(N1008) 付款方编码已被SAP冻结，相关订单将无法建单，请联系财务处理',level:'danger',read:false,time:'2026-03-17 08:55',sender:'系统'},
  {id:'MSG004',type:'业务提醒',title:'杭州区域截止时间即将到达',content:'杭州区域(N001)的要货截止时间为 15:00，距离截止还有 2 小时，当前仍有 12 条未审核订单',level:'warning',read:true,time:'2026-03-17 08:30',sender:'系统'},
  {id:'MSG005',type:'系统通知',title:'WMS接口延迟告警',content:'WMS推送接口响应时间超过阈值(>500ms)，当前平均响应 890ms，已自动告警运维团队',level:'warning',read:true,time:'2026-03-17 08:00',sender:'监控中心'},
  {id:'MSG006',type:'审核通知',title:'调货单 TF20260316001 审核通过',content:'跨客户调货单已审核，调出方：瑞安市婷轩副食品经营部，调入方：温州横渎经营部',level:'success',read:true,time:'2026-03-16 17:20',sender:'系统'},
  {id:'MSG007',type:'系统通知',title:'定时审核任务执行完成',content:'杭州区域(N001) 06:00 定时审核已执行，本次自动审核 186 条拉式订单',level:'info',read:true,time:'2026-03-17 06:01',sender:'定时任务'},
  {id:'MSG008',type:'异常告警',title:'物料 400330 价格校验失败',content:'物料 巧克力富力亚(400330) 在温州区销售组织(W001) 中未找到有效采购价格，影响 3 条订单',level:'danger',read:true,time:'2026-03-16 15:40',sender:'系统'},
  {id:'MSG009',type:'业务提醒',title:'ZNYH奶吧订单同步完成',content:'ZNYH系统同步了 238 条奶吧渠道订单，其中成功 235 条，失败 3 条（详见异常日志）',level:'info',read:true,time:'2026-03-17 07:30',sender:'同步服务'},
  {id:'MSG010',type:'系统通知',title:'OA人员组织架构同步完成',content:'每日 00:00 定时同步已执行，本次更新人员信息 12 条，组织变更 2 条',level:'info',read:true,time:'2026-03-17 00:01',sender:'定时任务'},
];

// === 操作日志 ===
const MOCK_OP_LOGS = [
  {id:'OL001',user:'陈文静',account:'chenwj',module:'订单审核',action:'审核通过',target:'订单 20260317100003',detail:'审核通过，进入OMS建单流程',ip:'10.220.19.45',time:'2026-03-17 09:12:30'},
  {id:'OL002',user:'张三',account:'zhangs',module:'订单新建',action:'新建订单',target:'订单 20260317100001',detail:'手工新建拉式订单，客户 N1001，金额 ¥12,580.00',ip:'10.220.19.52',time:'2026-03-17 09:05:15'},
  {id:'OL003',user:'周九',account:'zhouj',module:'系统管理',action:'修改角色权限',target:'角色 AREA_MGR',detail:'为区域订单经理角色新增"调货管理"权限',ip:'10.220.19.10',time:'2026-03-17 08:55:00'},
  {id:'OL004',user:'陈文静',account:'chenwj',module:'后台管理',action:'新增规则',target:'截止时间规则',detail:'新增常州区域截止时间规则，提前2天，截止13:00',ip:'10.220.19.45',time:'2026-03-17 08:45:20'},
  {id:'OL005',user:'李四',account:'lis',module:'订单调货',action:'提交调货',target:'调货单 TF20260317001',detail:'从 N1001 调货到 N1002，DIY酸奶 50瓶',ip:'10.220.19.53',time:'2026-03-17 08:30:10'},
  {id:'OL006',user:'赵六',account:'zhaol',module:'订单审核',action:'批量审核',target:'5条订单',detail:'批量审核通过订单 20260316083000 等5条',ip:'10.220.19.48',time:'2026-03-16 17:00:45'},
  {id:'OL007',user:'周九',account:'zhouj',module:'系统管理',action:'重置密码',target:'用户 qianq',detail:'重置用户钱七的登录密码',ip:'10.220.19.10',time:'2026-03-16 14:20:30'},
  {id:'OL008',user:'陈文静',account:'chenwj',module:'后台管理',action:'修改规则',target:'附赠品规则',detail:'修改DIY酸奶附赠品数量配比为 10:10',ip:'10.220.19.45',time:'2026-03-16 11:15:00'},
  {id:'OL009',user:'王五',account:'wangw',module:'订单查询',action:'导出数据',target:'订单列表',detail:'导出温州区域2026-03-15~2026-03-16订单数据，共 128 条',ip:'10.220.19.55',time:'2026-03-16 10:30:20'},
  {id:'OL010',user:'张三',account:'zhangs',module:'订单新建',action:'导入Excel',target:'批量导入',detail:'导入Excel批量创建订单，成功 45 条，失败 2 条',ip:'10.220.19.52',time:'2026-03-16 09:00:05'},
];

// === 系统日志 ===
const MOCK_SYS_LOGS = [
  {id:'SL001',level:'INFO',service:'oms-gateway',message:'SAP基础数据同步任务启动，开始全量同步',traceId:'a1b2c3d4e5f6',duration:'12,350ms',time:'2026-03-17 06:00:00'},
  {id:'SL002',level:'INFO',service:'oms-order',message:'定时审核任务执行: 杭州区域(N001)，审核 186 条拉式订单',traceId:'b2c3d4e5f6a1',duration:'3,280ms',time:'2026-03-17 06:00:15'},
  {id:'SL003',level:'WARN',service:'oms-integration',message:'ZNYH接口响应延迟: 平均890ms，超过阈值500ms',traceId:'c3d4e5f6a1b2',duration:'890ms',time:'2026-03-17 07:30:22'},
  {id:'SL004',level:'ERROR',service:'oms-order',message:'建单失败: 客户N1008付款方冻结，SAP校验不通过 [PAY_FROZEN]',traceId:'d4e5f6a1b2c3',duration:'245ms',time:'2026-03-17 08:55:10'},
  {id:'SL005',level:'ERROR',service:'oms-integration',message:'WMS推送超时: 订单20260317093200，重试次数2/3 [TIMEOUT]',traceId:'e5f6a1b2c3d4',duration:'30,000ms',time:'2026-03-17 09:32:45'},
  {id:'SL006',level:'INFO',service:'oms-sync',message:'ZNYH订单同步完成: 成功235条，失败3条',traceId:'f6a1b2c3d4e5',duration:'8,920ms',time:'2026-03-17 07:30:00'},
  {id:'SL007',level:'WARN',service:'oms-order',message:'物料400330价格校验失败: W001销售组织无有效价格记录',traceId:'a2b3c4d5e6f7',duration:'56ms',time:'2026-03-16 15:40:12'},
  {id:'SL008',level:'INFO',service:'oms-gateway',message:'Redis心跳检测正常，内存使用率62%，连接池活跃连接18/50',traceId:'b3c4d5e6f7a2',duration:'5ms',time:'2026-03-17 09:00:00'},
  {id:'SL009',level:'INFO',service:'oms-integration',message:'SAP ECC连接检测正常，响应时间45ms',traceId:'c4d5e6f7a2b3',duration:'45ms',time:'2026-03-17 09:00:01'},
  {id:'SL010',level:'ERROR',service:'oms-order',message:'订单明细推送WMS失败: HTTP 503 Service Unavailable [WMS_DOWN]',traceId:'d5e6f7a2b3c4',duration:'5,012ms',time:'2026-03-16 14:22:38'},
  {id:'SL011',level:'INFO',service:'oms-sync',message:'OA人员组织架构同步完成: 更新人员12条，组织变更2条',traceId:'e6f7a2b3c4d5',duration:'2,150ms',time:'2026-03-17 00:01:00'},
  {id:'SL012',level:'WARN',service:'oms-gateway',message:'API请求频率超过限流阈值: /api/order/create 120次/分钟 [RATE_LIMIT]',traceId:'f7a2b3c4d5e6',duration:'2ms',time:'2026-03-16 16:05:30'},
];
