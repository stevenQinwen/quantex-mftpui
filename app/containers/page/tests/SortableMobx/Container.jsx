import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { action } from "mobx";
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import Store from './Store';
import ItemTypes from './ItemTypes';

// const style = {
//   width: 400
// };

const cardTarget = {
  drop() { }
};

const dropTargetConnet = (connect) => {
  return {
    connectDropTarget: connect.dropTarget() // 返回一个方法作为属性传给组件
  };
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, dropTargetConnet)
@observer
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  store = new Store();

  /**
   * 两步操作: 先删除原始位置的,再将该对象插入新位置
   * @param id 被拖拽对象 id
   * @param atIndex 被拖拽对象最终要被放置的位置
   */
  moveCard = action((id, atIndex) => {
    const { card, index } = this.findCard(id);
    logger.log("moveCard=====:", id, atIndex);
    const { cards } = this.store;
    cards.splice(index, 1);
    cards.splice(atIndex, 0, card);
  });

  /**
   * 保存被拖拽对象及其 index
   * @param id
   * @returns {{card: T, index: number}}
   */
  findCard = (id) => {
    const { cards } = this.store;
    const card = cards.filter((c) => { return c.id === id; })[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards } = this.store;
    // TODO: Q2: 此处用了 connectDropTarget 方法, 传入 element dom 做参数
    return connectDropTarget(
      <div>
        {cards.map((card) => {
          return <Card
          key={card.id}
          id={card.id}
          text={card.text}
          moveCard={this.moveCard}
          findCard={this.findCard}
        />;
        })}
      </div>,
    );
  }
}
