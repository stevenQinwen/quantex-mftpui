import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { DragSource, DropTarget } from 'react-dnd';
import { action } from 'mobx';
import { Switch, InputNumber } from 'antd';
import classNames from 'classnames';
import ItemTypes from './ItemTypes';
import styles from '../index.scss';

/**
 * 是否是默认模板
 * @param {*} props 组件 props
 */
const isDefaultTpl = (props) => {
  return props.tplIndex === -1;
};

/**
 * 是否可拖拽
 * @param {*} props 组件 props
 * 1. 【默认模板】不可拖拽
 * 2. 有 fixed: ‘left/right’ 配置项的列不可拖拽
 */
const isDraggable = (props) => {
  return !isDefaultTpl(props) && !props.column.limit.fixed;
};

const columnSource = {
  beginDrag(props) {
    return {
      id: props.id, // 每一条记录的 title 唯一
      originalIndex: props.findColumn(props.id).index
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop(); // 该状态标记目标元素是否接口被拖拽元素放置

    // 当被拖拽元素被拖出放置目标范围再放开时，被拖拽元素恢复至原位
    if (!didDrop) {
      props.moveColumn(droppedId, originalIndex);
    }
  },

  canDrag(props) {
    return isDraggable(props);
  }
};

const columnTarget = {
  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;
    // 若该位置符合 ‘可放置’条件并且不是被拖拽元素原位时，可进行调换位置
    if (!props.column.limit.fixed && draggedId !== overId) {
      const { index: overIndex } = props.findColumn(overId);
      props.moveColumn(draggedId, overIndex);
    }
  }
};

@DropTarget(ItemTypes.COLUMN, columnTarget, (connect) => {
  return {
    connectDropTarget: connect.dropTarget()
  };
})
@DragSource(ItemTypes.COLUMN, columnSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
})
@observer
class ColumnComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: props.column
    };
  }

  /**
   * 编辑该列属性
   * @param attr 属性
   * @param val
   * 1. 若该项的 limit.require 配置为 true, 说明该项为必需项，则不可编辑‘展示/隐藏’
   */
  handleChange = action((attr, val) => {
    const { column } = this.state;
    if (column.limit.require) { // 若该项是必需项，则一定要展示
      column.show = true;
    }
    column[attr] = val;
    this.props.onChangeColumn(column);
  });

  render() {
    const { column } = this.state;
    const { connectDragSource, connectDropTarget, connectDragPreview, isDragging } = this.props;
    // const opacity = isDragging ? 0 : 1;
    // TODO（Sharon）:设置被拖拽对象背景色(未设置成功)
    const style = {
      backgroundColor: '#add8f7'
    };
    // 每一列的样式, 不显示的列颜色置灰
    const columnClass = classNames({
      [styles.column]: true,
      [styles['text-muted']]: !(column.show || column.limit.require)
    });
    return connectDragPreview(connectDropTarget(
      <div className={columnClass} style={isDragging ? style : null}>
        {
          connectDragSource(<span className={styles['column-drag-bar']}>
            <i hidden={!isDraggable(this.props)} style={{ cursor: 'move' }}>&#10018;</i><i hidden={isDraggable(this.props)}>&#10003;</i>
          </span>)
        }
        <span className={styles['column-title']}>
          <span className={styles['column-title-bar']} style={{ width: column.width }}>
            <strong>{column.title}</strong>
          </span>
        </span>
        <span className={styles['column-require']} hidden={!column.limit.require}>(必选)</span>
        <div className="float-right">
          <span className={styles['column-width']}>
            <span>宽度 </span>
            <InputNumber value={column.width}
            size="small"
            placeholder="auto"
            min={5}
            step={5}
            onChange={ (val) => { this.handleChange('width', val); } } disabled={ isDefaultTpl(this.props) || column.limit.widthable === false}/>
             px
          </span>
          <Switch checked={column.show}
          className={styles['column-show']}
          onChange = {(val) => { this.handleChange('show', val); }}
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          disabled={isDefaultTpl(this.props) || column.limit.require}/>
        </div>
      </div>)
    );
  }
}

export default ColumnComponent;
