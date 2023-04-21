import React, { useState } from 'react'
import { createBuyOrder } from '../../services/firebase/firebaseConfig';
import { Badge, Container } from 'react-bootstrap';
import useCartContext from '../../context/CartContext';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';


function CheckOut() {
  document.title = `Emmalou Vivoero - Pago y envío`;
  const { cart, clearCart, itemsTotal, precioTotal } = useCartContext();
  const [OrderID, setOrderID] = useState();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrormsg] = useState(false);

  const handleNombre = (e) => {
    setNombre(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };

  function handleBuy() {
    const itemsToBuy = cart.map((item) => ({
      id: item.id,
      cant: item.cant,
      name: item.name,
      pricex1: item.price,
      total: item.price * item.cant,
    }
    ))

    const buyOrder = {
      buyer: {
        name: `${nombre}`,
        phone: `${phone}`,
        email: `${email}`,
      },
      items: itemsToBuy,
      total: precioTotal(),
    }
    createBuyOrder(buyOrder).then(response => {

      Swal.fire({
        icon: 'success',
        title: `Compra realizada con éxito id ${response}`,
        text: 'Gracias por su compra',
      })


    })
    setTimeout(() => {
      clearCart();
      setOrderID(true);
    }, 3000);

  }

  function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }
  function containsArroba(str) {
    const tieneArroba = /@/;
    return tieneArroba.test(str);
  }

  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onlyLettersAndSpaces(nombre) || nombre === '' || !containsArroba(email) || email === '' || !onlyNumbers(phone) || phone === '') {
      setErrormsg(true);

    } else {
      setSubmitted(true);
      setErrormsg(false);
      handleBuy();
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h4 className="bg-success text-white scale-in-ver-center">Pago exitoso</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: errorMsg ? '' : 'none',
        }}>
        <h4 className="bg-danger text-white scale-in-ver-center">Por favor complete todos los campos correctamente</h4>

      </div>
    );
  };

  if (cart.length === 0) {
    return <section id="Carrito" className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-12">
          <p>No hay items en su carrito</p>
          <img src={logo} alt="logo" className="img-fluid" />
          <p></p>
          <Link to="/">regresar al menú</Link>
        </div>
      </div>
    </section>
  } else if (OrderID) {
    return (
      <section id="carrito" className="py-2 text-center container slide-in-fwd-center">
        <div className="row py-lg-2">
          <div><Badge bg="info" className="m-1"><h6>Su ID de compra ${OrderID} Total de items: {itemsTotal()}</h6></Badge><Badge className="m-3" bg="info"><h6> Costo Total: {precioTotal()} $</h6></Badge><div></div><div><Link to="/">regresar al catálogo</Link></div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <div className="container">
      <main>
        <div className="py-3 text-center">
          <h2>Checkout</h2>
          <p className="lead">Su lista de compra y formulario de pago.</p>
        </div>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Su carrito</span>
              <span className="badge bg-primary rounded-pill">{itemsTotal()}</span>
            </h4>
            <ul className="list-group mb-3">
              {cart.map(item => (
                <Container key={item.id} className="list-group-item justify-content-between lh-sm"><li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item.category} {item.name} x{item.cant}</h6>
                    <small className="text-muted">Descripcion {item.descripcion}</small>
                  </div>
                  <span className="text-muted">{item.price}$</span>
                </li>
                </Container>
              ))}
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Total: {precioTotal()}$</h6>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Datos del cliente</h4>
            <div className="messages">
              {errorMessage()}
              {successMessage()}
            </div>

            <form className="needs-validation">
              <div className="row g-3">
                <div className="col-sm-12">
                  <label htmlFor="firstName" className="form-label">Nombres y apellidos</label>
                  <input onChange={handleNombre} value={nombre} type="text" className="form-control input" id="name" placeholder="Ej: Camila Llanos" required />
                  <div className="invalid-feedback">
                    Nombre requerido
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Correo<span className="text-muted"></span></label>
                  <input onChange={handleEmail} value={email} type="email" className="form-control input" id="email" placeholder="Ej: camillanos125@gmail.com" required />
                  <div className="invalid-feedback">
                    Por favor introduzca un email válido.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input onChange={handlePhone} value={phone} type="phone" className="form-control input" id="phone" placeholder="Ej: 3804772923" required />
                  <div className="invalid-feedback">
                    Por favor coloque su teléfono
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <hr className="my-4" />
              <button onClick={handleSubmit} className="w-100 btn btn-primary btn-lg" type="submit">Pagar</button>
            </form>
          </div>
        </div>
      </main>
    </div>

  )
}

export default CheckOut