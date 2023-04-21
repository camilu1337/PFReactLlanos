import React from 'react';
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import CartView from './components/CartView/CartView';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { CartContextProvider } from './context/CartContext';
import Footer from './components/Footer/footer';
import CheckOut from './components/CheckOut/';

function App() {
  return (
    <>
      <CartContextProvider>
        <HashRouter>
          <NavBar />
          <main>
            <Routes>
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/item/:itemid" element={<ItemDetailContainer greeting="Detalle de producto" />} />
              <Route path="/" element={<ItemListContainer greeting="Menú de EmmaLou Vivero" />} />
              <Route path="/cart" element={<CartView greeting="Este es su carrito" />} />
              <Route path="/category/:categoryid" element={<ItemListContainer greeting="Categoría" />} />
            </Routes>
            <hr />
          </main>
          <Footer />
        </HashRouter>
      </CartContextProvider>
    </>
  );
}

export default App;
