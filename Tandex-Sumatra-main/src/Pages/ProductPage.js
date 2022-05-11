import SideNavBar from "../components/SideNavBar"
import ProductTablePublication from "../components/ProductTablePublication"
import React,{useState} from 'react';
import Modal from '../components/Modal';

export default function ProductPage() {
    const[estadoModal,cambiarEstadoModal]=useState(false);
    return (
              
        <div>
            <SideNavBar/>
            <div className="container-work">

                    <ProductTablePublication />
                    {/* <div class="d-grid gap-2 p-5 ">
                        <button  onClick={()=>cambiarEstadoModal(!estadoModal)} type="button" class="btn btn-secondary btn-danger btn-block">Seleccionar Plataforma</button>
                    </div>
            
                    <Modal 	estado={estadoModal} cambiarEstado={cambiarEstadoModal}></Modal> */}
            </div>
        </div>
    )
}