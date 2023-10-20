import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

function Sellers () {

    const API = "https://straysbackend.onrender.com";

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    }

    useEffect(() => {
        getUsers();
    }, [users])

    return(
        <div className="seller-page-container gradient-background">
            <div className="seller-message-space"> 
                <h1>Usuarios</h1>
                <p>Esta página permite ver los "vendedores", los usuarios del sistema</p>
            </div>  
            <div className='sellers-table-container'>
                <table className='sellers-table'>
                    <thead>
                        <tr className='table-titles'>
                            <th className='title-item'>ID</th>
                            <th className='text-center'>Nombre</th>
                            <th className='text-center'>Apellido</th>
                            <th className='text-center'>E-mail</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {users.map((user) => (
                            <tr key={user.id} className="table-row">
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div>
        </div>
    );
}

export default Sellers;