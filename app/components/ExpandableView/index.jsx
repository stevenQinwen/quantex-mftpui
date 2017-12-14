import React from 'react';
import { findDOMNode } from 'react-dom';
import { Icon } from 'antd';
import { msgCenter } from 'utils';
import styles from './index.scss';

// 可收缩视图
class ExpandableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  componentDidMount() {
    // 获取传入组件的高度, 便于添加过度效果(上/下推的效果)
    this.firstChildHeight = findDOMNode(this).firstChild.getBoundingClientRect().height;
  }

  toggleAction = () => {
    const { collapse } = this.state;
    this.setState({
      collapse: !collapse
    }, () => {
      // when animate finish recalc fixedtable
      setTimeout(() => {
        msgCenter.publish('fixed-table-resize');
      }, 1000);
    });
  };

  render() {
    const { children, collapseTitle, staticHeight } = this.props;
    const { collapse } = this.state;
    // 传入组件的高度
    const firstChildStyle = {
      height: !collapse ? (staticHeight ? this.firstChildHeight : "auto") : 0 //  如果内容是固定高度，则有过渡效果，内容是动态的则没有  TODO  ->  动态高度也需要过渡效果
    };
    return (
      <div className={styles['expandable-view']}>
        <div className={collapse ? styles.hidden : styles.show} style={firstChildStyle}>
          {
            children
          }
        </div>
        {
          collapse ? <div className="text-center">{collapseTitle}</div> : null
        }
        <div className={styles.action} onClick={this.toggleAction}>
          {
            collapse ? <Icon type="caret-down" /> : <Icon type="caret-up" />
          }
        </div>
      </div>
    );
  }
}

ExpandableView.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]), // 展示内容
  collapseTitle: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]), // 折叠后显示内容
  staticHeight: React.PropTypes.boolean //  内容是不是固定高度
};

ExpandableView.defaultProps = {
  collapseTitle: '折叠后显示标题',
  staticHeight: true
};

export default ExpandableView;
