import React, { Component } from 'react'
import Logo from '../../components/templates/Logo'
import './Login.css'
import Alert from '../../components/templates/Alert'
import auth from '../../services/auth/auth'
import { history } from '../../main/history'

export default class Login extends Component{
        
        constructor(props){
            super(props)
            
            this.state = { 
                email: '',
                password: '',
                error: '', 
            }
            

            this.getCredentials = this.getCredentials.bind(this)
            this.handleFormSubmit = this.handleFormSubmit.bind(this)
           
            
        }
        
        getCredentials(event){
            const {id, value} = event.target
            id === "emailInputLabel" ? this.setState({ email: value}) : this.setState({ password: value})
        }

        
        async doLogin(){
            const { email, password } = this.state
            
            this.setState({ error: ''})
            
            try{
                await auth.login(email, password)
                history.push('/home');
            }catch(err){
                 
                if(err.code === 'auth/wrong-password') this.setState({error: 'Senha Incorreta'})
                else if(err.code === 'auth/user-not-found') this.setState({error: 'Usuário não encontrado'})
                else if(err.code === 'auth/invalid-email') this.setState({error: 'Email inválido'})
                else if(err.message === 'Network Error') this.setState({ error: 'Erro ao se comunicar com a API' })
                else this.setState({ error: err.message })
            }
        }
        
        async handleFormSubmit(event){
            event.preventDefault()
            await this.doLogin()
        }

        render(){

            return(
                <div className="area-login">
                    <Logo className="logo"/>
                    <form onSubmit={this.handleFormSubmit}>
                        <Alert display={this.state.error ? 'show' : 'hide'} alerType="danger" message={this.state.error}/>
                        
                        <div className="form-group">
                            <label className="text-white" htmlFor="emailInputLabel">Email</label>
                            <input type="email" className="form-control" placeholder="Insira seu email" onChange={this.getCredentials} id="emailInputLabel" aria-describedby="emailHelp"/>
                        </div>
                        <div className="form-group">
                            <label className="text-white" htmlFor="inputPassword">Senha</label>
                            <input type="password" className="form-control" placeholder="Insira a Senha" onChange={this.getCredentials} id="inputPassword"/>
                        </div>
        
                        <button type="submit" className="btn btn-success">Acessar</button>
                        
                    </form>
                </div>
            )
        }
    
    }
    