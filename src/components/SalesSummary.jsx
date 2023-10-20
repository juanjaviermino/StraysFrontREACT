import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

function SalesSummary () {

    const API = "https://straysbackend.onrender.com";

    const [begin_date, setBeginDate] = useState('');
    const [final_date, setFinalDate] = useState('');
    const [summary, setSummary] = useState([]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const res = await fetch(`${API}/sales_summary?begin_date=${begin_date}&final_date=${final_date}`);
        const data = await res.json(); // Guardamos la respuesta de la API

        setSummary(data);

        console.log(data);

        switch (res.status) {
            case 200:
                window.alert("Resumen generado exitosamente");
              break;
            default:
                window.alert("Hubo un problema generando el resumen");
              break;
                
        }
    };

    return(
        <div className="prod-page-container gradient-background">
            <div className="prod-message-space"> 
                <h1>Resumen de ventas</h1>
                <p>En esta página puedes seleccionar dos fechas de filtro para obtener el resumen de ventas por vendedor</p>
            </div>
            <div className="prod-form-space">
                <div className='prod-form'>
                    <h2>Ingresa las fechas</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <label htmlFor="initDate">Fecha inicial</label>
                        <input 
                            id="initDate"
                            type="date" 
                            onChange={e => setBeginDate(e.target.value)} 
                            value={begin_date}
                            autoFocus/>
                        <label htmlFor="finalDate">Fecha final</label>
                        <input 
                            id="finalDate"
                            type="date" 
                            onChange={e => setFinalDate(e.target.value)} 
                            value={final_date}
                            autoFocus/>
                        <button className='btn-action'>
                            Resumir
                        </button>
                    </form>
                </div>
            </div>   
            <div className='products-table-container'>
                <table className='products-table'>
                    <thead>
                        <tr className='table-titles'>
                            <th className='text-center'>Vendedor</th>
                            <th className='text-center'>Resumen de ventas</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {summary.map((sum) => (
                            <tr key={sum.user_name} className="table-row">
                                <td>{sum.user_name}</td>
                                <td>{sum.total_ammount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </div>
        </div>
    );
}

export default SalesSummary;