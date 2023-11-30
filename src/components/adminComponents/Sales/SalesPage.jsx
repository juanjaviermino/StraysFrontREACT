import React, { useEffect, useState, useRef } from 'react';
import SalesTable from './SalesTable'; // EDITABLE
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';

const apiEndpoint = import.meta.env.VITE_APP_API;
const API_BASE_URL = `${apiEndpoint}/sales`;

import { useSales } from '../../../services/useSales';
import { useUsers } from '../../../services/useUsers';
import { useProducts } from '../../../services/useProducts';

function SalesPage () {

    const toast = useRef(null);
    const [object, setObject] = useState({});
    const { createObject } = useSales(); //EDITABLE

    const { users, error: errorU, isLoading: isLoadingU, isValidating: isValidatingU, refresh: refreshU  } = useUsers();
    const { products, error: errorP, isLoading: isLoadingP, isValidating: isValidatingP, refresh: refreshP  } = useProducts();

    const [isLoading, setIsLoading] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [isRefreshing, setIsRefreshing] = useState(false); // Para los dropdowns
    const defaultRequiredFields = {
        date: false,
        user_id: false,
        product_id: false,
        ammount: false,
    };
    const [isAnyEmpty, setisAnyEmpty] = useState(false);
    const [requiredFields, setRequiredFields] = useState(defaultRequiredFields);

    // ############ Dropdowns #################
    
    useEffect(() => {
        if (selectedUser) {
            setObject(prev => ({
                ...prev,
                user_id: selectedUser.id
            }));
        }
    }, [selectedUser]);

    useEffect(() => {
        if (selectedProduct) {
            setObject(prev => ({
                ...prev,
                product_id: selectedProduct.id
            }));
        }
    }, [selectedProduct]);

    const refreshData = (e) => {
        e.preventDefault();
        setIsRefreshing(true);
        refreshU();
        refreshP();
    }; // Refresca los datos del los dropdowns: GENERAL

    useEffect(() => {
        if (isRefreshing) {
            setIsRefreshing(false);
        }
    }, [isValidatingU, isValidatingP]);

    const optionTemplate = (option) => {
        return (
            <div className="dropdown-item-container">
                <span>{option.name}</span>
            </div>
        );
    }; // EDITABLE: template para mostrar las opciones de un dropdown
   
    const selectedValueTemplate = (option, props) => {
        if (option) {
            return (
                <div className="dropdown-item-container">
                    <span>{option.name}</span>
                </div>
            );
        }
   
        return <span>{props.placeholder}</span>;
    }; //EDITABLE: template para mostrar el valor seleccionado de un dropdown

    // ############ Fin Dropdowns #################


    const resetStates = () => {
        setObject({});
        setSelectedUser(null);
        setSelectedProduct(null);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObject({ ...object, [name]: value }); // EDITABLE
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

    const handleCreate = async (e) =>{
        e.preventDefault();

        // Verificar si existe algun campo requerido vacío
        const anyFieldEmpty = validateRequiredFields(object);

        if (anyFieldEmpty) {
            setisAnyEmpty(true);
            return;
        } else {
            setisAnyEmpty(false);
        }


        setIsLoading(true);

        // Intentar el request usando el servicio
        try {
            const response = await createObject(object);
            if (response === 200) {
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
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <section className="adminpage gradient-background">
            <Toast ref={toast} />
            <div className="adminpage__header"> 
                <h3>Ventas</h3>
            </div>
            <div className="adminpage__form">
                <div className="form">
                    {isLoading  &&
                        <div className="spinnercontainer">
                            <div className="spinnercontainer__spinner" />
                        </div>
                    }
                    <h2>Ingresa una venta</h2>
                    <form className="form__fields">
                        <label htmlFor='fecha'>Fecha <span>*</span></label>
                        <input 
                            className={`${requiredFields.date && 'form__fields--empty'}`}
                            id="Fecha"
                            type="date" 
                            onChange={handleInputChange}
                            name="date"
                            value={object?.date || ''}
                            placeholder='Fecha de la venta'
                            required/>
                        <label>Usuario <span>*</span></label>
                        <div className="form__fields-dropdown">
                            {
                                errorU || !users ? (
                                    <div className="dropdown__error">
                                        <div className="dropdown__error-msg">
                                            {isLoadingU || (isRefreshing && isValidatingU) ?
                                                <div className="spinnercontainer__spinner--small" />
                                                 :
                                            <span>Ocurrió un error</span>}
                                        </div>
                                        <button className="button--rounded-icon" onClick={refreshData}>
                                            <i className="pi pi-refresh" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                                        </button>
                                    </div>
                                ) : (
                                    <Dropdown
                                        className={`${requiredFields.user_id && 'form__fields--empty'}`}
                                        value={selectedUser}
                                        onChange={(e) => setSelectedUser(e.value)}
                                        options={users}
                                        optionLabel="name"
                                        placeholder="Selecciona un usuario"
                                        filter
                                        virtualScrollerOptions={{ itemSize: 38 }}
                                        valueTemplate={selectedValueTemplate}
                                        itemTemplate={optionTemplate}
                                        style={{width:'100%'}}
                                    />
                                )
                            }   
                        </div>
                        <label>Producto <span>*</span></label>
                        <div className="form__fields-dropdown">
                            {
                                errorP || !products ? (
                                    <div className="dropdown__error">
                                        <div className="dropdown__error-msg">
                                            {isLoadingP || (isRefreshing && isValidatingP) ?
                                                <div className="spinnercontainer__spinner--small" />
                                                 :
                                            <span>Ocurrió un error</span>}
                                        </div>
                                        <button className="button--rounded-icon" onClick={refreshData}>
                                            <i className="pi pi-refresh" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                                        </button>
                                    </div>
                                ) : (
                                    <Dropdown
                                        className={`${requiredFields.product_id && 'form__fields--empty'}`}
                                        value={selectedProduct}
                                        onChange={(e) => setSelectedProduct(e.value)}
                                        options={products}
                                        optionLabel="name"
                                        placeholder="Selecciona un producto"
                                        filter
                                        virtualScrollerOptions={{ itemSize: 38 }}
                                        valueTemplate={selectedValueTemplate}
                                        itemTemplate={optionTemplate}
                                        style={{width:'100%'}}
                                    />
                                )
                            }   
                        </div>
                        <label htmlFor='cantidad'>Cantidad vendida <span>*</span></label>
                        <input 
                            className={`${requiredFields.ammount && 'form__fields--empty'}`}
                            id="cantidad"
                            type="number" 
                            onChange={handleInputChange}
                            name="ammount"
                            value={object?.ammount || ''}
                            placeholder='Cantidad vendida en dólares'
                            required/>
                        {isAnyEmpty &&
                            <div className="emptyfields-msg">
                                <i className="pi pi-exclamation-circle"></i>
                                <span>Por favor, llena todos los datos <strong>requeridos</strong></span>
                            </div>
                        }
                        <button onClick={handleCreate} className="button--action">
                            Ingresar venta
                        </button>
                    </form>
                </div>
            </div>
            <div className="adminpage__table">
                <SalesTable />
            </div>
        </section>
    );
}

export default SalesPage;