
/**
 * 根据权限按钮代码返回新的 props
 * @export
 * @param {any} btnCode 权限按钮代码
 * @returns {} 返回对象，保留扩展性
 */
export default function handlePropsWithBtnCode(btnCode) {
  const _shouldHidden = (code) => {
    if (code !== undefined && window.btnCodeMap.get(code) === undefined) {
      return true;
    }
    return false;
  };
  const props = {};
  const argType = Object.prototype.toString.call(btnCode);
  if (argType === "[object Array]") {
    const temp = btnCode.map((item) => {
      return _shouldHidden(item);
    });
    props.hidden = !temp.includes(false); // 全为 true 时才能隐藏
  } else {
    props.hidden = _shouldHidden(btnCode);
  }
  return props;
}
