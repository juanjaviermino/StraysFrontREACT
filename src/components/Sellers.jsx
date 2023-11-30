import React, {useState, useEffect} from "react";
import UsersTable from './usersComponents/UsersTable';

function Sellers () {
    // const [show, setShow] = useState(false);
    // const toggle = () => setShow(!show);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const getUsers = async () => {
    //     const res = await fetch(`${API}/users`);
    //     const data = await res.json();
    //     setUsers(data);
    // }

    // useEffect(() => {
    //     getUsers();
    // }, [])

    // const handleEdition = (user) => {
    //     setCurrentUser(user);
    //     handleShow();
    // }

    return(
        <div className="seller-page-container gradient-background">
            <div className="seller-message-space"> 
                <h1>Usuarios</h1>
                <p>En esta sección se pueden ver los usuarios de la aplicación</p>
            </div>  
            <div className='sellers-table-container'>
                <UsersTable/>
            </div>
        </div>
    );
}

export default Sellers;

{/* <table className='sellers-table'>
                    <thead>
                        <tr className='table-titles'>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>E-mail</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {users.map((user) => (
                            <tr key={user.id} className="table-row">
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleEdition(user)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>  */}