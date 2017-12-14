import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Form, Input, Button } from 'antd';
import { Util } from 'utils';
import Column from './Column';
import UIState from './UIState';
import ItemTypes from './ItemTypes';
import CONSTANT from '../constant';
import styles from '../index.scss';

const FormItem = Form.Item;

const columnTarget = {
  drop() { }
};

const dropTargetConnet = (connect) => {
  return {
    connectDropTarget: connect.dropTarget() // 返回一个方法作为属性传给组件
  };
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.COLUMN, columnTarget, dropTargetConnet)
@observer
class ColumnSortableComponnet extends Component {
  constructor(props) {
    super(props);
    const { tplIndex, tpl, defaultColumns } = props; // 模板序号，模板记录{name: xx, columns[]}, 界面 Table 提供 Columns
    this.uiState = new UIState(tplIndex, tpl.name);
    this.uiState.initColumns(tpl.columns, defaultColumns);
    this.columnNum = defaultColumns.length;
  }
  /**
   * 只保存显示的列
   */
  handleSave = (e) => {
    e.preventDefault(); // 阻止表单提交的默认行为
    let columns = this.uiState.columns.filter((item) => {
      return item.show === true;
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          tplIndex: this.props.tplIndex,
          tpl: {
            name: values.name, // 模板名称
            columns: columns.slice()
          }
        };
        this.props.onSubmit(data); // 保存模板
      }
    });
  };

  /**
   * 移动对象
   * @param id 被拖拽对象唯一标识
   * @param atIndex 被拖拽对象最终要被放置的位置
   */
  moveColumn = action((id, atIndex) => {
    const { column, index } = this.findColumn(id);
    const { columns } = this.uiState;
    columns.splice(index, 1);
    columns.splice(atIndex, 0, column);
  });

  /**
   * 通过 id 找到相应的 column 对象及其 index（序号）
   * @param id
   */
  findColumn = (id) => {
    const { columns } = this.uiState;
    const column = columns.filter((item) => {
      return item.title === id;
    })[0];
    return {
      column,
      index: columns.indexOf(column)
    };
  };

  renderColumnList = () => {
    const { connectDropTarget, tplIndex } = this.props;
    const { columns, columnListKey } = this.uiState;
    return connectDropTarget(<div className={styles['column-list']} key={columnListKey}>
      {
        columns.map((item, index) => {
          return (<Column column={item}
            key={item.title}
            id={item.title}
            tplIndex={tplIndex}
            moveColumn={this.moveColumn}
            findColumn={this.findColumn}
            onChangeColumn={(column) => { this.uiState.updateColumns(index, column); }}/>);
        })
      }
    </div>);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const { tplIndex } = this.props;
    return (
      <Form onSubmit={this.handleSave}>
        <FormItem {...formItemLayout} label="模板名称">
            {
              getFieldDecorator("name", {
                rules: [{ required: true, whitespace: true, message: '必填' }]
              })(
                <Input size="small" type="text" disabled={tplIndex === CONSTANT.TPL_DEFAULT}/>
              )
            }
        </FormItem>
        {
          tplIndex === CONSTANT.TPL_DEFAULT ? <span className="text-danger align-baseline-middle">【默认模板】不可编辑或删除</span> : <Button size="small" type="primary" htmlType="submit">保存模板</Button>
        }
        <span className="float-right m-t-6">（共 { this.columnNum } 列)</span>
        {
          this.renderColumnList()
        }
      </Form>
    );
  }
}

const ColumnSortable = Form.create({
  mapPropsToFields(props) {
    return Util.mapPropsToFields(props.tpl);
  }
})(ColumnSortableComponnet);

export default ColumnSortable;
