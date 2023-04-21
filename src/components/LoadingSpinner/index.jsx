import React from 'react';
import { Spinner, Container } from 'react-bootstrap';
import logo from '../../assets/logo.png';

function LoadingSpinner() {
  return (
    <Container><img src={logo} alt="emmalou" className="img-fluid" /><Spinner animation="border" role="status">
      <span className="visually-hidden">Cargando...</span>
    </Spinner>
    </Container>
  )
}

export default LoadingSpinner