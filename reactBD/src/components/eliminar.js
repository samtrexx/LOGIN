import React from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

class Info extends React.Component {

    state = {
        id: "",
        pregunta: "",
        respuesta: "",
        drags: [],
        targets: []
    }
    eliminar = (id) => {
        fetch('Eliminar?id='+id+'')
            .then(response => response.text())
            .then(usuario => {
                let ret = usuario.includes("yes");
                console.log(ret);

                if (ret) {
                    Swal.fire(
                        'Eliminado',
                        'Removed',
                        'Success'
                    )
                }
                else {
                    Swal.fire(
                        'No se pudo eliminar',
                        'Error',
                        'Fallo'
                    )
                }

            })
    }
    componentDidMount() {
        const qId = new URLSearchParams(window.location.search).get("id");
        if (qId) {
            axios.get("Pregunta?id="+qId).then(response => {
                const question = response.data[0];
                this.setState({...question });
            }).catch(error => {
                console.info(error);
                alert("Ha ocurrido un error");
            });
        }
    }

    render() {
        const { id, pregunta, respuesta, drags, targets } = this.state;
        return (
            <Container className="MarginContainer">
                <div className="card-header text-center">
                    <h3 className="AlignCenter">Eliminar Pregunta</h3>
                </div>
                <div className="card-body">
                    <p className="text-start"><b>Pregunta:</b> {pregunta}</p>
                    <p className="text-start"><b>Respuesta:</b> {respuesta}</p>
                    <p className="text-start"><b>Drag Options</b></p>
                    <div className="row">
                        {
                            drags.map(option => {
                                return (
                                    <div className="col">
                                        <img src={option.imagen} className="ImageContainer" />
                                        <p className="text-start">{option.valor}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <p className="text-start"><b>Target Options</b></p>
                    <div className="row">
                        {
                            targets.map(target => {
                                return (
                                    <div className="col">
                                        <img src={target.imagen} className="ImageContainer" />
                                        <p className="text-start">{target.valor}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="d-grid m-3">
                        <Button variant="danger" onClick={() => this.eliminar(id)}>
                            Eliminar
                        </Button>
                    </div>
                    <div className="d-grid m-3">
                        <Button
                            variant="success"
                            className="M-6">
                            <Link to={`/Proyecto/home`} className="link-light" >
                                HOME
                            </Link>
                        </Button>
                    </div>

                </div>
            </Container>
        )
    }
}

export default Info;