import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Room from '../Room/Room'
import './HomePage.css'
export default function HomePage(props) {
    const [flag, setFlag] = useState(false)
    const checkStatus = () => {
        if (props.family.rooms.length == 0) {
            return <p>You have not added rooms yet. Click the button to start.</p>
        }
    }
    const showDetails = () => {
        if (flag == true) {
            return <div id='details'>
                <p>City: {props.family.city}</p>
                <p>Family members: </p>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>Kind</td>
                    </tr>
                    {props.family.fm.map((val) => {
                        return <tr>
                            <td>{val.name}</td>
                            <td>{val.kind}</td>
                        </tr>
                    })}
                </table>
            </div>
        }
    }
    return (
        <div>
            <h1>Welcome {props.family.surname} family</h1>
            <h3 onClick={() => setFlag(!flag)}>Show family details</h3>
            {showDetails()}
            {checkStatus()}
            <Link to={'/addroom'}> <button id='plus'>+</button></Link>
            <div id='rooms'>
            {props.family.rooms.map((val, i) => { return <Room details={val} i={i} chosenR={props.chosenR} surname={props.family.surname} /> })}

            </div>
        </div>
    )
}
