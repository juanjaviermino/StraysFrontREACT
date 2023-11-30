import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';

import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import useSWR from 'swr';

function UsersTable() {

    const toast = useRef(null); 
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const API_BASE_URL = "https://straysbackend.onrender.com/users";

    const fetcher = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Hubo un problema con el servidor, intenta de nuevo");
        }
        return res.json();
    };

    const { data, error, isValidating, isLoading, mutate } = useSWR(API_BASE_URL, fetcher, {
        errorRetryInterval: 10000,
    });

    // Inicializa los filtros: GENERAL
    useEffect(() => {
        initFilters();
    }, []);

    // Genera el toast con el error: GENERAL
    useEffect(() => {
        if (error) {
            toast.current.show({
                severity: 'info',
                summary: 'Aviso',
                detail: 'Hubo un problema con el servidor, intenta mas tarde',
                life: 3000,
            });
        }
    }, [error]);

    // Refresca los datos: GENERAL
    const refreshData = () => {
        setIsRefreshing(true);
        mutate();
    };

    // Cambia el estado de refreshing: GENERAL
    useEffect(() => {
        if (isRefreshing) {
            setIsRefreshing(false);
        }
    }, [isValidating]);

    // Función para limpiar todos los filtros: GENERAL
    const clearFilter = () => {
        initFilters();
    };

    // Función para el filtro global: GENERAL
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    // Función para restaurar e inicializar los filtros: ESPECIFICO
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            lastname: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
        }); // EDITABLE
        setGlobalFilterValue('');
    };

    // Columnas que se expotarán en el Excel: ESPECIFICO
    const cols = [
        { header: 'ID', dataKey: 'id' },
        { header: 'Nombre', dataKey: 'name' },
        { header: 'Apellido', dataKey: 'lastname' },
        { header: 'Email', dataKey: 'email' }
    ]; // EDITABLE

    // Función para exportar a Excel: ESPECIFICO
    const exportExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users'); // EDITABLE

        const headerRow = [];
        cols.forEach((col) => {
            headerRow.push(col.header);
        });
        worksheet.addRow(headerRow);

        data.forEach((user) => {
            worksheet.addRow([
                user.id,
                user.name,
                user.lastname,
                user.email
            ]);
        }); // EDITABLE

        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAsExcelFile(buffer, 'Users'); // EDITABLE
        });
    };

    // Función para guardar el Excel: GENERAL
    const saveAsExcelFile = (buffer, fileName) => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
            type: EXCEL_TYPE
        });

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        saveAs(data, fileName + ' - ' + formattedDate + EXCEL_EXTENSION);
    };

    // Contiene el header de la tabla: GENERAL
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <div className="table-utility">
                    <span className="search-input-container">
                        <i className="pi pi-search search-input-icon" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                        <InputText className="search-input" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
                    </span>
                    <Button className="rounded-icon-btn" onClick={refreshData}>
                        <i className="pi pi-refresh" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                    </Button>
                    <Button onClick={clearFilter} className="rounded-icon-btn" type="button" rounded>
                        <i className="pi pi-filter-slash" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                    </Button>
                </div>
                <div className="table-utility">
                    <Button onClick={exportExcel} id="dwn-excel" className="rounded-icon-btn" type="button" rounded data-pr-tooltip="XLS">
                        <i className="pi pi-file-excel" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                    </Button>
                </div>
            </div>
        );
    };

    // Formato del botón para cancelar filtros: GENERAL
    const filterClearTemplate = (options) => {
        return <Button id="cancel" className="rounded-icon-btn" type="button" onClick={options.filterClearCallback}>
            <i className="pi pi-times" style={{ fontSize: '0.8rem', margin: '0' }}></i>
        </Button>;
    };

    // Formato del botón para confirmar filtros: GENERAL
    const filterApplyTemplate = (options) => {
        return <Button className="rounded-icon-btn" type="button" onClick={options.filterApplyCallback}>
            <i className="pi pi-check" style={{ fontSize: '0.8rem', margin: '0' }}></i>
        </Button>;
    };

    // Renderizar el header: GENERAL
    const header = renderHeader();

    // Contiene los parámetros para crear columnas: ESPECIFICO
    const columnsData = [
        {
            nombrevar: "id",
            header: "ID",
            filterPlaceholder: "Buscar por ID",
        },
        {
            nombrevar: "name",
            header: "Nombre",
            filterPlaceholder: "Buscar por nombre",
        },
        {
            nombrevar: "lastname",
            header: "Apellido",
            filterPlaceholder: "Buscar por apellido",
        },
        {
            nombrevar: "email",
            header: "E-mail",
            filterPlaceholder: "Buscar por e-mail",
        }
    ];

    // maneja la selección de la fila: ESPECIFICO -> TODO
    // const onRowSelect = (event) => {
    //     onSelect(event.data.abogadoId);
    // };

    // maneja la de selección de la fila: ESPECIFICO -> TODO
    // const onRowUnselect = (event) => {
    //     toast.current.show({ severity: 'warn', summary: 'Product Unselected', detail: `Name: ${event.data.name}`, life: 3000 });
    // };

    return(
        <div className="tabla">
            <Tooltip target=".export-buttons>button" position="bottom" />
            <Toast ref={toast} />
            {(isLoading || (isRefreshing && isValidating)) &&
                <div className="spinner-container">
                    <div className="spinner" />
                </div>
            }
            {error &&
                <div className="stale-data-msg">
                    <i className="pi pi-exclamation-circle" style={{ fontSize: '0.8rem', margin: '0', color: 'white' }}></i>
                    <span><strong>Los datos pueden estar desactualizados</strong> | intenta recargar la tabla</span>
                </div>}
            <DataTable
                value={data} // EDITABLE
                resizableColumns
                removableSort
                paginator
                scrollable
                scrollHeight="50vh"
                showGridlines
                rows={25}
                rowsPerPageOptions={[5, 10, 25, 50]}
                size="small"
                dataKey="id" // EDITABLE
                filters={filters}
                globalFilterFields={['id', 'name', 'lastname', 'email']} // EDITABLE
                header={header}
                emptyMessage="No se encontraron usuarios" // EDITABLE
                selectionMode="single"
                selection={selectedUser} // EDITABLE
                onSelectionChange={(e) => setSelectedUser(e.value)} // EDITABLE
                // onRowSelect={onRowSelect} TODO
                // onRowUnselect={onRowUnselect} TODO
                metaKeySelection={false}
            > 
                {columnsData.map((column, index) => (
                    <Column
                        key={index}
                        field={column.nombrevar}
                        header={column.header}
                        sortable
                        filter
                        filterField={column.nombrevar}
                        filterPlaceholder={column.filterPlaceholder}
                        filterClear={filterClearTemplate}
                        filterApply={filterApplyTemplate}
                        style={{ minWidth: '12rem' }}
                    />
                ))}
            </DataTable>
        </div>
    );
}

export default UsersTable;
