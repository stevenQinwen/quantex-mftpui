import { observable, action } from 'mobx';

const getModalParentContainer = () => {
  const curPageContainer = document.querySelectorAll('.page-container-visible');
  if (curPageContainer.length) {
    return curPageContainer[0];
  } else {
    return document.body;
  }
};

class Store {

  @observable props;

  constructor(props) {
    // 保存传入的 props
    this.initProps = props;
    // 组合 wrapClassName
    // 默认 props
    this.defaultProps = {
      visible: false,
      maskClosable: false,        // 默认点击蒙层不可关闭
      getContainer: () => {
        const container = document.createElement('modal'); // 使用自定义标签与页面上的 div 标签区分开，防止样式影响
        getModalParentContainer().appendChild(container); // 将创建的 modal 容器添加到当前页面中
        return container;
      },
      onCancel: this.close
    };
    // 初始化 Modal 的配置
    action(() => {
      this.props = Object.assign({}, this.defaultProps, props);
    })();
  }

  /**
   * 弹出 modal
   */
  open = action((title, content, opt) => {
    const option = [
      {},
      this.initProps,
      this.defaultProps,
      opt,
      { visible: true, title, content }
    ];
    this.props = Object.assign(...option);
  });

  /**
   * 关闭 modal
   */
  close = action(() => {
    this.props = Object.assign({}, {
      visible: false,
      content: null
    });
  });
}

export default Store;
