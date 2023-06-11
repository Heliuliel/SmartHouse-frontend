import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'

export default function SignUp(props) {
    const nav = useNavigate()
    let familyArr = ['mother', 'father', 'son', 'daughter']
    const [surname, setSurname] = useState('')
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [kind, setKind] = useState('')
    const [arrOfFM, setArrOfFM] = useState([])

    let counter = 0
    const showOptions = () => {
        return familyArr.map((val) => { return <option>{val}</option> })
    }
    const addMF = () => {
        let temp = {
            name: name,
            kind: kind
        }
        if (kind == 0 || name.length == 0) {
            alert('Please fill all the fields')
        }
        else {
            setArrOfFM([...arrOfFM, temp])
        }
    }
    const checkInput = (input, field, min, max) => {
        let flag = true;
        if (input.length < min || input.length > max) {
            flag = false
            counter++
        }
        else {
            for (let i = 0; i < input.length; i++) {
                if ((input.charAt(i) < 'a' || input.charAt(i) > 'z') && (input.charAt(i) < 'A' || input.charAt(i) > 'Z') && input.charAt(i) != ' ') {
                    flag = false;
                    counter++
                    break;
                }
            }
        }
        if (flag == false && input.length != 0) {
            return <p style={{ color: 'red' }}>{field} must contain only letters between {min}-{max} characters</p>
        }

    }

    const signUpBtn = () => {
        if (counter > 0 || surname.length == 0 || city.length == 0 || arrOfFM.length == 0) {
            alert('error')
        }
        else {
            props.addFamily(surname, city, arrOfFM)
            nav('/')
        }
    }
    return (
        <div id='main'>
            <h1>Sign Up</h1>
            <label>Surname</label>
            <input className='element' onChange={(e) => setSurname(e.target.value)} type='text' placeholder='Enter surname' />
            {checkInput(surname, 'surname', 3, 15)}
            <label>City</label>
            <input className='element' onChange={(e) => setCity(e.target.value)} type='text' placeholder='Enter city' />
            {checkInput(city, 'city', 2, 12)}
            <div id='fm'>
                <label>Add family member</label>
                <input className='element' onChange={(e) => setName(e.target.value)} type='text' placeholder='name' />
                <select className='element' onChange={(e) => setKind(e.target.value)}>
                    <option ></option>
                    {showOptions()}
                </select>
                <button onClick={addMF}>Add</button>
            </div>
            <button className='element' onClick={signUpBtn}>Sign Up</button>
        </div>
    )
}
