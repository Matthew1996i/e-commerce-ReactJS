import React from 'react'
import './ProgressBar.css'

export default props =>
    <div className={`progress mb-2 ${props.display}`}>
        <div className="progress-bar" role="progressbar" style={{width: + props.percent + '%'}} aria-valuenow={props.percent} aria-valuemin="0" aria-valuemax="100"></div>
    </div>