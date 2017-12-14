import _ from 'lodash';
/**
 * 统一键盘事件管理, 捕获所有的键盘事件, 当事件触发时, 发送给所有订阅这个事件的模块
 * 采用 订阅/发布(观察者) 这种设计模块式开发
 */
class EventCenter {
  topicSubsMap = new Map();
  uuid = 0;

  constructor() {
    document.onkeydown = (event) => {
      // 支持组合键位
      let combKey = '';
      if (event.ctrlKey) {
        combKey += 'ctrl+';
      }
      if (event.altKey) {
        combKey += 'alt+';
      }
      if (event.shiftKey) {
        combKey += 'shift+';
      }
      this.publish(`${combKey}${event.key}`, event);
    };
  }

  _getUUID() {
    return ++this.uuid;
  }
  // 某些事件响应，只想作用于当前页面可见的情况下
  // 生成并返回唯一的selector ID,并将ID设置到某个dom属性上
  // 那么当事件响应事，只有当前dom可见才允许响应
  getEventSelector() { // ADD
    return _.uniqueId('js-event-');
  }

  publish(topic, resultObj) {
    if (!this.topicSubsMap.has(topic)) {
      return false;
    }
    let subscribers = this.topicSubsMap.get(topic);
    subscribers.forEach((sub) => {
      // 判断是否有predicate属性
      // 如果predicate是字符串，那么是selector，判断该selector是否隐藏，隐藏则不处理
      // 如果predicate是函数，执行看返回值是否为false，flase则不处理
      if (sub.predicate) { // ADD
        if (typeof sub.predicate === 'string') {
          let dom = document.querySelector(sub.predicate);
          if (!dom || dom.offsetParent === null) {
            return;
          }
        } else if (!sub.predicate(topic, resultObj)) {
          return;
        }
      }
      sub.func(topic, resultObj);
    });
    return true;
  }
  /**
   * 订阅事件
   * @param topic string | array
   * @param func function(topic, event)
   * @param predicate string[选择器]| function(topic, event)
   * @returns {*|number}
   */
  subscribe(topic, func, predicate) {
    let uuid = this._getUUID();
    if (Array.isArray(topic)) { // ADD modify
      topic.forEach((item) => {
        this._subscribe(item, func, uuid, predicate);
      });
    } else {
      this._subscribe(topic, func, uuid, predicate);
    }
    return uuid;
  }
  // ADD
  _subscribe(topic, func, uuid, predicate) {
    if (!this.topicSubsMap.has(topic)) {
      this.topicSubsMap.set(topic, []);
    }
    this.topicSubsMap.get(topic).push({
      token: uuid,
      func: func,
      predicate: predicate
    });
  }

  unsubscribe(token) {
    for (let subs of this.topicSubsMap.values()) {
      for (let i = 0; i < subs.length; i++) {
        if (subs[i].token == token) {
          subs.splice(i--, 1);
        }
      }
    }
    return false;
  }
}
export default new EventCenter();
