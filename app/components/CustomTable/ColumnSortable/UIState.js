import { observable, action } from 'mobx';
import _ from 'lodash';
import CONSTANT from '../constant';

class UIState {
  @observable columnListKey = 0; // 触发列表格刷新
  @observable columns = []; // 存放 defaultColumns 和 customColumns 合并后的所有 columns

  constructor(tplIndex, tplName) {
    this.tplIndex = tplIndex;
    this.tplName = tplName;
  }

  refreshColumnContainer = action(() => {
    this.columnListKey = _.uniqueId("column.container");
  });

  setColumns = action((columns) => {
    this.columns = columns;
  });

  /**
   * 初始化界面上的编辑表格列的部分
   * @param customColumns 获取到用户自定义的模板
   * @param defaultColumns 界面上 Table 的 config.columns
   * 1. 根据 tplIndex 判断是否存在用户自定义的模板，若为 -2 表示未使用用户自定义的模板
   * 2. 若已使用用户自定义的模板，则将用户自定的模板数据与页面获取的配置数据合并，
   *    并保持‘隐藏项（即用户自定义未显示的项）’原有的位置
   *    即该项在默认配置中在第 5 位，合并后依然显示在第 5 位，同时保持用户所定义项的顺序
   */
  initColumns = action((customColumns, defaultColumns) => {
    this._setRealTitle(defaultColumns); // 设置真实的 title(即纯文字的 title，兼容 title 为 react.element 类型数据)
    if (this.tplIndex == CONSTANT.TPL_DEFAULT || this.tplIndex == CONSTANT.TPL_NEW) {
      defaultColumns.forEach((item) => {
        let col = {
          title: item.title,
          limit: item.limit || {},
          width: item.width,
          show: true
        };
        this.columns.push(col);
      });
    } else {
      // 获取隐藏的 columns 序号，即用户自定义中未显示的列的序号
      let hiddenIndex = this._getHiddenIndex(customColumns, defaultColumns);
      // 把显示的项（即用户自定义的项）放到总 columns 中
      this.columns = this.columns.concat(this._getCustomColumnsWithDefaultConfig(customColumns, defaultColumns));
      // 将隐藏的项按照默认配置（defaultColumns）中的顺序插入
      hiddenIndex.forEach((item) => {
        let col = {
          title: defaultColumns[item].title,
          limit: defaultColumns[item].limit || {},
          width: defaultColumns[item].width,
          show: false
        };
        if (item < this.columns.length) {
          this.columns.splice(item, 0, col);
        } else {
          this.columns.push(col);
        }
      });
    }
    this._orderByFixed(); // 按照 fixed：'left/right' 配置项进行排列
  });

  /**
   * 设置真实的 title, 将有配置 titleText 的值作为自定义表格的 title,为兼容 title 为 react.element 类型数据
   * @param defaultColumns 从界面上获取的数据
   */
  _setRealTitle = action((defaultColumns) => {
    defaultColumns.forEach((item) => {
      if (item.titleText) {
        item.title = item.titleText;
      }
    });
  });

  /**
   * 获取所有隐藏项的 index, 即 tableColumns 中不在 customColumns 中的所有项 index
   * @param customColumns 来自 IndexedDB 中的 columns
   * @param tableColumns 来自页面的 Table columns
   */
  _getHiddenIndex = (customColumns, tableColumns) => {
    let hiddenIndex = [];
    tableColumns.forEach((item, index) => {
      let col = customColumns.find((subItem) => {
        return subItem.title === item.title;
      });
      if (col === undefined) {
        hiddenIndex.push(index);
      }
    });
    return hiddenIndex;
  };

  /**
   * 将用户自定义显示的项赋上表格默认配置项，如 limit
   * @param customColumns 用户自定义的模板列
   * @param tableColumns 页面上 Table 默认配置列
   */
  _getCustomColumnsWithDefaultConfig = (customColumns, tableColumns) => {
    let cols = [];
    customColumns.forEach((item) => {
      let col = tableColumns.find((subItem) => {
        return subItem.title === item.title;
      });
      if (col === undefined) {
        return;
      }
      let col2 = {
        title: col.title,
        limit: col.limit || {},
        width: item.width,
        show: true
      };
      cols.push(col2);
    });
    return cols;
  };

  /**
   * 根据 limit:{ fixed：'right/left/undefined'} 对 this.columns 进行分组: 1. left -> 2. undefined -> 3. right
   */
  _orderByFixed = () => {
    let lCols = [];
    let rCols = [];
    let cols = [];
    this.columns.forEach((col) => {
      let fixed = col.limit.fixed;
      if (fixed == 'left') {
        lCols.push(col);
      } else if (fixed == 'right') {
        rCols.push(col);
      } else {
        cols.push(col);
      }
    });
    this.columns = [...lCols, ...cols, ...rCols];
  };

  /**
   * 更新定义的表列项
   * @param colIndex 当前列序号
   * @param column 当前列内容
   */
  updateColumns = action((colIndex, column) => {
    this.columns[colIndex] = column;
  });
}

export default UIState;
