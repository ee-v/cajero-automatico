window.addEventListener('DOMContentLoaded', () => {
  let cuentas = [
    { nombre: 'Mali', saldo: 200, pass: '12345' },
    { nombre: 'Gera', saldo: 200, pass: '123cuenta' },
    { nombre: 'Maui', saldo: 67, pass: 'password' }
  ];
  let cuentaActual = '';
  const msg = new Message(document.getElementById('message'));
  //----------------- Views
  let showingView = 'loginView';
  const loginView = document.getElementById('loginView');
  const mainView = document.getElementById('mainView');
  const consultarView = document.getElementById('consultarView');
  const ingresarMontoView = document.getElementById('ingresarMontoView');
  const retirarMontoView = document.getElementById('retirarMontoView');
  //------------------- Buttons
  const btnLeftTop = document.getElementById('btnLeftTop');
  const btnLeftMiddle = document.getElementById('btnLeftMiddle');
  const btnLeftBottom = document.getElementById('btnLeftBottom');
  const btnRightBottom = document.getElementById('btnRightBottom');

  const hideView = (view) => {
    view.classList.add('hiddenView');
  };

  const showView = (view) => {
    view.classList.remove('hiddenView');
  };

  const changeView = (actualView, nextView) => {
    hideView(actualView);
    showView(nextView);
    showingView = nextView.id;
    manageActions();
  };

  const removeActions = (button, actions) => {
    actions.forEach(action => {
      button.removeEventListener('click', action, false);
    });
  };
  const setAction = (button, action) => {
    button.addEventListener('click', action);
  };

  const manageActions = () => {
    switch (showingView) {
      case 'loginView': {
        removeActions(btnLeftTop, [toConsultarSaldo]);
        removeActions(btnLeftMiddle, [toIngresarMonto]);
        removeActions(btnLeftBottom, [toRetirarMonto]);
        setAction(btnRightBottom, login);
        break;
      }
      case 'mainView': {
        removeActions(btnLeftBottom, [
          saveSaldo,
          withdrawSaldo
        ]);
        removeActions(btnRightBottom, [
          login,
          consultarToMain,
          ingresarMontoToMain,
          retirarMontoToMain
        ]);
        setAction(btnLeftTop, toConsultarSaldo);
        setAction(btnLeftMiddle, toIngresarMonto);
        setAction(btnLeftBottom, toRetirarMonto);
        setAction(btnRightBottom, logout);
        break;
      }
      case 'consultarView': {
        removeActions(btnLeftTop, [toConsultarSaldo]);
        removeActions(btnLeftMiddle, [toIngresarMonto]);
        removeActions(btnLeftBottom, [
          toRetirarMonto,
          saveSaldo,
          withdrawSaldo
        ]);
        removeActions(btnRightBottom, [logout]);
        setAction(btnRightBottom, consultarToMain);
        break;
      }
      case 'ingresarMontoView': {
        removeActions(btnLeftTop, [toConsultarSaldo]);
        removeActions(btnLeftMiddle, [toIngresarMonto]);
        removeActions(btnLeftBottom, [
          toRetirarMonto,
          withdrawSaldo
        ]);
        removeActions(btnRightBottom, [logout]);
        setAction(btnLeftBottom, saveSaldo);
        setAction(btnRightBottom, ingresarMontoToMain);
        break;
      }
      case 'retirarMontoView': {
        removeActions(btnLeftTop, [toConsultarSaldo]);
        removeActions(btnLeftMiddle, [toIngresarMonto]);
        removeActions(btnLeftBottom, [
          toRetirarMonto,
          saveSaldo
        ]);
        removeActions(btnRightBottom, [logout]);
        setAction(btnLeftBottom, withdrawSaldo);
        setAction(btnRightBottom, retirarMontoToMain);
        break;
      }
    }
  };

  const getCuenta = (cuenta) => {
    return cuentas.filter(c => c.nombre == (cuentaActual ? cuentaActual : cuenta))[0];
  };

  const showSaldo = () => {
    const textSaldo = document.getElementById('textSaldo');
    const saldo = getCuenta().saldo;
    textSaldo.innerText = '$ ' + saldo;
  };

  const saveSaldo = () => {
    const input = document.getElementById('montoIngresar');
    const cuenta = getCuenta();

    const montoIngresar = input.value;
    const saldo = cuenta.saldo;
    const newSaldo = parseInt(saldo) + parseInt(montoIngresar);
    if (montoIngresar == 0 || montoIngresar == '') {
      msg.showMessage('Ingrese el monto que desee guardar.', 'warning');
    } else if (newSaldo > 990) {
      msg.showMessage('El monto a ingresar no debe resultar en un saldo mayor a $990', 'warning');
    } else {
      cuenta.saldo = newSaldo;
      msg.showMessage(`Monto ingresado $${montoIngresar}, Saldo actual: $${newSaldo}`, 'success');
      input.value = '';
    }
  };

  const withdrawSaldo = () => {
    const input = document.getElementById('montoRetirar');
    const cuenta = getCuenta();

    const montoRetirar = input.value;
    const saldo = cuenta.saldo;
    const newSaldo = parseInt(saldo) - parseInt(montoRetirar);
    if (montoRetirar == 0 || montoRetirar == '') {
      msg.showMessage('Ingrese el monto que desee retirar.', 'warning');
    } else if (newSaldo < 10) {
      msg.showMessage('El monto a retirar no debe resultar en un saldo menor a $10', 'warning');
    } else {
      cuenta.saldo = newSaldo;
      msg.showMessage(`Monto retirado fue $${montoRetirar}, Saldo actual: $${newSaldo}`, 'success');
      input.value = '';
    }
  };

  const mostrarCuentas = (accounts, options) => {
    accounts.forEach(account => {
      let option = document.createElement('option');
      option.value = account.nombre;
      option.text = account.nombre;
      options.appendChild(option);
    });
  };

  const login = () => {
    const accout = document.getElementById('account');
    const password = document.getElementById('password');
    if (accout.value == 0) {
      msg.showMessage('Selecciona una cuenta.', 'info');
    } else if (password.value == '') {
      msg.showMessage('Ingresa la contraseña.', 'warning');
    } else {
      const passCuenta = getCuenta(accout.value).pass;
      if (password.value == passCuenta) {
        cuentaActual = accout.value;
        accout.value = 0;
        password.value = '';
        changeView(loginView, mainView);
      }
      else {
        msg.showMessage('Error! Contraseña Incorrecta.', 'error');
      }
    }
  };

  const logout = () => {
    cuentaActual = '';
    changeView(mainView, loginView);
  };
  // To View Action
  const toConsultarSaldo = () => {
    showSaldo();
    changeView(mainView, consultarView);
  };
  const toIngresarMonto = () => {
    changeView(mainView, ingresarMontoView);
  };
  const toRetirarMonto = () => {
    changeView(mainView, retirarMontoView);
  };
  // Return View Actions
  const consultarToMain = () => {
    changeView(consultarView, mainView);
  }
  const ingresarMontoToMain = () => {
    msg.resetMessage();
    changeView(ingresarMontoView, mainView);
  }
  const retirarMontoToMain = () => {
    msg.resetMessage();
    changeView(retirarMontoView, mainView);
  }

  // Para pruebas
  // const testView = (view) => {
  //   const views = [...document.getElementById('screenATM').children];
  //   const viewsToHide = views.filter(v => v != view);
  //   viewsToHide.forEach(v => hideView(v));
  //   showingView = view.id;
  //   showView(view);
  // }

  const init = () => {
    const options = document.getElementById('account');
    mostrarCuentas(cuentas, options);
    manageActions();
  };

  init();
});