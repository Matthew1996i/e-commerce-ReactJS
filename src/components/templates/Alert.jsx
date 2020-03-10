import React from 'react'
import './Alert.css'

export default props =>
    <div className={`alert alert-${props.alerType} mt-${props.top} ${props.display}`} role="alert">
        {props.message}
    </div>