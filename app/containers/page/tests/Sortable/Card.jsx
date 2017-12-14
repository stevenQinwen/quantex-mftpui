import React, { Component } from 'react';

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

export default class Card extends Component {

  render() {
    const {
      text,
    } = this.props;
    // 可以将任何节点作为可拖拽对象 this.props.connectDragSource(element)
    return (<div style={{ ...style }}>
      <div style={{ ...handleStyle }}>&#10003;</div>
      {text}
    </div>);
  }
}
