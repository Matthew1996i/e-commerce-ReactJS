import React from 'react'
import './Card.css'
import { FaCoins } from 'react-icons/fa'
import { FiPackage } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import { history } from '../../main/history'
import isAdmin from '../../services/auth/auth'
import CrudLoja from '../../services/realtime/lojaCrudItens'


const Card = props => {

    const card = useSelector(state => state.data)
    const dispatch = useDispatch()

    function addCart(e){
        if(card.coin < e.target.value){
            return
        }else{
            dispatch({
                type: 'ADD_CART_VALUE',
                value: e.target.value, 
                item: e.target.name
            })
        }
        
    }

    const editarProd = (itemToEdit) =>{
        history.push(`/home/edit`)
        
        dispatch({
            type: 'EDIT_ITEM',
            edit: itemToEdit
        })
    }

    const deleteProd = (id, storage) => {
        CrudLoja.deleteItem( id, storage )
    }

    if(isAdmin.isAdmin()){
        
        return(
            <div className="card m-2 " style={{ width: 12 +"rem" }}>
                <img src={props.img} className="card-img-top cardImage" alt="..."/>
                <div className="card-body cardArea">
                    <h5 className="card-title">{props.nameProd}</h5>
                    <OverlayTrigger placement='left-end' overlay={<Tooltip >Preço! </Tooltip>}>
                        <p className="card-text"><FaCoins color="#FFD433" className="mr-1"/>{props.price}</p>
                    </OverlayTrigger>
                    <OverlayTrigger placement='left-end' overlay={<Tooltip >Estoque! </Tooltip>}>
                        <p style={{fontSize: 1 +"em"}} className="card-text"><FiPackage color="#B47800" /> {props.storage}</p>
                    </OverlayTrigger>
                    <div className="containerButton">
                        <button onClick={() => {editarProd({ 
                            id: props.id,
                            image: props.img,
                            name: props.nameProd,
                            price: props.price,
                            storage: props.storage,

                        })}} className="btn btn-warning mt-1 mr-1 edit">Editar</button>
                        <button onClick={() => {deleteProd(props.id, props.img)}} className="btn btn-danger mt-1 edit">Excluir</button>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="card m-2 " style={{width: 12 +"rem"}}>
                <img src={props.img} className="card-img-top cardImage" alt="..."/>
                <div className="card-body cardArea">
                    <h5 className="card-title">{props.nameProd}</h5>
                    <OverlayTrigger placement='left-end' overlay={<Tooltip >Preço! </Tooltip>}>
                        <p className="card-text"><FaCoins color="#FFD433" className="mr-1"/>{props.price}</p>
                    </OverlayTrigger>
                    <OverlayTrigger placement='left-end' overlay={<Tooltip >Estoque! </Tooltip>}>
                        <p style={{fontSize: 1 +"em"}} className="card-text"><FiPackage color="#B47800" /> {props.storage}</p>
                    </OverlayTrigger>
                    {(() => {
                        if(props.storage > 0){
                           return <button onClick={addCart} name={props.nameProd} value={props.price} className="btn btn-success addCart">Adicionar ao Carrinho</button>
                        }else{
                            return <p className="addCart">Produto Indisponivel!</p>
                        }
                    })()}
                </div>
            </div>
        )
    }
}

export default Card
