import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

function Products () {

    const API = "https://straysbackend.onrender.com";

    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const res = await fetch(`${API}/products`);
        const data = await res.json();
        setProducts(data);
    }

    const deleteProduct = async (id) => {
        const userResponse = window.confirm(`Estás seguro de eliminar el producto?`)

        if(userResponse){
            const res = await fetch(`${API}/products/${id}`, {
                method:'DELETE'
            });
            const data = await res.json();
            window.alert(data.message); // Mostramos la respuesta de la API
            await getProducts();
        }
    }

    useEffect(() => {
        getProducts();
    }, [products])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const res = await fetch(`${API}/products`, {
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                name
            }),
        });

        const data = await res.json(); // Guardamos la respuesta de la API
        window.alert(data.message); // Mostramos la respuesta de la API

        switch (res.status) {
            case 200:
                setName('');
              break;
            default:
              break;
                
        }
    };

    return(
        <div className="prod-page-container gradient-background">
            <div className="prod-message-space"> 
                <h1>Productos</h1>
                <p>En esta página puedes ingresar productos:</p>
            </div>
            <div className="prod-form-space">
                <div className='prod-form'>
                    <h2>Ingresa los datos del producto</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <input 
                            type="text" 
                            onChange={e => setName(e.target.value)} 
                            value={name}
                            placeholder='Nombre del producto'
                            autoFocus/>
                        <button className='btn-action'>
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>   
            <div className='products-table-container'>
                <table className='products-table'>
                    <thead>
                        <tr className='table-titles'>
                            <th className='title-item'>ID</th>
                            <th className='text-center'>Nombre del producto</th>
                            <th className='text-center'>Acción</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {products.map((prod) => (
                            <tr key={prod.id} className="table-row">
                                <td>{prod.id}</td>
                                <td>{prod.name}</td>
                                <td>
                                    <button 
                                        className='btn-delete'
                                        onClick={() => deleteProduct(prod.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div>
        </div>
    );
}

export default Products;