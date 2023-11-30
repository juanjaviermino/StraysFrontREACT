import React, { useEffect, useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import SalesSummaryTable from './SalesSummaryTable'; // EDITABLE

const apiEndpoint = import.meta.env.VITE_APP_API;
const API_BASE_URL = `${apiEndpoint}/sales_summary`;

function SalesSummaryPage () {

    const toast = useRef(null);
    const [dates, setDates] = useState(null);
    const [summary, setSummary] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const defaultRequiredFields = {
        begin_date: false,
        final_date: false,
    };
    const [isAnyEmpty, setisAnyEmpty] = useState(false);
    const [requiredFields, setRequiredFields] = useState(defaultRequiredFields);

    const resetStates = () => {
        setDates(null);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDates({ ...dates, [name]: value }); // EDITABLE
    };

    const isEmptyValue = value => {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return value.trim() === '';
        if (typeof value === 'number') return isNaN(value) || value === 0;
        if (Array.isArray(value)) return value.length === 0;
        return false;
    }; // Verifica si un valor específico está vacío

    const validateRequiredFields = (obj) => {
        const updatedRequiredFields = { ...defaultRequiredFields };
    
        // Iterate over the required field keys
        Object.keys(updatedRequiredFields).forEach(key => {
            updatedRequiredFields[key] = isEmptyValue(obj[key]);
        });
    
        setRequiredFields(updatedRequiredFields);
    
        // Return true if any of the required fields is empty
        return Object.values(updatedRequiredFields).some(value => value);
    }; // Valida que los campos en REQUIRED_FIELDS no estén vacíos en el nuevo objeto

    const handleSummarize = async (e) => {
        e.preventDefault();
    
        // Verificar si existe algun campo requerido vacío
        const anyFieldEmpty = validateRequiredFields(dates);
    
        if (anyFieldEmpty) {
            setisAnyEmpty(true);
            return;
        } else {
            setisAnyEmpty(false);
        }

        // Convertir fechas a objetos Date para compararlas
        const beginDate = new Date(dates.begin_date);
        const finalDate = new Date(dates.final_date);

        // Verificar que la fecha de inicio es anterior a la fecha final
        if (beginDate >= finalDate) {
            toast.current.show({
                severity: 'success',
                summary: 'Alerta',
                detail: 'La fecha de inicio debe ser anterior a la fecha final',
                life: 3000,
            });
            return; // Detener la ejecución si la fecha de inicio no es anterior
        }
    
        // Set isLoading to true before the fetch operation begins
        setIsLoading(true);
    
        try {
            const res = await fetch(`${API_BASE_URL}?begin_date=${dates.begin_date}&final_date=${dates.final_date}`);
            const data = await res.json(); // Guardamos la respuesta de la API
    
            setSummary(data);
    
            if (res.status === 200) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Resumen generado con éxito',
                    life: 3000,
                });
                resetStates();
            } else {
                toast.current.show({
                    severity: 'info',
                    summary: 'Error',
                    detail: 'Hubo un error al generar el resumen',
                    life: 3000,
                });
            }
        } catch (error) {
            console.error('Error fetching summary:', error);
            window.alert("Hubo un error al intentar generar el resumen");
        } finally {
            setIsLoading(false);
        }
    };
    

    return(
        <section className="adminpage gradient-background">
            <Toast ref={toast} />
            <div className="adminpage__header"> 
                <h3>Resumen de ventas</h3>
            </div>
            <div className="adminpage__form">
                <div className="form">
                    {isLoading &&
                        <div className="spinnercontainer">
                            <div className="spinnercontainer__spinner" />
                        </div>
                    }
                    <h2>Ingresa un rango de fechas</h2>
                    <form className="form__fields">
                        <label htmlFor='fechaInicio'>Fecha inicio <span>*</span></label>
                        <input 
                            className={`${requiredFields.begin_date && 'form__fields--empty'}`}
                            id="fechaInicio"
                            type="date" 
                            onChange={handleInputChange}
                            name="begin_date"
                            value={dates?.begin_date || ''}
                            placeholder='Fecha de inicio'
                            required/>
                        <label htmlFor='fechafin'>Fecha fin <span>*</span></label>
                        <input 
                            className={`${requiredFields.final_date && 'form__fields--empty'}`}
                            id="fechafin"
                            type="date" 
                            onChange={handleInputChange}
                            name="final_date"
                            value={dates?.final_date || ''}
                            placeholder='Fecha fin'
                            required/>
                        {isAnyEmpty &&
                            <div className="emptyfields-msg">
                                <i className="pi pi-exclamation-circle"></i>
                                <span>Por favor, llena todos los datos <strong>requeridos</strong></span>
                            </div>
                        }
                        <button onClick={handleSummarize} className="button--action">
                            Generar resumen
                        </button>
                    </form>
                </div>
            </div>
            <div className="adminpage__table">
                <SalesSummaryTable summary={summary} />
            </div>
        </section>
    );
}

export default SalesSummaryPage;