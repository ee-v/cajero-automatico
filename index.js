import Message from './assets/js/message.js';
import Actions from './assets/js/actions.js';

window.addEventListener('DOMContentLoaded', () => {

  let cuentas = [
    { nombre: 'Mali', saldo: 200, pass: '12345' },
    { nombre: 'Gera', saldo: 200, pass: '123cuenta' },
    { nombre: 'Maui', saldo: 67, pass: 'password' }
  ];
  let cuentaActual = '';
  let myMsg = null;
  let myActions = null;
  //----------------- Views
  let showingView = 'loginView';
  const loginView = document.getElementById('loginView');
  const mainView = document.getElementById('mainView');
  const consultarView = document.getElementById('consultarView');
  const ingresarMontoView = document.getElementById('ingresarMontoView');
  const retirarMontoView = document.getElementById('retirarMontoView');

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
    actionsManagement();
  };

  const actionsManagement = () => {
    switch (showingView) {
      case 'loginView': {
        myActions.setActions([
          { 'btnRightBottom': 'login' }
        ]);
        break;
      }
      case 'mainView': {
        myActions.setActions([
          { 'btnLeftTop': 'toConsultarSaldo' },
          { 'btnLeftMiddle': 'toIngresarMonto' },
          { 'btnLeftBottom': 'toRetirarMonto' },
          { 'btnRightBottom': 'logout' },
        ]);
        break;
      }
      case 'consultarView': {
        myActions.setActions([
          { 'btnRightBottom': 'consultarToMain' }
        ]);
        break;
      }
      case 'ingresarMontoView': {
        myActions.setActions([
          { 'btnLeftBottom': 'saveSaldo' },
          { 'btnRightBottom': 'ingresarMontoToMain' }
        ]);
        break;
      }
      case 'retirarMontoView': {
        myActions.setActions([
          { 'btnLeftBottom': 'withdrawSaldo' },
          { 'btnRightBottom': 'retirarMontoToMain' }
        ]);
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
    myMsg.resetMessage();
    const input = document.getElementById('montoIngresar');
    const cuenta = getCuenta();

    const montoIngresar = input.value;
    const saldo = cuenta.saldo;
    const newSaldo = parseInt(saldo) + parseInt(montoIngresar);
    if (montoIngresar == 0 || montoIngresar == '') {
      myMsg.showMessage('Ingrese el monto que desee guardar.', 'warning');
    } else if (newSaldo > 990) {
      myMsg.showMessage('El monto a ingresar no debe resultar en un saldo mayor a $990', 'warning');
    } else {
      cuenta.saldo = newSaldo;
      myMsg.showMessage(`Monto ingresado $${montoIngresar}, Saldo actual: $${newSaldo}`, 'success');
      input.value = '';
    }
  };

  const withdrawSaldo = () => {
    myMsg.resetMessage();
    const input = document.getElementById('montoRetirar');
    const cuenta = getCuenta();

    const montoRetirar = input.value;
    const saldo = cuenta.saldo;
    const newSaldo = parseInt(saldo) - parseInt(montoRetirar);
    if (montoRetirar == 0 || montoRetirar == '') {
      myMsg.showMessage('Ingrese el monto que desee retirar.', 'warning');
    } else if (newSaldo < 10) {
      myMsg.showMessage('El monto a retirar no debe resultar en un saldo menor a $10', 'warning');
    } else {
      cuenta.saldo = newSaldo;
      myMsg.showMessage(`Monto retirado fue $${montoRetirar}, Saldo actual: $${newSaldo}`, 'success');
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
    myMsg.resetMessage();
    const accout = document.getElementById('account');
    const password = document.getElementById('password');
    if (accout.value == 0) {
      myMsg.showMessage('Selecciona una cuenta.', 'info');
    } else if (password.value == '') {
      myMsg.showMessage('Ingresa la contraseña.', 'warning');
    } else {
      const passCuenta = getCuenta(accout.value).pass;
      if (password.value == passCuenta) {
        cuentaActual = accout.value;
        accout.value = 0;
        password.value = '';
        changeView(loginView, mainView);
      }
      else {
        myMsg.showMessage('Error! Contraseña Incorrecta.', 'error');
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
    myMsg.resetMessage();
    changeView(ingresarMontoView, mainView);
  }
  const retirarMontoToMain = () => {
    myMsg.resetMessage();
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
    myMsg = new Message(document.getElementById('message'));

    const options = document.getElementById('account');
    mostrarCuentas(cuentas, options);
    //------------------- Buttons
    const btnLeftTop = document.getElementById('btnLeftTop');
    const btnLeftMiddle = document.getElementById('btnLeftMiddle');
    const btnLeftBottom = document.getElementById('btnLeftBottom');
    const btnRightBottom = document.getElementById('btnRightBottom');

    myActions = new Actions([
      btnLeftTop,
      btnLeftMiddle,
      btnLeftBottom,
      btnRightBottom
    ], [
      login,
      logout,
      toConsultarSaldo,
      toIngresarMonto,
      toRetirarMonto,
      consultarToMain,
      ingresarMontoToMain,
      retirarMontoToMain,
      saveSaldo,
      withdrawSaldo
    ]);

    actionsManagement();
  };

  init();
});