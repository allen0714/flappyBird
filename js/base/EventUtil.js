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
      return handler;
    };
  }
};
// todo:优化成事件委托？
export default EventUtil;
