import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import { useParams } from 'react-router-dom';
import { getItem as getProducto } from '../../services/firebase/firebaseConfig.js'

function ItemDetailContainer({ greeting, items }) {
    const [producto, setProducto] = useState([]);
    const { itemid } = useParams();
    useEffect(() => {
        getProducto(itemid).then(respuestaPromise => {
            setProducto(respuestaPromise);
        });
    }, [itemid]);

    return (
        <section id="menu" className="text-center container">
            <div className="album bg-degrade">
                <div className="container">
                    <div>
                        <ItemDetail detalle={producto} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ItemDetailContainer;