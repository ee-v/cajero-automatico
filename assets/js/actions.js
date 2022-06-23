export default class Actions {
  constructor(buttons, actions) {
    this.buttons = buttons;
    this.actions = actions;
  }
  setActions(buttonsAction) {
    this.resetActions();
    buttonsAction.forEach(elem => {
      let button = this.buttons.find(button => button.id === Object.keys(elem)[0]);
      let action = this.actions.find(action => action.name === Object.values(elem)[0]);
      setAction(button, action);
    });
  }
  resetActions() {
    this.buttons.forEach(button => {
      this.actions.forEach(action => removeAction(button, action));
    });
  }
};
const removeAction = (button, action) => {
  button.removeEventListener('click', action, false);
};

const setAction = (button, action) => {
  button.addEventListener('click', action);
};