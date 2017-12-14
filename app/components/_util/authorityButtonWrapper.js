import handlePropsWithBtnCode from './handlePropsWithBtnCode';

/**
 * 封装权限控制的高阶组件
 * @export
 * @param {any} wrappedComponent 被包装组件
 * @returns {Class} 包含权限控制的高阶组件
 */
export default function authorityButtonWrapper(wrappedComponent) {
  return class Enhancer extends wrappedComponent {
    render() {
      let props = handlePropsWithBtnCode(this.props.btnCode);
      if (props.hidden) {
        return null;
      }
      return super.render();
    }
  };
}
