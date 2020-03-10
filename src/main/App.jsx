import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React, { Component } from 'react'
import Routes from './Routes'
import { Provider } from 'react-redux'
import store from '../store'


export default class App extends Component{

    render(){
        return(
            <div className="app">
                <Provider store={store}>
                    <Routes />
                </Provider>
            </div>
        )
    }
}
    

