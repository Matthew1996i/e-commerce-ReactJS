import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'


import Alert from '../../components/templates/Alert'
import ProgressBar from '../../components/templates/ProgressBar'

import crudLoja from '../../services/realtime/lojaCrudItens'
import firebaseService from '../../services/auth/authFirebase'
import { history } from '../../main/history'
import lojaCrudItens from '../../services/realtime/lojaCrudItens'

const EditItens = props => {
    const edit = useSelector(state => state.toEdit)

    if(!edit.name){
        history.push('/home')
    }
    
    const [ itemEdit, setEdit ] = useState({ 
        ...edit, 
        newImage: edit.image
    })

    const [ message, setMessage ] = useState({
        error: {
            typeDisplay: 'show'
        }
    })

    const [ progressBar, setProgressbar ] = useState({
        percent: 0,
        display: 'hide',
        displayButton: 'show'
    })

    const inserir = (e) =>{
        e.preventDefault()

        const { id, name, price, storage, newImage } = itemEdit

        try{
            if(!name){
                setMessage({
                    error: {
                        alertType: 'danger',
                        typeDisplay: 'show',
                        message: 'Não é possivel cadastrar um novo produto sem nome'
                    }
                })          
            }else if(!price){
                setMessage({
                    error:{
                        alertType: 'danger',
                        typeDisplay: 'show',
                        message: 'Não é possivel cadastrar um novo produto sem valor'
                    }
                })
            }else if(storage <= 0){
                setMessage({
                    error:{
                        alertType: 'danger',
                        typeDisplay: 'show',
                        message: 'Produto sem quantidade'
                    }
                })
            }else if(newImage === null){
                setMessage({
                    error:{
                        alertType: 'danger',
                        typeDisplay: 'show',
                        message: 'Favor inserir uma imagem'
                    }
                })
            }else{
                crudLoja.updateItem(id, name, price, storage, newImage )
                
                setMessage({
                    error:{
                        alertType: 'success',
                        typeDisplay: 'show',
                        message: 'Produto cadastrado com sucesso.'
                    },
                })

                history.push("/home")
            }
        }catch(err){
            setMessage({
                error: {
                    alertType: 'danger',
                    typeDisplay: 'show',
                    message: 'Erro ao editar novo item ' + err
                },
            })
        }
        
    }

    const uploadFile = async (e) => {
        lojaCrudItens.deleteImg(edit.image)

        const file = e.target.files[0]
        const refArchive = `images/${ Date.now() + file.name}`
        const storageRef = firebaseService.storage().ref(refArchive)
        const task = storageRef.put(file)

        task.on('state_changed', snapshot =>{
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgressbar({
                ...progressBar,
                percent: percentage,
                display: 'show',
                displayButton: 'show'
            })
        })

        await task.then(resp => {
            if(resp.state === "success"){
                const storageRefs = firebaseService.storage().ref()
                const forestRef = storageRefs.child(refArchive)
            
                forestRef.getDownloadURL().then(resp => {
                    setProgressbar({
                        ...progressBar,
                        displayButton: 'show'
                    })
                    setEdit({
                        ...itemEdit,
                        newImage: resp
                    })
                })
            }
        })
    }
        
    

    const getValue = (event) => {
        const { id, value } = event.target
        
        if(id === 'nameProd'){
            return setEdit({
                ...itemEdit,
                name: value
            })
        }else if(id === 'price'){
            return setEdit({
                ...itemEdit,
                price: value
            })
        }else{
            return setEdit({
                ...itemEdit,
                storage: value
            })
        }
    }


    return(
        <Fragment>
            <h1>{edit.name}</h1>
            <Alert top="0" 
                    id="updateMessage" 
                    alerType={message.error.alertType} 
                    display={message.error.typeDisplay} 
                    message={message.error.message}/>
                    
            <form onSubmit={inserir}>
                <div className="form-group">
                    <label htmlFor="nameProd">Nome do produto</label>
                    <input onChange={getValue} value={itemEdit.name} type="text" className="form-control" id="nameProd" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Preço</label>
                    <input onChange={getValue} value={itemEdit.price} type="number" className="form-control" id="price" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Quantidade</label>
                    <input onChange={getValue} value={itemEdit.storage} type="number" className="form-control" id="amount"/>
                </div>
                <ProgressBar id="progress" percent={progressBar.percent} display={progressBar.display}/>
                <div className="form-group">
                    <label htmlFor="amount">Imagem anterior</label><br/>
                    <img src={itemEdit.image} alt="Imagem anterior"/><br/> <br />
                    <input onChange={uploadFile} type="file" accept="image/png, image/jpeg, image/jpg" id="imgName"/>
                </div>
                    
                <button type="submit" className={`btn btn-success ${progressBar.displayButton}`}>Alterar</button>
            </form>
        </Fragment>
    )

}

export default EditItens

