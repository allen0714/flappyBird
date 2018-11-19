import EventUtil from './EventUtil';
const getEventListener = (prototype) => {
  const attrs = Object.getOwnPropertyNames(prototype);
  const eventListeners = [];
  attrs.forEach((attr) => {
    if (typeof prototype[attr] === 'function' && attr.substr(0, 7) === 'onTouch') {
      eventListeners.push(prototype[attr]);
    }
  });
  return eventListeners;
}

const hasBeenInitializedMap = {};
export default class Route {
  constructor() {
    const name = Object.getPrototypeOf(this).constructor.name;
    if (hasBeenInitializedMap[name]) {
      return this;
    }
    else {
      EventUtil.removeAllHandlers();
      hasBeenInitializedMap[name] = name;
      const listeners = getEventListener(Object.getPrototypeOf(this));
      listeners.forEach((listener) => {
        setTimeout(listener, 0);
      });
    }
  }
}
