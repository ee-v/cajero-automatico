let timeOut = null;
class Message {
  constructor(element) {
    this.element = element;
    this.duration = 5;
    this.autoClose = true;
  }
  resetMessage() {
    const element = this.element;
    clearTimeout(timeOut);
    element.style.display = 'none';
    this.cleanMessage(element);
  };
  cleanMessage(element) {
    element.innerHTML = '';
    const styles = [...element.classList].filter(style => style != 'message');
    styles.forEach(style => element.classList.remove(style));
  }
  closeMessage(element) {
    timeOut = window.setTimeout(() => {
      element.style.display = 'none';
      this.cleanMessage(element);
    }, this.duration * 1000);
  }
  showMessage(text, type) {
    this.element.innerHTML = text;
    this.element.classList.add(`message--${type}`);
    this.element.style.display = 'block';
    if (this.autoClose) this.closeMessage(this.element);
  }
}
//cuando ya hay un mensaje mostrado y se quiere mostrar otro inmediatamente
//cuando ya hay un mensaje mostrando y se cambia de vista