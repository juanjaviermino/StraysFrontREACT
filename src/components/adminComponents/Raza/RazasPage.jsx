import React, { useEffect, useState, useRef } from 'react';
import RazasTable from './RazasTable'; // EDITABLE
import { Toast } from 'primereact/toast';
const apiEndpoint = import.meta.env.VITE_APP_API;
const API_BASE_URL = `${apiEndpoint}/raza`;

import { useRazas } from '../../../services/useRazas';
import { useEspecies } from '../../../services/useEspecies';

function RazasPage () {

    const toast = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [object, setObject] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    const { createObject, updateObject, deleteObject } = useRazas(); //EDITABLE
    const { especies } = useEspecies(); //EDITABLE
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEspecieId, setSelectedEspecieId] = useState('9999');

    useEffect(()=>{
        setObject({ ...object, ['especie_id']: selectedEspecieId }); // EDITABLE
    }, [selectedEspecieId]);

    useEffect(() => {
        console.log(object);
    }, [object])

    const getData = async () => {
        setIsLoading(true); // Set loading to true before the request starts
        try {
            const response = await fetch(`${API_BASE_URL}/${selectedId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Remove the body from GET request as it's not needed
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setData(data); // Set the data from the response
        } catch (error) {
            console.error("Fetching data failed", error);
            setIsEditing(false);
            setData(null); // Reset the data on error
        } finally {
            setIsLoading(false); // Set loading to false after the request finishes
        }
    };

    useEffect(()=>{
        if(isEditing){
            setSelectedEspecieId(data?.especie_id);
            const dataETL = {
                raza: data?.raza,
                especie_id: data?.especie_id 
            };
            setObject(dataETL);
        }else{
            setObject({});
        }
    }, [isEditing, data]);

    const resetStates = () => {
        setObject({});
        setIsEditing(false);
        setSelectedId(null);
        setSelectedEspecieId('9999');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObject({ ...object, [name]: value }); // EDITABLE
    };

    useEffect(()=>{
        if(selectedId){
            getData();
        }
    }, [selectedId])

    const onSelect = (obj) => {
        setSelectedId(obj);
        setIsEditing(true);
    };

    const onUnselect = (e) => {
        setIsEditing(false);
    };

    const handleCreate = async (e) =>{
        e.preventDefault();
        // Intentar el request usando el servicio
        try {
            const response = await createObject(object);
            if (response === 201) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Se añadió el registro con éxito',
                    life: 3000,
                });
                resetStates();
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error',
                life: 3000,
            });
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        // Intentar el request usando el servicio
        try {
            const response = await updateObject(selectedId, object);
            if (response === 200) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Se editó el registro con éxito',
                    life: 3000,
                });
                resetStates();
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error',
                life: 3000,
            });
        }
    }; 

    const handleDelete = async (e) =>{
        e.preventDefault();
        // Intentar el request usando el servicio
        try {
            const response = await deleteObject(selectedId);
            if (response === 200) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Se eliminó el registro con éxito',
                    life: 3000,
                });
                resetStates();
            }
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error',
                life: 3000,
            });
        }
    };

    return(
        <section className="adminpage gradient-background">
            <Toast ref={toast} />
            <div className="adminpage__header"> 
                <h3>Razas de mascotas</h3>
            </div>
            <div className="adminpage__form">
                <div className="form">
                    {(isLoading && isEditing)  &&
                        <div className="spinnercontainer">
                            <div className="spinnercontainer__spinner" />
                        </div>
                    }
                    {isEditing ? <h2>{`Editar: ${object?.raza}`}</h2> : <h2>Ingresa una raza de mascota</h2> }
                    <form className="form__fields">
                        <label htmlFor='raza'>Raza <span>*</span></label>
                        <input 
                            id="raza"
                            type="text" 
                            onChange={handleInputChange}
                            name="raza"
                            value={object?.raza || ''}
                            placeholder='Raza de la mascota'
                            required
                            maxLength="50"/>
                        <label htmlFor="especie">Especie <span>*</span></label>
                        <select
                                id="especie"
                                className="dropdown"
                                value={selectedEspecieId}
                                onChange={e => setSelectedEspecieId(e.target.value)}>
                                <option value="9999">Selecciona una opción</option>
                                {especies?.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.especie}
                                </option>
                                ))}
                        </select>
                        
                        {
                            isEditing ? (
                                <div className="form__udbuttons">
                                    <button onClick={handleDelete} className="button--action alert">
                                        Eliminar
                                    </button>
                                    <button onClick={handleEdit} className="button--action secondary">
                                        Editar
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleCreate} className="button--action">
                                    Ingresar
                                </button>
                            )

                        }
                        
                    </form>
                </div>
            </div>
            <div className="adminpage__table">
                <RazasTable onSelect={onSelect} onUnselect={onUnselect} />
            </div>
        </section>
    );
}

export default RazasPage;