import React from "react";

function ModalSellers(props){
    return(
        <div className="modal-overlay">
            <div className="modal-form">
                <h2>{props.name}</h2>
                <span>{props.id}</span>
                <input type="text" value={props.name}></input>
                <input type="text" value={props.lastname}></input>
                <input type="text" value={props.email}></input>
                <input type="text" value={props.email}></input>
            </div>
        </div>
    );
}   

export default ModalSellers;