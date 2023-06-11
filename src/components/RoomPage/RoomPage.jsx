import React, { useState } from 'react'
import AddAppliances from '../AddAppliances/AddAppliances'
import Appliance from '../Appliance/Appliance'
import { Link } from 'react-router-dom'
import './RoomPage.css'

export default function RoomPage(props) {
    const[appliances,setAppliances] = useState(true)
  return (
    <div style={{backgroundColor:props.chosenRoom.color}}>
        <h1>{props.chosenRoom.type}</h1>
        <AddAppliances addAppliances={props.addAppliances} setAppliances={setAppliances} appliances={appliances} type={props.chosenRoom.type}/>
        <h3>List of appliances</h3>
        <div id='applinces'>
        {props.chosenRoom.appliances.map((val,i)=>{return <Appliance details={val} i={i} changeStatus={props.changeStatus}/> })}

        </div>
        <Link to={'/'+props.family.surname}><button>Back</button></Link>
        
    </div>
  )
}
