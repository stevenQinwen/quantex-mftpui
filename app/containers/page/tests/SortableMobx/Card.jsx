import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    };
  },
  /**
   * 当拖拽动作结束,该方法被调用
   * @param props
   * @param monitor
   */
  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop(); // 该方法的目标元素(owner)是 target
    // Q1: 当 drop target 处理了 drop 事件具体是什么时机?
    // A: 如果没有触发放置事件(即卡片被放置在容器外),即被拖拽对象没有放到目标对象位置(不包含自己),则将被拖拽对象放回原位(恢复拖动操作)
    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  },
};

const cardTarget = {
  // 是否允许将被拖拽对象放在目标对象上(里)
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;
    logger.log("cardTarget hover=====:", props, draggedId, overId);
    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  },
};

@observer
@DropTarget(ItemTypes.CARD, cardTarget, (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
})
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
})
export default class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired,
  };

  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    // 可以将任何节点作为可拖拽对象 this.props.connectDragSource(element)
    return connectDragSource(
      connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
    );
  }
}
