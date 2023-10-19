import React, {useState, Fragment, useEffect} from 'react'

const API = "http://localhost:5000";

function Users (){
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [idEditable, setEditableId] = useState('');

    // FUNCIONES PARA MANEJAR LOS DATOS
    // FunciÃ³n para ingresar un usuario
    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!editing){
            const res = await fetch(`${API}/users`, {
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                }),
            });
        } else {
            const res = await fetch(`${API}/users/${idEditable}`, {
                method:'PUT',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    name,
                    lastname,
                    email
                }),
            });
            const data = await res.json();
            window.alert(data);
            setEditing(false);
            setEditableId('');
        }

        await getUsers();

        setName('');
        setLastname('');
        setEmail('');
    };

    // FunciÃ³n para obtener todos los usuarios
    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    }

    // FunciÃ³n para eliminar un usuario
    const deleteUser = async (id) => {
        const response = await fetch(`${API}/user/${id}`);
        const userData = await response.json();

        const userResponse = window.confirm(`Â¿EstÃ¡s seguro de eliminar a: ${userData.name}?`)
        if(userResponse){
            const res = await fetch(`${API}/users/${id}`, {
                method:'DELETE'
            });
            const data = await res.json();
            await getUsers();
        }
    }

    // FunciÃ³n para ediar un usuario
    const editUser = async (id) => {
        const response = await fetch(`${API}/user/${id}`);
        const userData = await response.json();

        setEditing(true);
        setEditableId(userData.id);

        setName(userData.name);
        setLastname(userData.lastname);
        setEmail(userData.email);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <Fragment>
            <h1 className='p-3'>Users</h1>
            
            <figure className='mb-4'>
                <blockquote className='blockquote mb-4'>
                    <p className='text-info mb-0'>
                    Users es un ejemplo de CRUD donde se pueden hacer
                    operaciones bÃ¡sicas como crear un usuario, leer los usuarios, 
                    editar un usuario o eliminarlo. En esta entrega se presenta este
                    ejemplo como base para las futuras entregas.
                    </p>
                </blockquote>
                <figcaption className='blockquote-footer text-start text-info'>
                    Este proyecto estÃ¡ realizado por  <cite title='Source Title'>Juan Javier MiÃ±o Arboleda</cite>
                </figcaption>
            </figure>
            <div className='row'>
                <div className='col-md-4'>
                    <form onSubmit={handleSubmit} className='card card-body rounded border-primary mb-3'>
                        <h3 className='text-center'>Formulario de ingreso de Usuarios</h3>
                        <div className='form-group m-2'>
                            <input 
                                type="text" 
                                onChange={e => setName(e.target.value)} 
                                value={name}
                                className='form-control'
                                placeholder='Nombre'
                                autoFocus/>
                        </div>
                        <div className='form-group m-2'>
                            <input 
                                type="text" 
                                onChange={e => setLastname(e.target.value)} 
                                value={lastname}
                                className='form-control'
                                placeholder='Apellido'
                                autoFocus/>
                        </div>
                        <div className='form-group m-2'>
                            <input 
                                type="email" 
                                onChange={e => setEmail(e.target.value)} 
                                value={email}
                                className='form-control'
                                placeholder='E-mail'/>
                        </div>
                        <button className='btn btn-primary m-2 rounded-sm'>
                            {editing ? 'Editar' : 'Crear'}
                        </button>
                    </form>
                </div>
                <div className='col-md-8'>
                    <table className='table table-hover'>
                        <thead>
                            <tr className='table-primary'>
                                <th className='text-center'>ID</th>
                                <th className='text-center'>Nombre</th>
                                <th className='text-center'>Apellido</th>
                                <th className='text-center'>Email</th>
                                <th className='text-center'>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className='align-middle'>{user.id}</td>
                                    <td className='align-middle'>{user.name}</td>
                                    <td className='align-middle'>{user.lastname}</td>
                                    <td className='align-middle'>{user.email}</td>
                                    <td className='d-flex justify-content-center align-items-center'>
                                        <button className='btn btn-info btn-block'
                                            onClick={() => editUser(user.id)}>
                                            Editar
                                        </button>
                                        <button 
                                            className='btn btn-danger btn-block m-2'
                                            onClick={() => deleteUser(user.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </Fragment>
    );
}

export default Users;

/*export const Users = () => {

    
}*/