import React, { Component } from 'react'
import Main from '../../components/templates/Main'
import Logo from '../../components/templates/Logo'
import Nav from '../../components/templates/Nav'
import Footer from '../../components/templates/Footer'
import './Home.css'
import UpdateItens from '../register/Register'
import Edit from '../edit/Edit'
import Dashboard from '../dashboard/Dashboard'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { history } from '../../main/history'
import isAdmin from '../../services/auth/auth'


const PrivateRoute = props => isAdmin.isAdmin() ? <Route {...props}/> : <Redirect to='/home' />

export default class Home extends Component{

    render(){
        return(
            <React.Fragment>
                <Logo/>
                <Main className="MainContent" icon="home" title=" Dashboard" coin={1500} cart={`${5} itens`}>
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path='/home/update' component={UpdateItens} />
                            <PrivateRoute exact path='/home/edit' component={Edit} />
                            <Route exact path='/home' component={Dashboard} />
                            <Redirect from='*' to='/home' />
                        </Switch>
                    </Router>    
                </Main>
                <Nav/>
                <Footer/>
            </React.Fragment>
        )
    
    }
}

