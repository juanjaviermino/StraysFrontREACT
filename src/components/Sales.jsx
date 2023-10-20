import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

function Sales () {

    const API = "https://straysbackend.onrender.com";

    const [userOptions, setUserOptions] = useState([]);
    const [selectedUserOption, setSelectedUserOption] = useState('');

    const [productOptions, setProductOptions] = useState([]);
    const [selectedProductOption, setSelectedProductOption] = useState('');

    const [ammount, setAmmount] = useState('');
    const [date, setDate] = useState('');
    const [product_id, setproductId] = useState('');
    const [user_id, setuserId] = useState('');
    const [sales, setSales] = useState([]);

    const getSales = async () => {
        const res = await fetch(`${API}/sales`);
        const data = await res.json();
        setSales(data);
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUserOptions(data);
    }

    const getProducts = async () => {
        const res = await fetch(`${API}/products`);
        const data = await res.json();
        setProductOptions(data);
    }

    useEffect(() => {
        getSales();
    }, [sales])

    
    useEffect(() => {
        getUsers();
        setuserId(selectedUserOption);
    }, [userOptions]);

    useEffect(() => {
        getProducts();
        setproductId(selectedProductOption);
    }, [productOptions]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const res = await fetch(`${API}/sales`, {
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                date, 
                user_id,
                product_id,
                ammount
            }),
        });


        console.log(JSON.stringify({
            date, 
            user_id,
            product_id,
            ammount
        }));
        
        const data = await res.json(); // Guardamos la respuesta de la API
        window.alert(data.message); // Mostramos la respuesta de la API

        switch (res.status) {
            case 200:
                setAmmount('');
                setDate('');
                setproductId('');
                setuserId('');
              break;
            case 400:
                setproductId('');
                setuserId('');
            break;
            default:
              break;
                
        }
    };

    return(
        <div className="prod-page-container gradient-background">
            <div className="sales-message-space"> 
                <h1>Ventas</h1>
                <p>En esta página puedes ingresar ventas:</p>
            </div>
            <div className="sales-form-space">
                <div className='sales-form'>
                    <h2>Ingresa los datos de la venta</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <label htmlFor="salesDate">Fecha de la venta</label>
                        <input 
                            id="salesDate"
                            type="date" 
                            onChange={e => setDate(e.target.value)} 
                            value={date}
                            autoFocus/>
                        <label htmlFor="user">Vendedor o Usuario</label>
                        <select
                                id="user"
                                value={selectedUserOption}
                                onChange={e => setSelectedUserOption(e.target.value)}>
                                <option value="9999">Selecciona una opción</option>
                                {userOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                                ))}
                            </select>
                        <label htmlFor="product">Producto</label>
                        <select
                            id="product"
                            value={selectedProductOption}
                            onChange={e => setSelectedProductOption(e.target.value)}>
                            <option value="9999">Selecciona una opción</option>
                            {productOptions.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                            ))}
                        </select>
                        <label htmlFor="salesAmmount">Cantidad vendida</label>
                        <input 
                            id="salesAmmount"
                            type="number"
                            
                            onChange={e => setAmmount(e.target.value)} 
                            value={ammount}
                            autoFocus/>
                        <button className='btn-action'>
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>   
            <div className='sales-table-container'>
                <table className='products-table'>
                    <thead>
                        <tr className='table-titles'>
                            <th className='title-item'>ID</th>
                            <th className='text-center'>Fecha</th>
                            <th className='text-center'>Usuario</th>
                            <th className='text-center'>Producto</th>
                            <th className='text-center'>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {sales.map((sale) => (
                            <tr key={sale.id} className="table-row">
                                <td>{sale.id}</td>
                                <td>{sale.date}</td>
                                <td>{sale.user_name}</td>
                                <td>{sale.product_name}</td>
                                <td>{`$ ${sale.ammount}`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div>
        </div>
    );
}

export default Sales;