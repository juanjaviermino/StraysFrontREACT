import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage (props) {

    const API = "http://localhost:5000";
    const navigate = useNavigate(); // Initialize the history object

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {toPreLoginPage} = props;

    function verification(psw){
        if(psw===password){
            console.log("Contraseñas iguales");
            return true;
        } else{
            console.log("Contraseñas diferentes");
            return false;
        }
    }

    const handleSubmit = async (e) =>{

        e.preventDefault();

        const res = await fetch(`${API}/userbymail?criteria=email&value=${email}`);

        switch (res.status) {
            case 404:
                window.alert("No existe un usuario con ese correo, verifica los datos");
              break;
            case 200:
                const data = await res.json();
                if(verification(data.password)){
                    toPreLoginPage(true);
                    navigate('/'); // 
                } else{
                    window.alert("Contraseña incorrecta, intenta de nuevo");
                }
                break;
            default:
                window.alert("Hubo un problema de nuestra parte, intenta de nuevo");
        }
    };

    return(
        <div className="log-page-container gradient-background">
            <div className="log-message-space"> 
                <h1>¡Que bueno verte!</h1>
                <p>Tu apoyo es muy valioso para poder <strong>reencontrar la felicidad</strong> de nuestra comunidad. Esperamos poder ayudarte</p>
            </div>
            <div className="log-form-space">
                <div className='reg-form'>
                    <h2>Ingresa tus credenciales</h2>
                    <form onSubmit={handleSubmit} className="form">
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
                        <button className="btn-action">
                            Ingresar
                        </button>
                        <Link className="form-link" to="/register">¿No tienes una cuenta? Regístrate aquí</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;