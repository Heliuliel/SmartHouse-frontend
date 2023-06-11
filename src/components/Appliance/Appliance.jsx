import React, { useState } from 'react'
import './Appliance.css'
export default function Appliance(props) {
    const [flag, setFlag] = useState(true)
    let color
    if (props.details.status == false) {
        color = 'red'
    }
    else {
        color = 'green'
    }

    return (
        <div id='app' onClick={() => { props.changeStatus(props.i); setFlag(!flag) }} style={{ backgroundColor: color }}>
            <p>{props.details.type}</p>
        </div>
    )
}
