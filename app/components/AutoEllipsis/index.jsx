import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
// import { Tooltip } from 'antd';

const styles = require('./index.scss');

class AutoEllipsisComponent extends React.Component {

  componentDidMount() {
    this.rootNode = ReactDOM.findDOMNode(this);
    this.checkEllipsis();
  }

  getDomStyle = (dom) => {
    return document.defaultView.getComputedStyle(dom, null);
  };

  getTitle = () => {
    return this.rootNode && this.rootNode.textContent;
  }

  triggerTitle = (flag) => {
    if (flag) {
      this.rootNode.title = this.getTitle();
    } else {
      this.rootNode.title = "";
    }
  };

  /**
   * 判断是否需要省略。
   * 判断方法:
   *  1，同级有多个元素时：
   *    判断父元素的高度是否是大于等于行高的两倍
   *    如果是，改变this的宽度，并且省略。
   *    否则不省略。
   *  2，同级只有一个元素时：
   *    如果scrollWidth>offsetWidth，则展示省略。
   */
  checkEllipsis = (props = this.props) => {
    const { showTitle } = props;
    // 如果不需要通过自动计算添加title，不进行后续计算
    if (showTitle !== 'auto') {
      this.triggerTitle(showTitle === 'display');
      return;
    }
    const { scrollWidth, offsetWidth } = this.rootNode.firstChild;
    let { parentNode } = this.rootNode; //  父元素
    let { children } = parentNode;  //  所有子元素
    if (children.length > 1) {
      // 同级有多个元素
      let { lineHeight } = this.getDomStyle(parentNode);
      const { offsetHeight } = parentNode;
      lineHeight = parseFloat(lineHeight);
      if (offsetHeight >= lineHeight * 2 || scrollWidth > offsetWidth) {
        // 如果高度大于等于两倍行高，说明换行，需要改变this的宽度并且省略。
        const width = this.getWidth();
        this.rootNode.style.width = width;
        this.triggerTitle(true);
      } else {
        this.triggerTitle(false);
      }
    } else {
      // 同级只有一个元素
      if (scrollWidth > offsetWidth) {
        // 说明有省略部分
        this.triggerTitle(true);
      } else {
        this.triggerTitle(false);
      }
    }
  };

  /**
   * 获取省略部分的宽度
   * 如果同级不止一个元素，则获取其他统计元素的所有宽度，this宽度=父级宽度-其他元素宽度
   */
  getWidth = () => {
    let { parentNode } = this.rootNode; //  父元素
    let { children } = parentNode;  //  所有子元素
    // 计算剩余宽度
    let extraWidth = _.reduce(children, (extra, node) => {
      if (this.rootNode.isSameNode(node)) {
        // 自身的宽度不需要减
        return extra;
      } else {
        return extra - this.getOuterWidth(node);
      }
    }, this.getInnerWidth(parentNode));
    return extraWidth + "px";
  }

  /**
   * 获取内容可用宽度
   */
  getInnerWidth = (node) => {
    let { paddingLeft, paddingRight, borderLeftWidth, borderRightWidth } = this.getDomStyle(node);
    paddingLeft = parseFloat(paddingLeft);
    paddingRight = parseFloat(paddingRight);
    borderLeftWidth = parseFloat(borderLeftWidth);
    borderRightWidth = parseFloat(borderRightWidth);
    return node.offsetWidth - paddingLeft - paddingRight - borderLeftWidth - borderRightWidth;
  }

  /**
   * 获取元素占用总宽度
   */
  getOuterWidth = (node) => {
    let { marginLeft, marginRight } = this.getDomStyle(node);
    marginLeft = parseFloat(marginLeft);
    marginRight = parseFloat(marginRight);
    return node.offsetWidth + marginLeft + marginRight;
  }

  componentDidUpdate() {
    // 当元素宽度没变时，不重新渲染
    this.checkEllipsis();
  }

  render() {
    let { width, style = {} } = this.props;
    if (!isNaN(width)) {
      style = Object.assign({
        width: `${width}px`
      }, style);
    }
    const children = [];
    React.Children.forEach(this.props.children, (child) => {
      if (typeof child === 'object' && typeof child.type === 'function') {
        if (child.props.transUrl) { // 通过 transUrl 属性确定是否为 Translate 组件
          child = React.cloneElement(child, { onUpdated: () => { this.checkEllipsis(); } });
        }
      }
      children.push(child);
    });
    return (
      <div className={styles.root} style={style} >
        <div>
          {children}
        </div>
      </div>
    );
  }
}

AutoEllipsisComponent.propTypes = {
  width: React.PropTypes.number,
  showTitle: React.PropTypes.string,
};
AutoEllipsisComponent.defaultProps = {
  // auto: 默认，当出现省略时，显示 title，否则不用显示 title
  // hidden: 不显示 title，即使出现省略
  // display: 不管有没出现省略，都显示 title
  showTitle: 'auto', // auto|hidden|display
};

export default AutoEllipsisComponent;
