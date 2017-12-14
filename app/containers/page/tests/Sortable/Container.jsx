import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableCard from './DraggableCard';
import Card from './Card';
import ItemTypes from './ItemTypes';

const style = {
  width: 400
};

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
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.state = {
      cards: [
        {
          id: 1,
          text: 'Write a cool JS library',
        },
        {
          id: 2,
          text: 'Make it generic enough',
        },
        {
          id: 3,
          text: 'Write README',
        },
        {
          id: 4,
          text: 'Create some examples',
        },
        {
          id: 5,
          text: 'Spam in Twitter and IRC to promote it',
        },
        {
          id: 6,
          text: 'Sharon test sortable',
        },
        {
          id: 7,
          text: 'PROFIT',
        },
      ],
      leftCards: [{ // 不可拖拽组
        id: 11,
        text: '11 不可拖拽'
      }, {
        id: 12,
        text: '12 不可拖拽'
      }, {
        id: 13,
        text: '12 不可拖拽'
      }],
      rightCards: [{ // 不可拖拽组
        id: 22,
        text: 22
      }]
    };
  }

  /**
   * 两步操作: 先删除原始位置的,再将该对象插入新位置
   * @param id 被拖拽对象 id
   * @param atIndex 被拖拽对象最终要被放置的位置
   */
  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id);
    const { cards } = this.state;
    cards.splice(index, 1);
    cards.splice(atIndex, 0, card);
    this.setState(cards);
  }

  /**
   * 保存被拖拽对象及其 index
   * @param id
   * @returns {{card: T, index: number}}
   */
  findCard(id) {
    const { cards } = this.state;
    const card = cards.filter((c) => { return c.id === id; })[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { cards, leftCards } = this.state;
    return <div>
      <div style={style}>
        {
          leftCards.map((card) => {
            return <Card
              key={card.id}
              id={card.id}
              text={card.text} />;
          })
        }
      </div>
      {
        connectDropTarget(
          <div style={style}>
            {cards.map((card) => {
              return <DraggableCard
                key={card.id}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
                findCard={this.findCard}
              />;
            })}
          </div>,
        )
      }
    </div>;
  }
}
