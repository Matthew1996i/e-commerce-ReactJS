import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCoins, FaShoppingCart } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'

import isAdmin from '../../services/auth/auth'
import './Header.css'


const Header = () => {

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleConfirm = () => setShow(false)
    
    const lista = useSelector(state => state.data)
    const header = useSelector(state => state)
    const dispatch = useDispatch()
    
    const removeItem = () => {
        dispatch({
            type: 'REMOVE_ITEM',
            count: 0
        })
    }
    if(isAdmin.isAdmin()){
        return(
            <header className="header d-none d-sm-flex flex-column">
                <h1 className=" text-white">
                    <i className={`fa fa-coin`}></i>
                </h1>
            </header>
        )
    }else{
        
        return(
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><FaShoppingCart color="#000" size="18px" className="mr-1"/>Carrinho</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Deseja finalizar seu pedido?</h6>
                        <hr/>
                        <p>Seu pedido: </p>
                        <ul id="modalList" className="list-group">
                            {(()=>{
                                if(lista.custo <= 0){
                                    return <p><strong>Nenhum produto</strong></p>
                                }else{
                                    return lista.itens.map((item, index) => {
                                        return <li className="list-group-item" key={index}>{item}</li>
                                    })
                                }
                            })()}
                        </ul>
                        <br/>
                        {(()=> {
                            if(lista.custo > 0){
                                return <button onClick={removeItem} className="btn btn-outline-info">Remover Tudo</button>
                            }
                        })()}
                        <hr/>
                        <h6>Valor do seu pedido: </h6>
                        <p><strong>{lista.custo}</strong> <FaCoins color="#FFD433" className="mr-2"/></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" variant="secondary" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button className="btn btn-outline-success" variant="primary" onClick={handleConfirm}>
                            Confirmar Compra
                        </button>
                    </Modal.Footer>
                </Modal>

                <header className="header d-none d-sm-flex flex-column">
                    <h1 className=" text-white">
                        <i className={`fa fa-coin`}></i>
                    </h1>
                    <div className="label-cart">
                        <p className="lead text-white"><FaCoins color="#FFD433" className="mr-2"/>{header.data.coin}</p>
                        <button onClick={handleShow} className="btn btn-primary" id="buttonCart"><FaShoppingCart color="#fff" size="18px" className="mr-1"/>{"Carrinho"}<span className="badge badge-light ml-1" id="cartValue">{header.count}</span></button>
                    </div>
                </header>
            </>
        )
    }
}

export default Header