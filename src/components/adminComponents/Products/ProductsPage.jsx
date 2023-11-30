import React, { useEffect, useState, useRef } from 'react';
import ProductsTable from './ProductsTable';
import { Toast } from 'primereact/toast';
const apiEndpoint = import.meta.env.VITE_APP_API;
const API_BASE_URL = `${apiEndpoint}/product`;

import { useProducts } from '../../../services/useProducts';

function ProductsPage () {

    const toast = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [product, setProduct] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    const { createObject, updateObject, deleteObject } = useProducts();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        getData();
    }, [selectedId])

    useEffect(()=>{
        if(isEditing){
            setProduct(data);
        }else{
            setProduct({});
        }
    }, [isEditing, data]);

    const resetStates = () => {
        setProduct({});
        setIsEditing(false);
        setSelectedId(null);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value }); // EDITABLE
    };

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
            const response = await createObject(product);
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
            const response = await updateObject(selectedId, product);
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
                <h3>Productos</h3>
            </div>
            <div className="adminpage__form">
                <div className="form">
                    {(isLoading && isEditing)  &&
                        <div className="spinnercontainer">
                            <div className="spinnercontainer__spinner" />
                        </div>
                    }
                    {isEditing ? <h2>{`Editar: ${product?.name}`}</h2> : <h2>Ingresa un producto</h2> }
                    <form className="form__fields">
                        <label htmlFor='nombre'>Nombre <span>*</span></label>
                        <input 
                            id="nombre"
                            type="text" 
                            onChange={handleInputChange}
                            name="name"
                            value={product?.name || ''}
                            placeholder='Nombre del producto'
                            required
                            maxLength="80"/>
                        
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
                <ProductsTable onSelect={onSelect} onUnselect={onUnselect} />
            </div>
        </section>
    );
}

export default ProductsPage;