import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function RegistrationPage () {

    const API = "http://localhost:5000";
    const navigate = useNavigate(); // Initialize the history object

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if(password!=passwordConf){
            window.alert("Las contraseñas no coinciden, intenta de nuevo"); // Mensaje de error si las contraseñas no coinciden
            setPassword('');
            setPasswordConf('');
        } else{
            const res = await fetch(`${API}/users`, {
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    name,
                    lastname,
                    email,
                    password
                }),
            });
    
            const data = await res.json(); // Guardamos la respuesta de la API
            window.alert(data.message); // Mostramos la respuesta de la API

            switch (res.status) {
                case 400:
                    setEmail('');
                  break;
                case 200:
                    navigate('/login'); // Navigate to the /login route
                  break;
                default:
                    setName('');
                    setLastname('');
                    setEmail('');
                    setPassword('');
              }
        }
    };

    return(
        <div className="reg-page-container gradient-background">
            <div className="reg-message-space"> 
                <h1>Gracias por ayudar</h1>
                <p>Nos encanta que formes parte de esta iniciativa, regístrate aquí:</p>
            </div>
            <div className="reg-form-space">
                <div className='reg-form'>
                    <h2>Ingresa tus datos</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <input 
                            type="text" 
                            onChange={e => setName(e.target.value)} 
                            value={name}
                            placeholder='Nombre'
                            autoFocus/>
                        <input 
                            type="text" 
                            onChange={e => setLastname(e.target.value)} 
                            value={lastname}
                            placeholder='Apellido'
                            autoFocus/>
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email}
                            placeholder='E-mail'/>
                        <input 
                            type="password" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password}
                            placeholder='Contraseña'/>
                        <input 
                            type="password" 
                            onChange={e => setPasswordConf(e.target.value)} 
                            value={passwordConf}
                            placeholder='Confirma tu contraseña'/>
                        <button className='btn-action'>
                            Registrarse
                        </button>
                        <Link className="form-link" to="/login">¿Ya tienes una cuenta? Ingresa aquí</Link>
                    </form>
                </div>
            </div>    
        </div>
    );
}

export default RegistrationPage;