let listenerQueue = [];

const EventUtil =  {
  addTouchHandler : (checkIfHitFunc) => {
    return function (hitCallback) {
      const handler = (e) => {
        e.preventDefault();
        if (checkIfHitFunc(e)) {
          hitCallback(e);
        }
      };
      canvas.addEventListener('touchstart', handler);
      listenerQueue.push({ type: 'touchstart', handler });
    };
  },

  removeAllHandlers : () => {
    listenerQueue.forEach(({type, handler}) => {
      canvas.removeEventListener(type, handler);
    });
    listenerQueue = [];
  }
};
// todo:优化成事件委托？
export default EventUtil;
