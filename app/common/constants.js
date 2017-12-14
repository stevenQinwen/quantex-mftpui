// ==================== 布局、样式相关 ====================
// FormItem 布局相关常量
const FORMITEM_LAYOUT = {
  FORM_ITEM_SPAN: 7, // FormItem span 默认一行 3 个
  FORM_LABEL_LEN: 7, // FormItem label span
  FORM_INPUT_LEN: 17 // FormItem input span
};

// 分页相关常量
const PAGINATION = {
  PAGE_SIZE: 20, // 默认每页记录数
  PAGE_SIZE_OPTIONS: ['10', '20', '30', '500', '1000', '5000'] // 指定每页可以显示多少条数据
};

// 特殊 Table 表字段宽度
const TABLE_COLUMN_WIDTH = {
  INST_STATUS: 130,
  APPROVAL_STATUS: 130,
  FUND_NAME: 180,
  STRATEGY_NAME: 180
};

// ==================== 业务相关 ====================
// 资产类型常量
const ASSET_TYPE = {
  FUND: 1,   // 基金
  SUB_FUND: 2,  // 子基金
  ASSET_UNIT: 3,  // 资产单元
  STRATEGY: 4,    // 独享资金策略
  SHARE_STRATEGY: 5,  // 共享资金策略
  CASH_ACCOUNT: 6   // 子账户
};

// 资金、持仓冻结解冻
const POSITION_FROZEN = {
  FROZEN: 1,   // 冻结
  UNFROZEN: 2  // 解冻
};


export { FORMITEM_LAYOUT, PAGINATION, TABLE_COLUMN_WIDTH, ASSET_TYPE, POSITION_FROZEN };
