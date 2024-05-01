import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { Redirect } from "react-router-dom";
import Button from '@mui/material/Button';

class Login extends React.Component {
  constructor() {
    super();
    this.userInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.state = { condition: false };
  }

  validar = (usuario, password) => {
    //fetch('http://localhost:8080/Proyecto/Login?User='+usuario+'&password='+password+'')
    fetch('Login?User=' + usuario + '&password=' + password + '')
      .then(response => response.text())
      .then(usuario => {
        let ret = usuario.includes("yes");

        if (ret) {
          this.setState({ condition: true });
          toast.success("USUARIO VALIDO");
        } else {
          toast.error("USUARIO NO VALIDO");
          this.userInputRef.current.value = "";
          this.passwordInputRef.current.value = "";
        }
      })
  };

  render() {
    const styles = {
      padding: '5px'
    };

    const { condition } = this.state;

    if (condition) {
      return <Redirect to='/Proyecto/home' />;
    }

    return (
      <div className="center-container" style={styles} id="equis">
        <div className='AlignCenter'> LOGIN</div>
        <div className="AlignCenterName">Hidalgo Pedraza Alejandro,
          Contreras Martines Fátima Belén,
          Baeza Núñez Nayely</div>
        <div className="container">
          <div className="form-container">
            <div className="tam-elementos">
              <div className="form-group">
                <label className="form-label" htmlFor="User">Usuario</label>
                <input
                  placeholder="Ingrese el usuario"
                  type="text"
                  id="User"
                  className="form-control"
                  ref={this.userInputRef}
                />
              </div>
            </div>
            <div className="tam-elementos">
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  placeholder="Ingrese su contraseña"
                  type="password"
                  id="password"
                  className="form-control"
                  ref={this.passwordInputRef}
                />
              </div>
            </div>
            <Button variant="contained" color="primary" onClick={() => this.validar(document.getElementById("User").value, document.getElementById("password").value)}>
              Submit
            </Button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Login;