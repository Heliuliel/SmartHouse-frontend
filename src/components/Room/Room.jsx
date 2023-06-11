import React from 'react'
import { Link } from 'react-router-dom'
import './Room.css'
export default function Room(props) {
    return (
        <Link  to={'/' + props.surname + '/' + props.details.type}>
            <div id='room' onClick={() => { props.chosenR(props.i) }} style={{ backgroundColor: props.details.color }}>
                <p>{props.details.type}</p>

            </div>
        </Link>
    )
}
