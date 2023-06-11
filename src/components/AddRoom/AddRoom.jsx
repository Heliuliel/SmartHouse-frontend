import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './AddRoom.css'
let roomsOptions = []
export default function AddRoom(props) {

    let colors = ['beige', 'pink', 'blue', 'green', 'grey']
    const nav = useNavigate()
    const [type, setType] = useState('')
    const [color, setColor] = useState('')
    const createRoomOption = () => {
        roomsOptions = ["kitchen", "bathroom", "living room", "master bedroom"]
        props.family.fm.forEach((val) => {
            if (val.kind != 'mother' && val.kind != 'father') {
                roomsOptions.push(`${val.name}'s bedroom`)
            }
        })
    }
    const showOption = () => {
        return roomsOptions.map((val) => { return <option>{val}</option> })
    }
    const showColors = () => {
        return colors.map((val) => { return <option style={{ backgroundColor: val }}>{val}</option> })
    }
    const addBtn = () => {
        if (type.length > 0 && color.length > 0) {
            props.addRoom(type, color)
            console.log(roomsOptions);
            nav('/' + props.family.surname)

        }
        else {
            alert('Please fill all the fields')
        }
    }
    return (
        <div id='main'>
            {createRoomOption()}
            <h1>Create new room</h1>
            <label>What type of room whold you like to create?</label>
            <select className='element' onChange={(e) => setType(e.target.value)}>
                <option></option>
                {showOption()}
            </select>
            <label>choose the color of the  room</label>
            <select className='element' onChange={(e) => setColor(e.target.value)}>
                <option></option>
                {showColors()}
            </select>
            <button onClick={addBtn}>Add room</button>
            <Link to={'/' + props.family.surname}><button>Back</button></Link>

        </div>
    )
}
