import React from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pregunta from "./pregunta";
import axios from "axios";
import ErrorBoundary from './error';

class Home extends React.Component {

    /*Definimos el estado inicial del componente */
    state = {
        data: [],
        showAlert: false,
        alertText: ""
    }
    /*se utiliza para realizar una solicitud GET a la URL "Preguntas" utilizando Axios.  */
    componentDidMount() {
        axios.get("Preguntas").then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.info(error);
            this.setState({ showAlert: true, alertText: "ERROR EN LA OBTENCION DE DATOS" });
        })
    }

    render() {
        const { data, showAlert, alertText } = this.state;
        return (
            /*control de errores */
            <ErrorBoundary>
                <Container className="MarginContainer" >
                    <div className="AlignCenter2">
                        <div className="AlignCenter2_2" > CREAR, ALTAS, BAJAS Y CAMBIOS. </div>
                    </div>
                    <hr style={{ width: "80%" }} />
                    {
                        showAlert ?
                            <Alert variant="danger">
                                {alertText}
                            </Alert>
                            : null
                    }
                    <Button variant="info" style={{ margin: "12px" }}>
                        <Link to="/Proyecto/agregar" className="CustomLink">NUEVA PREGUNTA</Link>
                    </Button>

                    <Button variant="info" style={{ margin: "12px" }} href="https://animal-detection-48c0e.web.app" className="link-light link-offset-2 link-underline link-underline-opacity-0"> Prueba
                </Button>

                    <Table striped bordered >
                        <thead>
                            <tr>
                                <th>Pregunta</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(pregunta => {
                                    return <Pregunta {...pregunta} />
                                })
                            }
                        </tbody>
                    </Table>

                </Container>
            </ErrorBoundary>
        )
    }
}

export default Home;