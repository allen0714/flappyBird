const EventUtil =  {
  addTouchHandler : (checkIfHitFunc) => {
    return function (hitCallbck) {
      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (checkIfHitFunc(e)) {
          hitCallbck(e);
        }
      });
    }
  }
};
// todo:优化成事件委托？
export default EventUtil;
