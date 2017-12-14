import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
};

// 可拖拽范围样式
const handleStyle = {
  // backgroundColor: 'green',
  width: '16px',
  height: '16px',
  display: 'inline-block',
  marginRight: '6px',
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
    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  },
};

@DropTarget(ItemTypes.CARD, cardTarget, (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
})
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
})
export default class DraggableCardComponent extends Component {
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
      connectDragPreview
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    // 可以将任何节点作为可拖拽对象 this.props.connectDragSource(element)
    return connectDragPreview(
      connectDropTarget(
        <div style={{ ...style, opacity }}>
          {
            connectDragSource(<div style={{ ...handleStyle }}>&#10018;</div>)
          }
          {text}
        </div>
      )
    );
  }
}
