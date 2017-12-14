import { Input, Checkbox } from 'antd';
import { InputNumber, Select, TreeSelect, Cascader, DatePicker, ComponentDict } from 'components';


/**
 * 获取组件{component}
 * @param componentName 组件名称 {string}
 * @returns {XML}
 */
export default function getComponent(componentName) {
  switch (componentName) {
    case ComponentDict.Input: return Input;
    case ComponentDict.Checkbox: return Checkbox;
    case ComponentDict.InputNumber: return InputNumber;
    case ComponentDict.PercentNumber: return InputNumber.PercentNumber;
    case ComponentDict.TenThousandNumber: return InputNumber.TenThousandNumber;
    case ComponentDict.Select: return Select;
    case ComponentDict.TreeSelect: return TreeSelect;
    case ComponentDict.Cascader: return Cascader;
    case ComponentDict.DatePicker: return DatePicker;
    default: throw new Error('ItemComponent invalid, component should be a string which in [InputNumber, Select, PercentNumber]');
  }
}
