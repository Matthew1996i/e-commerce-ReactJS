import React, { Fragment, Component } from 'react'
import CrudLoja from '../../services/realtime/lojaCrudItens'
import Alert from '../../components/templates/Alert'
import ProgressBar from '../../components/templates/ProgressBar'
import firebaseService from '../../services/auth/authFirebase'
import { history } from '../../main/history'


const initialState = { 
    name: '',
    price: '',
    amount: '',
    imgReference: null,
    error: {
        alertType: '',
        typeDisplay: 'hide',
        message: ''
    },
    progressPercent: 0,
    display: 'hide'

}

export default class UpdateItens extends Component{

    constructor(props){
        super(props)

        this.state = {...initialState }

        this.getValue = this.getValue.bind(this)
        this.cadastrar = this.cadastrar.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }


    getValue(event){
        const {id, value} = event.target
        if(id === 'nameProd'){
            this.setState({ name: value })
        }else if(id === 'price'){
            this.setState({ price: value })
        }else if(id === 'amount'){
            this.setState({ amount: value })
        }
    }

    async cadastrar(event){
        event.preventDefault()
        this.inserir()
    }

    inserir(){
        const { name, price, amount, imgReference } = this.state

        try{
            if(!name){
                this.setState({
                    error:{
                        alertType: 'danger',
                        typeDisplay: 'show',
                        message: 'Não é possivel cadastrar um novo produto sem nome'
                    }
                })                
            }else if(!price){
                this.setState({
                    error:{
                        alertType: 'danger',
                        typeDisplay: 'show',
                        message: 'Não é possivel cadastrar um novo produto sem valor'
                    }
                })
            }else if(amount <= 0){
                this.setState({
                    error:{
                        alertType: 'danger',
                        typeDisplay: 'show',
                        message: 'Produto sem quantidade'
                    }
                })
            }else if(imgReference === null){
                this.setState({
                    error:{
                        alertType: 'danger',
                        typeDisplay: 'show',
                        message: 'Favor inserir uma imagem'
                    }
                })
            }else{
                CrudLoja.newItem(name, price, amount, imgReference)
                
                this.setState({
                    error:{
                        alertType: 'success',
                        typeDisplay: 'show',
                        message: 'Produto cadastrado com sucesso.'
                    },
                })

                history.push("/home")

                
            }
        }catch(err){
            this.setState({
                error: {
                    alertType: 'danger',
                    typeDisplay: 'show',
                    message: 'Erro ao Cadastrar novo item ' + {err}
                },
            })
            console.log(err)
        }
        
    }

    async uploadFile(e){
        const file = e.target.files[0]
        const refArchive = `images/${ Date.now() + file.name}`
        const storageRef = firebaseService.storage().ref(refArchive)
        const task = storageRef.put(file)
        
        

        task.on('state_changed', snapshot =>{
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                progressPercent: percentage,
            })
        })

        await task.then(resp => {
            if(resp.state === "success"){
                const storageRefs = firebaseService.storage().ref()
                const forestRef = storageRefs.child(refArchive)
            
                forestRef.getDownloadURL().then(resp => {
                    
                    this.setState({
                        imgReference: resp,
                        display: 'show'
                    })  
                })
            }
        })
        
    }


    render(){
        return(
            <Fragment>
                <h1>Adicionar Produto</h1>
                <Alert top="0" 
                        id="updateMessage" 
                        alerType={this.state.error.alertType} 
                        display={this.state.error.typeDisplay} 
                        message={this.state.error.message}/>
                        
                <form onSubmit={this.cadastrar}>
                    <div className="form-group">
                        <label htmlFor="nameProd">Nome do produto</label>
                        <input onChange={this.getValue} type="text" className="form-control" id="nameProd" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Preço</label>
                        <input onChange={this.getValue} type="number" className="form-control" id="price" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Quantidade</label>
                        <input onChange={this.getValue} type="number" className="form-control" id="amount"/>
                    </div>
                    <ProgressBar id="progress" percent={this.state.progressPercent} display={this.state.display}/>
                    <div className="form-group">
                        <input onChange={this.uploadFile} type="file" accept="image/png, image/jpeg, image/jpg"/>
                    </div>
                        
                    <button type="submit" className={`btn btn-primary ${this.state.progressPercent < 100 ? 'hide' : 'show'}`}>Cadastrar</button>
                </form>
            </Fragment>
        )
    }


}



