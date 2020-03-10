import './Nav.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import auth from '../../services/auth/auth'
import isAdmin from '../../services/auth/auth'


const logout = () =>{
    auth.fireAuth.signOut()
    sessionStorage.removeItem(auth.TOKEN_KEY)
    sessionStorage.removeItem(auth.ADMIN_TOKEN)
}



export default class Nav extends Component{

    render(){

        if(isAdmin.isAdmin()){
            return(
                <aside className="menu-area">
                    <nav className="menu">
                        <Link to="/home">
                            <i className="fa fa-home"> Inicio</i>
                        </Link>
                        <Link className="adminButton" to="/home/update">
                            <i className="fa fa-plus"> Adicionar Produto</i>
                        </Link>
                        <Link to="/" onClick={logout}>
                            <i className="fa fa-sign-out "> Saír</i>
                        </Link>
                    </nav>
                </aside>
            )
        }else{
            return(
                <aside className="menu-area">
                    <nav className="menu">
                        <Link to="/home">
                            <i className="fa fa-home"> Inicio</i>
                        </Link>
                        <Link to="/" onClick={logout}>
                            <i className="fa fa-sign-out "> Saír</i>
                        </Link>
                    </nav>
                </aside>
            )
        }
    }

}