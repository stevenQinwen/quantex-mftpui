/**
 * 数据字典常量定义
 * 代码由程序生成,请勿修改该文件
 * 如需增加常量,请到数据字典管理哪里增加,并通知相关人员重新生成常量文件
 */
const DICT = {
  // 账户类型
  account_type_extacct: 0,  // 外部账户
  account_type_internal: 1,  // 内部账户

  // 调账审批状态码
  adjust_approve_status_new: 0,  // 待复核
  adjust_approve_status_passed: 1,  // 通过
  adjust_approve_status_reject: 2,  // 拒绝

  // 估值摊销方法常量
  amortization_method_Daily: 'Daily',  // 日实际利率法
  amortization_method_Simplify: 'Simplify',  // 简化日利率法
  amortization_method_Straight: 'Straight',  // 直线法
  amortization_method_Yearly: 'Yearly',  // 年利率法

  // 审批状态
  approval_status_new: 0,  // 未审批
  approval_status_approved: 1,  // 审批通过
  approval_status_rejected: 2,  // 审批拒绝

  // 归档状态
  archive_status_undeal: 0,  // 未处理
  archive_status_success: 1,  // 成功
  archive_status_failed: 2,  // 失败

  // 资产类型
  asset_type_fund: 1,  // 基金
  asset_type_sub_fund: 2,  // 子基金
  asset_type_asset_unit: 3,  // 资产单元
  asset_type_strategy: 4,  // 独享资金策略
  asset_type_share_strategy: 5,  // 共享资金策略
  asset_type_cash_account: 6,  // 子账户

  // 资产单元内部子账户类型
  asset_unit_type_default: 0,  // 默认策略下的子账户
  asset_unit_type_unlock: 1,  // 未锁定的所有子账户
  asset_unit_type_all: 2,  // 资产单元下所有子账户

  // 联系人类型
  bank_contract_role_owner: 0,  // 负责人
  bank_contract_role_bussiness: 1,  // 业务联系人
  bank_contract_role_operation: 2,  // 运营联系人

  // 招标类型
  bid_type_holland: 0,  // 荷兰式
  bid_type_american: 1,  // 美国式
  bid_type_mixed: 2,  // 混合式

  // 募集类型
  bind_ipo_collect_type_1: 1,  // 公募
  bind_ipo_collect_type_2: 2,  // 专户
  bind_ipo_collect_type_4: 4,  // 养老金
  bind_ipo_collect_type_5: 5,  // 年金
  bind_ipo_collect_type_6: 6,  // 社保
  bind_ipo_collect_type_7: 7,  // 其他

  // 数据权限操作
  bizprivilege_operation_showonly: -1,  // 只显示
  bizprivilege_operation_readonly: 0,  // 只读
  bizprivilege_operation_readwrite: 1,  // 读写

  // 业务类型
  business_type_stock: 0,  // 股票指令
  business_type_ib_repo: 1,  // 银行间回购
  business_type_ib_depo_enquiry: 10,  // 同业存款_询价
  business_type_ibbond: 2,  // 银行间现券买卖指令
  business_type_bond_enquiry: 3,  // 银行间现券买卖询价
  business_type_cd_instruction: 4,  // 同业存单_指令
  business_type_cd_intention: 5,  // 同业存单_意向
  business_type_bond_ipo: 6,  // 债券申购指令
  business_type_bond_sse: 7,  // 交易所现券指令
  business_type_sse_repo: 8,  // 交易所回购指令
  business_type_ib_depo: 9,  // 同业存款_指令

  // 按钮状态
  button_status_0: 0,  // 禁用
  button_status_1: 1,  // 启用
  button_status_2: 2,  // 禁用隐藏

  // 出入方向
  cash_side_0: 0,  // 划进
  cash_side_1: 1,  // 划出

  // 头寸策略
  cash_strategy_easy: 0,  // 松头寸
  cash_strategy_tight: 1,  // 紧头寸

  // 模版类型
  category_depo_km: 1,  // 存款KM审批模板

  // 同业存单_期限
  cd_duration_1: 1,  // 1M
  cd_duration_12: 12,  // 12M
  cd_duration_13: 13,  // 一年以上
  cd_duration_3: 3,  // 3M
  cd_duration_6: 6,  // 6M
  cd_duration_9: 9,  // 9M

  // 同业存单_指令状态
  cd_instruction_status_pending_rejected: 1,  // 风控不通过
  cd_instruction_status_pending_new: 2,  // 待生成指令
  cd_instruction_status_pending_execute: 3,  // 待执行
  cd_instruction_status_executing: 4,  // 已投标
  cd_instruction_status_finished: 6,  // 投标成功
  cd_instruction_status_canceled: 7,  // 已撤销
  cd_instruction_status_updating: 9,  // 修改中

  // 同业存单_标的类型
  cd_type_0: 0,  // 同业存单
  cd_type_1: 1,  // PPN
  cd_type_2: 2,  // 存款
  cd_type_3: 3,  // 其他

  // 结算方式
  clearing_type_FOP: 1,  // 纯券过户
  clearing_type_DVP: 2,  // 券款对付
  clearing_type_PAD: 3,  // 见券付款
  clearing_type_DAP: 4,  // 见款付券

  // 募集类型
  collect_type_1: 1,  // 公募
  collect_type_2: 2,  // 专户(1v1)
  collect_type_3: 3,  // 专户(1vN)
  collect_type_4: 4,  // 养老金
  collect_type_5: 5,  // 年金
  collect_type_6: 6,  // 社保
  collect_type_7: 7,  // 其他

  // 通用指令状态
  common_inst_status_pending_rejected: 1,  // 风控不通过
  common_inst_status_pending_new: 2,  // 新指令
  common_inst_status_pending_execute: 3,  // 未执行
  common_inst_status_executing: 4,  // 执行中
  common_inst_status_filled: 5,  // 已成交
  common_inst_status_finished: 6,  // 已完成
  common_inst_status_canceled: 7,  // 已撤销
  common_inst_status_changed: 8,  // 已变更
  common_inst_status_changing: 9,  // 修改中

  // 公司内层级
  company_group_type_company: 1,  // 公司
  company_group_type_user_group: 2,  // 用户组
  company_group_type_user: 3,  // 用户

  // 计息方式
  compound_method_0: 0,  // 固定利率
  compound_method_1: 1,  // 浮动利率
  compound_method_4: 4,  // 累进利率
  compound_method_5: 5,  // 贴现（零息）
  compound_method_6: 6,  // 无序利率

  // 债券申购基础信息配置
  config_type_bond_ipo: 0,  // 申购金额
  config_type_first_allocation: 1,  // 首次分配
  config_type_second_allocation: 2,  // 二次分配

  // 重要級別
  critical_level_low: 1,  // 低
  critical_level_medium: 2,  // 中
  critical_level_high: 3,  // 高

  // 币种
  currency_CNY: 'CNY',  // 人民币
  currency_HKD: 'HKD',  // 港元
  currency_USD: 'USD',  // 美元

  // 处理结果标志
  deal_flag_undeal: 0,  // 未处理
  deal_flag_success: 1,  // 成功
  deal_flag_failed: 2,  // 失败

  // 字典类型
  dict_type_static: 0,  // 静态
  dict_type_dynamic: 1,  // 动态

  // 字典值类型
  dict_value_type_number: 1,  // 数值型
  dict_value_type_string: 2,  // 字符型

  // 邮件模板
  email_category_depo_contact: 1,  // 存款合同发送模板

  // 紧急级别
  emergency_level_normal: 1,  // 普通
  emergency_level_advanced: 2,  // 高级

  // 启用禁用
  enable_status_false: 0,  // 禁用
  enable_status_true: 1,  // 启用

  // 清算跟踪交易类型
  eod_track_trade_type_code_A2: 'A2',  // 网下承销中签
  eod_track_trade_type_code_A2FR: 'A2FR',  // 销售服务费返还
  eod_track_trade_type_code_B: 'B',  // 现券买入
  eod_track_trade_type_code_RB: 'RB',  // 逆回购首期
  eod_track_trade_type_code_RBM: 'RBM',  // 逆回购到期
  eod_track_trade_type_code_RM: 'RM',  // 正回购首期
  eod_track_trade_type_code_RMD: 'RMD',  // 正回购到期
  eod_track_trade_type_code_RR: 'RR',  // 逆回购
  eod_track_trade_type_code_S: 'S',  // 现券卖出
  eod_track_trade_type_code_SR: 'SR',  // 正回购

  eodsettjob_status_unstart: 0,  // 未开始
  eodsettjob_status_running: 1,  // 进行中
  eodsettjob_status_error: 2,  // 异常
  eodsettjob_status_done: 3,  // 成功
  eodsettjob_status_warning: 4,  // 警告

  // 成交核对结果
  execution_check_result_normal: 0,  // 正常
  execution_check_result_ue: 1,  // 核对不平
  execution_check_result_our: 2,  // ims有中登无
  execution_check_result_them: 3,  // 中登有ims无

  // 成交状态
  execution_status_executed: 1,  // 已成交
  execution_status_settled: 2,  // 已交收
  execution_status_end_settled: 3,  // 到期已交收

  // 外部资金账户类型
  extaccount_type_trust_account_rmb: 1,  // 人名币托管账户
  extaccount_type_trust_account_foreign: 2,  // 外币托管账户
  extaccount_type_future_account: 3,  // 期货分仓账户

  // 风控因子类型(一级分类)
  factor_type_calculate: '0',  // 计算因子
  factor_type_condition: '1',  // 条件因子
  factor_type_complex: '2',  // 复杂因子

  // 计费天数
  fee_days_360: 1,  // 360
  fee_days_365: 2,  // 365
  fee_days_ACTUAL: 3,  // ACTUAL

  // 费率类型
  fee_rate_type_total: 0,  // 固定金额
  fee_rate_type_rate: 1,  // 费率
  fee_rate_type_segement: 2,  // 分段计费

  // 债券类别(IMS定义）
  fi_class_1: 1,  // 利率债
  fi_class_2: 2,  // 存单
  fi_class_3: 3,  // 高等级信用债
  fi_class_4: 4,  // 其它等级信用债

  // 债券类别（数据中心定义）
  fi_sec_class_IMS001: 'IMS001',  // 利率债
  fi_sec_class_IMS003: 'IMS003',  // 存单
  fi_sec_class_IMS004: 'IMS004',  // 其它
  fi_sec_class_IMS005: 'IMS005',  // 高等级信用债
  fi_sec_class_IMS006: 'IMS006',  // 其它等级信用债

  // 处理状态
  file_deal_none: 0,  // 未处理
  file_deal_success: 1,  // 成功
  file_deal_fail: 2,  // 失败

  // 冻结日类型
  freeze_day_type_paystartday: 0,  // 支付起始日
  freeze_day_type_payendday: 1,  // 支付截止日

  // 计提频率
  frequency_day: 1,  // 日
  frequency_onebyone: 2,  // 逐笔
  frequency_onebyoneeach: 3,  // 单券逐笔
  frequency_moreeach: 4,  // 多券逐笔
  frequency_month: 5,  // 月
  frequency_quarter: 6,  // 季
  frequency_year: 7,  // 年

  // 产品关闭状态
  fund_close_status_uncheck: 1,  // 未复核
  fund_close_status_firstpassed: 2,  // 首次结盘已申请
  fund_close_status_firstapproed: 3,  // 首次结盘已复核
  fund_close_status_firstreject: 4,  // 首次结盘已拒绝
  fund_close_status_clearpassed: 5,  // 产品关闭已申请
  fund_close_status_clearapproed: 6,  // 产品关闭已复核
  fund_close_status_clearreject: 7,  // 产品关闭已拒绝

  // 文件协议模板状态
  fund_contract_tpl_status_delete: 0,  // 已删除
  fund_contract_tpl_status_normal: 1,  // 正常

  // 产品状态
  fund_status_setting: 1,  // 创设中
  fund_status_setup: 2,  // 创设完
  fund_status_active: 4,  // 生效
  fund_status_fronzen: 5,  // 冻结
  fund_status_closed: 6,  // 关闭
  fund_status_pfrozen: 7,  // 冻结待批
  fund_status_pclosed: 8,  // 关闭待审批
  fund_status_liquidate: 9,  // 清盘

  // 产品类型（待删除）
  fund_type_0: 0,  // 股票基金
  fund_type_1: 1,  // 债券基金
  fund_type_2: 2,  // 货币市场基金
  fund_type_3: 3,  // 混合基金
  fund_type_4: 4,  // 其它

  // 持有方式
  held_type_trade: 1,  // 可供交易
  held_type_sale: 2,  // 可供出售
  held_type_maturity: 3,  // 持有到期

  // 银行间现券询价前端展示指令状态
  ib_bond_enquiry_status_pending_rejected: 1,  // 询价生效失败
  ib_bond_enquiry_status_finished: 11,  // 已对外委托
  ib_bond_enquiry_status_canceled: 12,  // 已撤销
  ib_bond_enquiry_status_pending_new: 2,  // 待生效
  ib_bond_enquiry_status_pending_execute: 3,  // 待对外委托
  ib_bond_enquiry_status_pending_1st_approve: 4,  // 待询价一级审批
  ib_bond_enquiry_status_pending_2nd_approve: 5,  // 待询价二级审批
  ib_bond_enquiry_status_pending_3rd_approve: 6,  // 待询价三级审批
  ib_bond_enquiry_status_refused_1st_approve: 7,  // 询价一级审批拒绝
  ib_bond_enquiry_status_refused_2nd_approve: 8,  // 询价二级审批拒绝
  ib_bond_enquiry_status_refused_3rd_approve: 9,  // 询价三级审批拒绝

  // 银行间现券前端展示指令状态
  ib_bond_inst_status_pending_rejected: 1,  // 指令生效失败
  ib_bond_inst_status_executing: 10,  // 执行中
  ib_bond_inst_status_finished: 11,  // 已完成
  ib_bond_inst_status_canceled: 12,  // 已撤销
  ib_bond_inst_status_pending_new: 2,  // 待生效
  ib_bond_inst_status_pending_execute: 3,  // 待执行
  ib_bond_inst_status_pending_1st_approve: 4,  // 待指令一级审批
  ib_bond_inst_status_pending_2nd_approve: 5,  // 待指令二级审批
  ib_bond_inst_status_pending_3rd_approve: 6,  // 待指令三级审批
  ib_bond_inst_status_refused_1st_approve: 7,  // 指令一级审批拒绝
  ib_bond_inst_status_refused_2nd_approve: 8,  // 指令二级审批拒绝
  ib_bond_inst_status_refused_3rd_approve: 9,  // 指令三级审批拒绝

  // 银行间债券
  ib_bond_trade_type_B: 'B',  // 买入
  ib_bond_trade_type_S: 'S',  // 卖出

  // 同业存款_协议状态
  ib_depo_enquiry_cstatus_pending_generate: 0,  // 未生成
  ib_depo_enquiry_cstatus_generated: 1,  // 已生成
  ib_depo_enquiry_cstatus_submited: 2,  // 已提交
  ib_depo_enquiry_cstatus_sented: 3,  // 已发送

  // 同业存款_询价状态
  ib_depo_enquiry_status_pending_rejected: 1,  // 风控不通过
  ib_depo_enquiry_status_pending_new: 2,  // 新询价
  ib_depo_enquiry_status_pending_execute: 3,  // 未执行
  ib_depo_enquiry_status_km_submited: 4,  // KM提交
  ib_depo_enquiry_status_km_rejected: 5,  // KM拒绝
  ib_depo_enquiry_status_km_approved: 6,  // KM通过
  ib_depo_enquiry_status_finished: 7,  // 已完成
  ib_depo_enquiry_status_canceled: 8,  // 已撤销
  ib_depo_enquiry_status_changing: 9,  // 修改中

  // 同业存款_指令状态
  ib_depo_instruction_status_canceling: 10,  // 撤销中
  ib_depo_instruction_status_executed_canceled: 11,  // 已撤销
  ib_depo_instruction_status_finished: 13,  // 已完成
  ib_depo_instruction_status_new_complicance_rejected: 3,  // 废指令
  ib_depo_instruction_status_accepted_sent: 7,  // 未执行
  ib_depo_instruction_status_accepted_executed: 8,  // 执行中
  ib_depo_instruction_status_filled: 9,  // 已完成

  // 银行间回购前端展示指令状态
  ib_repo_inst_status_executing: 10,  // 执行中
  ib_repo_inst_status_finished: 11,  // 已完成
  ib_repo_inst_status_canceled: 12,  // 已撤销
  ib_repo_inst_status_changed: 13,  // 已变更
  ib_repo_inst_status_pending_execute: 3,  // 待执行
  ib_repo_inst_status_pending_1st_approve: 4,  // 待指令一级审批
  ib_repo_inst_status_pending_2nd_approve: 5,  // 待指令二级审批
  ib_repo_inst_status_pending_3rd_approve: 6,  // 待指令三级审批
  ib_repo_inst_status_refused_1st_approve: 7,  // 指令一级审批拒绝
  ib_repo_inst_status_refused_2nd_approve: 8,  // 指令二级审批拒绝
  ib_repo_inst_status_refused_3rd_approve: 9,  // 指令三级审批拒绝

  // 银行间回购
  ib_repo_trade_type_RR: 'RR',  // 逆回购
  ib_repo_trade_type_SR: 'SR',  // 正回购

  // 现券询价状态
  ibbond_enquiry_status_rejected: 1,  // 风控不通过
  ibbond_enquiry_status_new: 2,  // 新询价
  ibbond_enquiry_status_pending_execute: 3,  // 待执行
  ibbond_enquiry_status_finished: 4,  // 已完成
  ibbond_enquiry_status_canceled: 5,  // 已撤销
  ibbond_enquiry_status_updating: 6,  // 修改中

  // 询价方式
  ibbond_enquiry_type_dialogue: 0,  // 对话
  ibbond_enquiry_type_bilateral: 1,  // 双边
  ibbond_enquiry_type_request: 2,  // 请求

  // 银行间现券指令状态
  ibbond_instruction_status_pending_rejected: 1,  // 指令生效失败
  ibbond_instruction_status_pending_new: 2,  // 待生效
  ibbond_instruction_status_pending_execute: 3,  // 待执行
  ibbond_instruction_status_executing: 4,  // 执行中
  ibbond_instruction_status_finished: 6,  // 已完成
  ibbond_instruction_status_canceled: 7,  // 已撤销
  ibbond_instruction_status_updating: 9,  // 修改中

  // 同业定期指令状态
  ibdepo_instruction_status_pending_rejected: 1,  // 风控不通过
  ibdepo_instruction_status_pending_new: 2,  // 新指令
  ibdepo_instruction_status_pending_execute: 3,  // 未执行
  ibdepo_instruction_status_executing: 4,  // 执行中
  ibdepo_instruction_status_finished: 6,  // 已完成
  ibdepo_instruction_status_canceled: 7,  // 已撤销
  ibdepo_instruction_status_changing: 9,  // 修改中

  // 同业存单_信息来源
  info_source_0: 0,  // 人工
  info_source_1: 1,  // 系统

  // 操作符
  instruction_character_minus: 0,  // -
  instruction_character_add: 1,  // +

  // 指令操作类型
  instruction_operation_type_modify: 1,  // 指令修改
  instruction_operation_type_bid_adjust: 10,  // 中标调整
  instruction_operation_type_approve: 2,  // 指令审批
  instruction_operation_type_operator: 3,  // 指令操作
  instruction_operation_type_create: 4,  // 指令创建
  instruction_operation_type_cancel: 5,  // 指令撤销
  instruction_operation_type_change: 6,  // 指令变更
  instruction_operation_type_finish: 7,  // 指令完成
  instruction_operation_type_exec: 8,  // 指令执行
  instruction_operation_type_assign: 9,  // 指令重新分配

  // 指令流水状态
  instruction_oplog_status_new: 1,  // 新建
  instruction_oplog_status_finished: 2,  // 完成

  // 指令状态
  instruction_status_stop: 0,  // 暂停中
  instruction_status_new: 1,  // 新指令
  instruction_status_canceling: 10,  // 撤销中
  instruction_status_executed_canceled: 11,  // 执行后已撤销
  instruction_status_changed: 12,  // 已变更
  instruction_status_finished: 13,  // 已完成
  instruction_status_new_complicance_approved: 2,  // 风控通过
  instruction_status_new_complicance_rejected: 3,  // 风控不通过
  instruction_status_new_approved: 4,  // 已审批
  instruction_status_new_rejected: 5,  // 已拒绝
  instruction_status_new_canceled: 6,  // 已撤销
  instruction_status_accepted_sent: 7,  // 未执行
  instruction_status_accepted_executed: 8,  // 执行中
  instruction_status_filled: 9,  // 全成交

  // 指令类型
  instruction_type_stock: 0,  // 股票指令
  instruction_type_repo: 1,  // 债券指令

  // 同业存单_操作类型
  intention_operation_type_modify: 1,  // 意向修改
  intention_operation_type_approve: 2,  // 意向审批
  intention_operation_type_create: 4,  // 意向创建
  intention_operation_type_cancel: 5,  // 意向撤销

  // 同业存单_付息方式
  interest_payment_way_0: 0,  // 按年付息
  interest_payment_way_1: 1,  // 按半年付息
  interest_payment_way_3: 3,  // 按季付息
  interest_payment_way_4: 4,  // 按月付息
  interest_payment_way_5: 5,  // 一次性付息

  // 息票类型
  interest_pmt_type_zero: '001',  // 零息债券
  interest_pmt_type_discount: '002',  // 贴现债券
  interest_pmt_type_total: '003',  // 一次性还本付息
  interest_pmt_type_coupon: '004',  // 附息债券

  // 利率类型
  interest_type_fix: '001',  // 固定利率
  interest_type_float: '002',  // 浮动利率
  interest_type_accu: '003',  // 累进利率

  // 债券申购前端展示指令状态
  ipo_inst_status_pending_rejected: 1,  // 指令生效失败
  ipo_inst_status_executing: 10,  // 执行中
  ipo_inst_status_filled: 11,  // 已中标
  ipo_inst_status_finished: 12,  // 已完成
  ipo_inst_status_new_canceled: 13,  // 已撤销
  ipo_inst_status_pending_new: 2,  // 待生效
  ipo_inst_status_pending_execute: 3,  // 待执行
  ipo_inst_status_pending_1st_approve: 4,  // 待指令一级审批
  ipo_inst_status_pending_2nd_approve: 5,  // 待指令二级审批
  ipo_inst_status_pending_3rd_approve: 6,  // 待指令三级审批
  ipo_inst_status_refused_1st_approve: 7,  // 指令一级审批拒绝
  ipo_inst_status_refused_2nd_approve: 8,  // 指令二级审批拒绝
  ipo_inst_status_refused_3rd_approve: 9,  // 指令三级审批拒绝

  // 债券申购指令状态
  ipo_instruction_status_pending_rejected: 1,  // 风控不通过
  ipo_instruction_status_pending_new: 2,  // 新指令
  ipo_instruction_status_pending_execute: 3,  // 未执行
  ipo_instruction_status_executing: 4,  // 执行中
  ipo_instruction_status_filled: 5,  // 已成交
  ipo_instruction_status_finished: 6,  // 已完成
  ipo_instruction_status_canceled: 7,  // 已撤销
  ipo_instruction_status_changed: 8,  // 已变更
  ipo_instruction_status_updating: 9,  // 修改中

  // 是否为正式指令
  is_indicative_intention: 0,  // 意向指令
  is_indicative_instruction: 1,  // 正式指令

  // 是否为常规类型产品
  is_innovate_general: 0,  // 常规类型
  is_innovate_innovate: 1,  // 创新类型

  // 是否标准费用
  is_standardfee_non_standard: 0,  // 非标准
  is_standardfee_standard: 1,  // 标准

  // 发行方式
  issue_method_tender_issue: 0,  // 招标发行
  issue_method_quotation: 1,  // 报价发行
  issue_method_directional_issuance: 2,  // 定价发行

  // 同业存单_上市地点
  listing_place_0: 0,  // 银行间交易中心
  listing_place_1: 1,  // 上海证券交易所
  listing_place_2: 2,  // 深圳证券交易所
  listing_place_3: 3,  // 其它

  // 邮件发送状态
  mail_status_unsent: 0,  // 未发送
  mail_status_sent: 1,  // 已发送
  mail_status_succeed: 2,  // 发送成功
  mail_status_failed: 3,  // 发送失败

  // 市场编码
  market_code_IB: 'IB',  // 银行间
  market_code_SH: 'SH',  // 上海证券交易所
  market_code_SZ: 'SZ',  // 深圳证券交易所

  // 市场状态
  market_status_normal: 0,  // 正常
  market_status_settling: 1,  // 清算中
  market_status_settleend: 2,  // 清算完成
  market_status_stop: 3,  // 暂停交易

  // 银行间回购匹配状态
  match_status_matched: 1,  // 已匹配
  match_status_executed: 2,  // 已委托
  match_status_canceled: 3,  // 已撤销

  // 用户菜单状态
  menu_status_true: 1,  // 启用
  menu_status_false: 2,  // 禁用

  // 指令执行状态
  order_execution_status_normal: 1,  // 正常
  order_execution_status_stop: 2,  // 暂停

  // 密码组成
  password_constitutes_character: 1,  // 字母
  password_constitutes_number: 2,  // 数字
  password_constitutes_special: 3,  // 特殊字符

  // 强制修改密码类型
  password_last_login_time_first_login: 1,  // 首次登录重置
  password_last_login_time_passwd_reset: 2,  // 密码重置后

  // 密码重置方式
  password_reset_type_admin: 1,  // 系统管理员

  // 支付日类型
  pay_day_type_today: 0,  // 当天
  pay_day_type_month_firstday: 1,  // 月第一天
  pay_day_type_quarter_firstday: 2,  // 季度第一天
  pay_day_type_year_firstday: 3,  // 年第一天

  // 支付周期
  payment_frequency_day: 0,  // 日
  payment_frequency_month: 1,  // 月
  payment_frequency_quarter: 2,  // 季度
  payment_frequency_year: 3,  // 年

  // 缴款状态
  payment_status_noneed_pay: 0,  // 无需缴款
  payment_status_hasnot_pay: 1,  // 未缴款
  payment_status_had_pay: 2,  // 已缴款

  // 收费单位
  payment_third_party_fundcompany: 0,  // 基金公司
  payment_third_party_chinabond: 1,  // 中债登
  payment_third_party_ib: 2,  // 银行间
  payment_third_party_clearingHouse: 3,  // 上清算
  payment_third_party_shse: 4,  // 上交所
  payment_third_party_szse: 5,  // 深交所
  payment_third_party_secucomm: 6,  // 证监会

  // 违约金类型
  penalty_type_daily: 0,  // 日利率
  penalty_type_coupon: 1,  // 票面利率

  // 持仓类型常量
  position_type_A: 'A',  // 可供出售
  position_type_C: 'C',  // 可流通
  position_type_H: 'H',  // 持有到期

  // 估值价格方法常量
  price_method_Average: 'Average',  // 平均价法
  price_method_Close: 'Close',  // 市价法
  price_method_Cost: 'Cost',  // 成本法

  // 指令审批状态(简写)-审批界面展示
  proc_approval_short_status_normal: 0,  // 无需审批
  proc_approval_short_status_pending_approval: 1,  // 待审批
  proc_approval_short_status_accepted: 2,  // 已通过
  proc_approval_short_status_rejected: 3,  // 已拒绝
  proc_approval_short_status_canceled: 4,  // 已撤销

  // 指令审批状态-总览界面展示
  proc_approval_status_none: 0,  // --
  proc_approval_status_pending_approve: 1,  // 待指令一级审批
  proc_approval_status_first_accepted: 2,  // 待指令二级审批
  proc_approval_status_first_rejected: 3,  // 一级审批拒绝
  proc_approval_status_second_accepted: 4,  // 待指令三级审批
  proc_approval_status_second_rejected: 5,  // 二级审批拒绝
  proc_approval_status_third_accepted: 6,  // 三级审批通过
  proc_approval_status_third_rejected: 7,  // 三级审批拒绝

  // 指令流程分类
  proc_def_category_pledge_repo: 1,  // 质押式回购指令流程
  proc_def_category_ibbond_bond: 2,  // 银行间现券买卖
  proc_def_category_bond_cd: 3,  // 同业存单
  proc_def_category_bond_ipo: 4,  // 债券申购
  proc_def_category_sse_bond: 5,  // 交易所债券买卖
  proc_def_category_sse_repo: 6,  // 交易所质押式回购
  proc_def_category_ib_depo: 7,  // 同业存款

  // 流程分类
  process_category_pledge_repo: 1,  // 质押式回购
  process_category_ibbond_bond: 2,  // 银行间现券买卖
  process_category_bond_cd: 3,  // 同业存单指令流程
  process_category_bond_ipo: 4,  // 债券申购指令流程
  process_category_sse_bond: 5,  // 交易所债券买卖
  process_category_sse_repo: 6,  // 交易所质押式回购
  process_category_ib_depo: 7,  // 同业存款

  // eod流程状态
  process_state_unhandle: 0,  // 未处理
  process_state_handling: 1,  // 处理中
  process_state_handled: 2,  // 处理完成
  process_state_exception: 3,  // 处理失败

  // 生成产品或产品组
  production_group_fund: 0,  // 产品
  production_group_fundgroup: 1,  // 产品组

  // 持仓类型 / 持有类型
  ps_type_code_sale: 'A',  // 可供出售
  ps_type_code_trade: 'C',  // 可供交易
  ps_type_code_maturity: 'H',  // 持有到期

  // 发行募集类型
  raise_class_public: '001',  // 债券公开发行信息
  raise_class_target: '002',  // 债券私募发行信息

  // 评级限制
  rating_type_outer_st_rtng: 15,  // 外部短期信用评级
  rating_type_outer_lt_rtng: 16,  // 外部长期信用评级
  rating_type_inner_st_rtng: 90,  // 内部短期信用评级
  rating_type_inner_lt_rtng: 91,  // 内部长期信用评级

  // 银行间回购询价状态
  repo_enquiry_status_pending_match: 1,  // 未匹配
  repo_enquiry_status_matching: 2,  // 部分匹配
  repo_enquiry_status_matched: 3,  // 全部匹配
  repo_enquiry_status_canceled: 4,  // 已撤销

  // 银行间回购指令状态
  repo_instruction_status_pending_execute: 3,  // 待执行
  repo_instruction_status_executing: 4,  // 执行中
  repo_instruction_status_finished: 6,  // 已完成
  repo_instruction_status_canceled: 7,  // 已撤销
  repo_instruction_status_changed: 8,  // 已变更
  repo_instruction_status_updating: 9,  // 修改中

  // 角色管理启用状态
  role_status_disable: 0,  // 禁用
  role_status_enable: 1,  // 启用
  role_status_deleted: 2,  // 已删除

  // 风控校验触发等级
  rule_alert_level_none: 0,  // 无
  rule_alert_level_warn: 1,  // 触发预警值
  rule_alert_level_approve: 2,  // 触发审批值
  rule_alert_level_forbidden: 3,  // 触发禁止值

  // 风控校验结果
  rule_check_result_no_check: 0,  // 无需检查
  rule_check_result_passed: 1,  // 检查通过
  rule_check_result_failed: 2,  // 检查不通过

  // 风控触警状态
  rule_check_status_err: -1,  // 异常
  rule_check_status_normal: 0,  // 正常
  rule_check_status_warn: 1,  // 预警
  rule_check_status_approve: 2,  // 审批
  rule_check_status_forbidden: 3,  // 禁止

  // 风控检查方式(因子属性)
  rule_check_type_default: 0,  // 默认
  rule_check_type_positerate: 1,  // 遍历持仓
  rule_check_type_sumcheck: 2,  // 汇总检查

  // 风控条件因子比较运算符
  rule_comparison_operators_compare_op_0: 0,  // 属于|不属于|等于|不等于
  rule_comparison_operators_compare_op_1: 1,  // 等于|不等于|大于|小于|大于等于|小于等于
  rule_comparison_operators_compare_op_2: 2,  // 等于|不等于
  rule_comparison_operators_compare_op_3: 3,  // 属于|不属于
  rule_comparison_operators_compare_op_4: 4,  // 包含|不包含|等于|不等于
  rule_comparison_operators_compare_op_5: 5,  // 包含|不包含

  // 风控合规额度控制层级
  rule_compliance_limit_control_level_company: 0,  // 公司
  rule_compliance_limit_control_level_fundgroup: 1,  // 产品组
  rule_compliance_limit_control_level_fund: 2,  // 产品

  // 风控条款控制层级
  rule_control_level_company: 0,  // 公司
  rule_control_level_fundgroup: 1,  // 产品组
  rule_control_level_fund: 2,  // 产品
  rule_control_level_assetunit: 3,  // 资产单元
  rule_control_level_strategy: 4,  // 策略

  // 风控条款设置维度
  rule_dimension_type: 0,  // 按类型
  rule_dimension_fund: 1,  // 按产品

  // 风控模块判断有无
  rule_flag_no: 0,  // 无
  rule_flag_yes: 1,  // 有

  // 风控条件因子表单类型
  rule_form_type_casmultiselect: 'casmultiselect',  // 级联多选下拉列表
  rule_form_type_cassingleselect: 'cassingleselect',  // 级联单选下拉列表
  rule_form_type_multiselect: 'multiselect',  // 多选下拉框
  rule_form_type_singleselect: 'singleselect',  // 单选下拉框
  rule_form_type_text: 'text',  // 文本框

  // 风控因子取值方式
  rule_getval_type_dictdata: 'dictdata',  // 数据字典
  rule_getval_type_innerimpl: 'innerimpl',  // 内部提供
  rule_getval_type_interface: 'interface',  // 接口访问
  rule_getval_type_notype: 'notype',  // 无需提供

  // 风控交易对手级别
  rule_ibcounter_level_first: 1,  // 一级
  rule_ibcounter_level_second: 2,  // 二级
  rule_ibcounter_level_third: 3,  // 三级
  rule_ibcounter_level_fourth: 4,  // 四级

  // 交易对手黑白名单类型
  rule_ibcounter_type_white_list: 0,  // 白名单
  rule_ibcounter_type_black_list: 1,  // 黑名单

  // 风控投向池类型
  rule_invest_pool_type_allowed: 0,  // 投资池
  rule_invest_pool_type_banned: 1,  // 禁投池

  // 风控公式投向
  rule_invest_side_forbidden: 0,  // 禁止
  rule_invest_side_allowonly: 1,  // 只允许

  // 风控额度分类
  rule_limit_class_risk: 0,  // 风险额度
  rule_limit_class_compliance: 1,  // 合规额度

  // 风控因子入参选项
  rule_param_op_conditionandflag: 0,  // 条件规则+在途标识
  rule_param_op_condition: 1,  // 条件规则
  rule_param_op_none: 2,  // 无入参

  // 风控条件因子解析方式
  rule_parse_type_expression: 0,  // 表达式
  rule_parse_type_method: 1,  // 方法

  // 风控因子返回值类型
  rule_return_type_String: 'String',  // String
  rule_return_type_boolean: 'boolean',  // boolean
  rule_return_type_double: 'double',  // double
  rule_return_type_int: 'int',  // int

  // 风控风险额度控制层级
  rule_risk_limit_control_level_company: 0,  // 公司级额度
  rule_risk_limit_control_level_fundgroup: 1,  // 产品组级额度

  // 投向池添加证券方式
  rule_secu_add_type_cover: 'cover',  // 覆盖
  rule_secu_add_type_merge: 'merge',  // 合并

  // 风控复杂因子证券属性
  rule_secu_prop_secutype: 0,  // 证券类型
  rule_secu_prop_secuboard: 1,  // 证券板块
  rule_secu_prop_market: 2,  // 交易市场

  // 风控条款状态
  rule_status_pause: 0,  // 暂停
  rule_status_start: 1,  // 启动

  // 风控类型
  rule_type_A: 'A',  // 比例类
  rule_type_B: 'B',  // 额度类
  rule_type_C: 'C',  // 范围类

  // 风控条款数量单位
  rule_unit_none: 0,  // 无
  rule_unit_percent: 1,  // %(比例)
  rule_unit_stock: 2,  // 股
  rule_unit_sheet: 4,  // 张
  rule_unit_day: 5,  // 天
  rule_unit_month: 6,  // 月
  rule_unit_year: 7,  // 年

  // 风控条款创建步骤
  ruleitem_create_step_select_rule: 0,  // 公式选择
  ruleitem_create_step_basic_prop: 1,  // 基本属性
  ruleitem_create_step_control_prop: 2,  // 控制属性
  ruleitem_create_step_created: 3,  // 创建完成

  // 风控条款状态
  ruleitems_status_disable: 0,  // 禁用
  ruleitems_status_normal: 1,  // 正常
  ruleitems_status_overdue: 2,  // 过期

  // 保密级别
  security_level_normal: 1,  // 普通
  security_level_secrecy: 2,  // 保密
  security_level_confidential: 3,  // 机密

  // 分段标准
  segement_type_due: 0,  // 期限
  segement_type_amt: 1,  // 金额

  // 分段计费取值类型
  segement_value_type_rate: 1,  // 费率
  segement_value_type_total: 2,  // 固定费用

  // 清算场所(cbr = china bond registor  shch = shanghai clearning house)
  setting_h_code_cbr: '001',  // 中债登
  setting_h_code_shch: '002',  // 上清所
  setting_h_code_cbr_sh: '003',  // 中债登上海分公司
  setting_h_code_cbr_sz: '004',  // 中债登深圳分公司

  // 结算方式
  settle_method_DVP: 1,  // 券款对付
  settle_method_PUD: 2,  // 见券付款
  settle_method_DUP: 3,  // 见款付券

  // 当前所处清算页面
  settlement_page_start: 0,  // 清算开始页面
  settlement_page_process: 1,  // 清算流程页面
  settlement_page_end: 2,  // 清算结束页面

  // 清算速度
  settlement_speed_t0: 0,  // T+0
  settlement_speed_t1: 1,  // T+1

  // 日终清算步骤
  settlement_step_backup: 1,  // 数据库备份
  settlement_step_file_handle: 2,  // 文件处理
  settlement_step_execution_check: 3,  // 成交核对
  settlement_step_settlement_start: 4,  // 清算估值
  settlement_step_backup2: 5,  // 数据库再次备份

  // 用户登录日限制类型
  sign_in_permit_date_type_none: 0,  // 不限制
  sign_in_permit_date_type_trading_day: 1,  // 交易日
  sign_in_permit_date_type_non_trading_day: 2,  // 非交易日

  // 用户登陆次数限制类型
  sign_in_permit_times_type_day: 1,  // 日
  sign_in_permit_times_type_month: 30,  // 月
  sign_in_permit_times_type_week: 7,  // 周

  // 交易所债券买卖
  sse_bond_instruction_status_pending_rejected: 1,  // 风控不通过
  sse_bond_instruction_status_pending_new: 2,  // 新指令
  sse_bond_instruction_status_pending_execute: 3,  // 待执行
  sse_bond_instruction_status_executing: 4,  // 执行中
  sse_bond_instruction_status_finished: 6,  // 已完成
  sse_bond_instruction_status_canceled: 7,  // 已撤销
  sse_bond_instruction_status_updating: 9,  // 修改中

  // 交易所债券交易方向
  sse_bond_trade_type_B: 'B',  // 买入
  sse_bond_trade_type_BCALL: 'BCALL',  // 回售
  sse_bond_trade_type_S: 'S',  // 卖出

  // 普通交易前端展示指令状态
  sse_inst_status_pending_rejected: 1,  // 指令生效失败
  sse_inst_status_executing: 10,  // 执行中
  sse_inst_status_finished: 11,  // 已完成
  sse_inst_status_canceled: 12,  // 已撤销
  sse_inst_status_pending_new: 2,  // 待生效
  sse_inst_status_pending_execute: 3,  // 待执行
  sse_inst_status_pending_1st_approve: 4,  // 待指令一级审批
  sse_inst_status_pending_2nd_approve: 5,  // 待指令二级审批
  sse_inst_status_pending_3rd_approve: 6,  // 待指令三级审批
  sse_inst_status_refused_1st_approve: 7,  // 指令一级审批拒绝
  sse_inst_status_refused_2nd_approve: 8,  // 指令二级审批拒绝
  sse_inst_status_refused_3rd_approve: 9,  // 指令三级审批拒绝

  // 交易所回购指令状态
  sse_repo_instruction_status_pending_rejected: 1,  // 风控不通过
  sse_repo_instruction_status_pending_new: 2,  // 新指令
  sse_repo_instruction_status_pending_execute: 3,  // 待执行
  sse_repo_instruction_status_executing: 4,  // 执行中
  sse_repo_instruction_status_finished: 6,  // 已完成
  sse_repo_instruction_status_canceled: 7,  // 已撤销
  sse_repo_instruction_status_updating: 9,  // 修改中

  // 交易所回购质押出入库方向
  sse_repo_trade_side_in: 'RI',  // 质押入库
  sse_repo_trade_side_out: 'RO',  // 质押出库

  // 交易所回购
  sse_repo_trade_type_RR: 'RR',  // 卖出
  sse_repo_trade_type_SR: 'SR',  // 买入

  // 状态变更操作
  status_chg_record_operation_frozen: 1,  // 冻结
  status_chg_record_operation_unfrozen: 2,  // 解冻
  status_chg_record_operation_forbit_open: 3,  // 限制开仓
  status_chg_record_operation_permit_open: 4,  // 允许开仓
  status_chg_record_operation_active: 5,  // 产品激活

  // 产品策略状态
  strategy_status_normal: 0,  // 正常
  strategy_status_deprecated: 1,  // 弃用
  strategy_status_frozen: 2,  // 冻结

  // Redis刷新缓存状态
  sys_cache_data_status_pending: 0,  // 刷新中
  sys_cache_data_status_success: 1,  // 刷新成功
  sys_cache_data_status_fail: 2,  // 刷新失败

  // 系统模块检查
  sys_module_status_unchecked: -1,  // 未检查
  sys_module_status_exception: 0,  // 异常
  sys_module_status_nomral: 1,  // 正常

  // 系统状态
  sys_status_nornal: 0,  // 正常交易
  sys_status_setting: 1,  // 清算中
  sys_status_settled: 2,  // 清算完成
  sys_status_initializing: 3,  // 初始化中
  sys_status_initialized: 4,  // 初始化完成

  // 系统服务类别
  sys_type_dubbo: 'dubbo',  // dubbo类
  sys_type_eventbus: 'eventbus',  // eventbus类
  sys_type_web: 'web',  // web类

  // 系统模块名称
  systems_auth: 'auth',  // auth
  systems_qaw: 'qaw',  // qaw
  systems_qcw: 'qcw',  // qcw
  systems_qdw: 'qdw',  // qdw
  systems_qow: 'qow',  // qow
  systems_qtw: 'qtw',  // qtw
  systems_redisadmin: 'redisadmin',  // redisadmin

  // 估值税率类型常量
  tax_type_D: 'D',  // 债券利息

  // 投标标的（发行标的）
  tender_type_quantity: '001',  // 数量
  tender_type_price: '002',  // 价格
  tender_type_rate: '003',  // 利率
  tender_type_spread: '004',  // 利差

  // 期限类型
  term_type_exercise: 0,  // 行权期限
  term_type_maturity: 1,  // 到期期限

  // 时间片类型
  timeslice_type_callAction: 1,  // 集合竞价
  timeslice_type_continuousAuction: 2,  // 连续竞价
  timeslice_type_declarationIntention: 3,  // 意向申报
  timeslice_type_tzero: 4,  // T+0交易
  timeslice_type_tone: 5,  // T+1交易

  // 交易方向
  trade_type_code_buy: 'B',  // 买入
  trade_type_code_RR: 'RR',  // 逆回购
  trade_type_code_sell: 'S',  // 卖出
  trade_type_code_SR: 'SR',  // 正回购

  // 出入库方向
  trading_side_in: 0,  // 入库
  trading_side_out: 1,  // 出库

  // 消息模版操作类型
  trans_type_add: 'add',  // 添加
  trans_type_edit: 'edit',  // 编辑

  // 持仓划拨状态
  transfer_position_status_fail: 0,  // 失败
  transfer_position_status_success: 1,  // 成功

  // 划拨状态
  transfer_status_new: 1,  // 新建
  transfer_status_passed: 2,  // 通过
  transfer_status_reject: 3,  // 拒绝
  transfer_status_part_passed: 4,  // 部分通过

  // 用户是否启用
  user_enable_false: 0,  // 禁用
  user_enable_true: 1,  // 启用

  // 用户组角色
  user_group_role_member: 0,  // 组员
  user_group_role_leader: 1,  // 组长

  // 授权状态
  user_right_group_status_new: 1,  // 待复核
  user_right_group_status_approved: 2,  // 已通过
  user_right_group_status_rejected: 3,  // 已拒绝
  user_right_group_status_canceled: 4,  // 已撤销
  user_right_group_status_expired: 5,  // 已过期

  // 用户登录设置项是否限制校验
  user_sign_in_type_limit_none: 0,  // 不限制
  user_sign_in_type_limit_done: 1,  // 限制

  // 用户状态
  user_status_frozen: 0,  // 已冻结
  user_status_enable: 1,  // 正常
  user_status_canceled: 2,  // 已注销

  // 运营估值规则
  valudate_rule_t0: 'T+0',  // T+0
  valudate_rule_t1: 'T+1',  // T+1
  valudate_rule_T2: 'T+2',  // T+2

  // 同业存单前端展示指令状态
  web_cd_instruction_status_pending_rejected: 1,  // 指令生效失败
  web_cd_instruction_status_pending_1st_approve: 10,  // 待指令一级审批
  web_cd_instruction_status_pending_2nd_approve: 11,  // 待指令二级审批
  web_cd_instruction_status_pending_3rd_approve: 12,  // 待指令三级审批
  web_cd_instruction_status_refused_1st_approve: 13,  // 指令一级审批拒绝
  web_cd_instruction_status_refused_2nd_approve: 14,  // 指令二级审批拒绝
  web_cd_instruction_status_refused_3rd_approve: 15,  // 指令三级审批拒绝
  web_cd_instruction_status_executing: 16,  // 执行中
  web_cd_instruction_status_finished: 17,  // 已完成
  web_cd_instruction_status_canceled: 18,  // 已撤销
  web_cd_instruction_status_pending_new: 2,  // 待生成指令
  web_cd_instruction_status_pending_execute: 3,  // 待执行
  web_cd_instruction_status_pending_1st_approve_intention: 4,  // 待意向一级审批
  web_cd_instruction_status_pending_2nd_approve_intention: 5,  // 待意向二级审批
  web_cd_instruction_status_pending_3rd_approve_intention: 6,  // 待意向三级审批
  web_cd_instruction_status_refused_1st_approve_intention: 7,  // 意向一级审批拒绝
  web_cd_instruction_status_refused_2nd_approve_intention: 8,  // 意向二级审批拒绝
  web_cd_instruction_status_refused_3rd_approve_intention: 9,  // 意向三级审批拒绝

  // 同业定期存款前端展示询价状态
  web_ib_depo_enquiry_status_pending_rejected: 1,  // 询价生效失败
  web_ib_depo_enquiry_status_contract_approving: 10,  // 合同审批中
  web_ib_depo_enquiry_status_refused_contract_approve: 11,  // 合同审批拒绝
  web_ib_depo_enquiry_status_pending_execute: 12,  // 待执行
  web_ib_depo_enquiry_status_finished: 13,  // 已完成
  web_ib_depo_enquiry_status_canceled: 14,  // 已撤销
  web_ib_depo_enquiry_status_pending_new: 2,  // 待生效
  web_ib_depo_enquiry_status_pending_contract_approve: 3,  // 待合同审批
  web_ib_depo_enquiry_status_pending_1st_approve: 4,  // 待询价一级审批
  web_ib_depo_enquiry_status_pending_2nd_approve: 5,  // 待询价二级审批
  web_ib_depo_enquiry_status_pending_3rd_approve: 6,  // 待询价三级审批
  web_ib_depo_enquiry_status_refused_1st_approve: 7,  // 询价一级审批拒绝
  web_ib_depo_enquiry_status_refused_2nd_approve: 8,  // 询价二级审批拒绝
  web_ib_depo_enquiry_status_refused_3rd_approve: 9,  // 询价三级审批拒绝

  // 同业定期存款前端展示指令状态
  web_ib_depo_instruction_status_pending_rejected: 1,  // 指令生效失败
  web_ib_depo_instruction_status_executing: 10,  // 执行中
  web_ib_depo_instruction_status_finished: 11,  // 已完成
  web_ib_depo_instruction_status_canceled: 12,  // 已撤销
  web_ib_depo_instruction_status_pending_new: 2,  // 待生效
  web_ib_depo_instruction_status_pending_execute: 3,  // 待执行
  web_ib_depo_instruction_status_pending_1st_approve: 4,  // 待指令一级审批
  web_ib_depo_instruction_status_pending_2nd_approve: 5,  // 待指令二级审批
  web_ib_depo_instruction_status_pending_3rd_approve: 6,  // 待指令三级审批
  web_ib_depo_instruction_status_refused_1st_approve: 7,  // 指令一级审批拒绝
  web_ib_depo_instruction_status_refused_2nd_approve: 8,  // 指令二级审批拒绝
  web_ib_depo_instruction_status_refused_3rd_approve: 9,  // 指令三级审批拒绝

  // 是否
  yes_no_no: 0,  // 否
  yes_no_yes: 1,  // 是

  // 是,否,不适用
  yes_no_notapply_no: 0,  // 否
  yes_no_notapply_yes: 1,  // 是
  yes_no_notapply_notapply: 2,  // 不适用

};
export default DICT;
