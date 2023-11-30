import React, {useState ,useRef} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsers } from '../../services/useUsers';
import { useDispatch } from 'react-redux';
import { loggin } from '../../context/userSlice';
import { Toast } from 'primereact/toast';

// Auth
import { loginRequest } from '../../auth-config';
import { useMsal } from '@azure/msal-react';


function LoginPage() {

    // --------------- Authentication settings -------------------------------------------------------

    const { instance } = useMsal();

    const handleLogin = (e) => {
        e.preventDefault();

        instance
            .loginRedirect(loginRequest)
            .catch((error) => console.log(error));
    };

    // --------------- Setup (Servicios, Contextos, Referencias) -----------------------------------
    const toast = useRef(null);
    const navigate = useNavigate(); // Initialize the history object
    const dispatch = useDispatch();
    // --------------- Estados -----------------------------------

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // --------------- Servicios -----------------------------------
    const { validatePassword } = useUsers(); //EDITABLE

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(password === '' || email === ''){
            toast.current.show({
                severity: 'info',
                summary: 'Alerta',
                detail: 'Por favor, ingresa todos los datos',
                life: 3000,
            });
            return;
        }
    
        // Set loading to true before making the fetch request
        setIsLoading(true);
      
        try {
            // Call the validate password method
            const res = await validatePassword({ email, password });
    
            switch (res) {
                case 200:
                    dispatch(loggin());
                    navigate('/StraysFrontREACT/');
                    break;
                case 404:
                    toast.current.show({
                        severity: 'info',
                        summary: 'Alerta',
                        detail: 'No existe un usuario con ese correo, verifica los datos',
                        life: 3000,
                    });
                    break;
                case 401:
                    toast.current.show({
                        severity: 'info',
                        summary: 'Alerta',
                        detail: 'Contraseña incorrecta, intenta de nuevo',
                        life: 3000,
                    });
                    break;
                default:
                    toast.current.show({
                        severity: 'info',
                        summary: 'Alerta',
                        detail: 'Hubo un problema de nuestra parte, intenta de nuevo',
                        life: 3000,
                    });
            }
        } catch (error) {
            window.alert("Error en la conexión: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };
    

    return(
        <div className="loginpage gradient-background">
            <Toast ref={toast} />
            <div className="loginpage__message"> 
                <h2>¡Que bueno verte!</h2>
                <p>Tu apoyo es muy valioso para poder <strong>reencontrar la felicidad</strong> de nuestra comunidad. Esperamos poder ayudarte</p>
            </div>
            <div className="loginpage__form">
                <div className="form">
                    {isLoading &&
                        <div className="spinnercontainer">
                            <div className="spinnercontainer__spinner" />
                        </div>
                    }
                    <h2>Ingresa tus credenciales</h2>
                    <form className="form__fields">
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
                        <button className="button--action" onClick={handleSubmit}>
                            Ingresar
                        </button>
                        <Link className="form__fields-link" to="/StraysFrontREACT/register">¿No tienes una cuenta? Regístrate aquí</Link>
                        <hr></hr>
                        <button className="button--microsoft" onClick={(e) => handleLogin(e)}>
                            <i className="pi pi-microsoft" style={{ fontSize: '20px', color: 'white', margin:'0' }}></i>
                            <span style={{color: 'white', fontSize:'30px', fontWeight:'200', margin:'0 10px'}}>|</span>
                            <span style={{color: 'white', verticalAlign:'center'}}> O ingresa con tu cuenta de la UDLA</span>
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;