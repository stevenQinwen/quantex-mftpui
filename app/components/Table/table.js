const TABLE = {
  // auth
  auth_system_base_role: 1, // 基础信息-角色管理
  auth_system_base_user: 2, // 基础信息-用户管理
  auth_system_base_user_group: 3, // 基础信息-用户组管理
  auth_system_right_menuright_rolemenu: 4, // 权限设置-菜单权限-角色菜单设置
  auth_system_right_menuright_usermenu: 5, // 权限设置-菜单权限-用户菜单设置
  auth_system_base_dictdata: 6, // 基础信息-字典管理
  // qtw ===================
  inst_position_bond_query: 101, // 交易查询 - 持仓查询-债券持仓
  inst_position_repo_query: 102, // 交易查询 - 持仓查询-回购持仓
  inst_position_depo_query: 103, // 交易查询 - 持仓查询-存款持仓
  inst_overview_bond_ibbond: 104, // 指令总览-债券交易-银行间现券
  inst_overview_bond_ssebond: 105, // 指令总览-债券交易-交易所现券
  inst_creation_ibrepo: 106, // 指令创建-银行间回购
  inst_creation_ibbond: 107, // 指令创建-银行间债券
  inst_creation_sse: 108, // 指令创建-交易所交易
  inst_creation_depo: 109, // 指令创建-定期存款
  inst_creation_bond_ipo_position: 110, // 指令创建-债券申购-持仓信息
  inst_creation_bond_ipo_publish: 111, // 指令创建-债券申购-发型信息
  inst_creation_stock: 112, // 指令创建-股票
  inst_approval_ibrepo: 113, // 指令审批-银行间回购
  inst_approval_sserepo: 114, // 指令审批-交易所回购
  // inst_approval_depo_instruction: 115, // 指令审批-存款-指令
  inst_approval_depo_instruction_ib: 115, // 指令审批-存款-指令
  inst_approval_depo_enquiry: 116, // 指令审批-存款-询价
  inst_approval_cd_instruction: 117, // 指令审批-存单-指令
  inst_approval_cd_intention: 118, // 指令审批-存单-意向
  inst_approval_bond_ipo: 119, // 指令审批-债券ipo
  inst_approval_ibbond: 120, // 指令审批-银行间债券
  inst_approval_ssebond_instruction: 121, // 指令审批-交易所债券-指令
  inst_approval_bond_enquiry: 122, // 指令审批-债券-询价
  inst_approval_stock: 123, // 指令审批-股票
  inst_overview_ibbond: 124, // 指令总览-银行间债券
  inst_overview_ssebond: 125, // 指令总览-交易所债券
  inst_overview_ibrepo: 126, // 指令总览-银行间申购
  inst_overview_sserepo: 127, // 指令总览-交易所申购
  inst_overview_depo: 128, // 指令总览-存款
  inst_overview_cd_instruction: 129, // 指令总览-指令
  inst_overview_cd_intention: 130, // 指令总览-存单-意向
  inst_overview_bond_ipo: 131, // 指令总览-ipo
  inst_overview_stock: 132, // 指令总览-股票
  inst_order_execution_repo_instruction_ib: 133, // 指令执行 - 银行间回购
  inst_creation_bondinout_bond_in_out: 140, // 质押券出入库-债券出入
  // inst_creation_bondinout_bond_overview: 141, // 质押券出入库-债券总览
  inst_creation_bondinout_sse_bond: 142, // 质押券出入库-交易所债券
  inst_base_bank_preserve: 163, // 交易数据管理-银行间网点维护
  // 指令执行
  // qdw ===================
  qdw_config_message_translate: 501, // 系统管理-消息模板
  // qow ===================
  qow_base_market: 701, // 基础信息-市场管理
  qow_base_timelice: 702, // 基础信息-市场时间片管理
  // qcw ===================
  qcw_base_Factor: 901, // 风控因子
};

export default TABLE;
