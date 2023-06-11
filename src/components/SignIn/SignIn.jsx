import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './SignIn.css'
export default function SignIn(props) {
    const [surname, setSurname] = useState('')
    const nav = useNavigate()

    const findFamily = () => {
        if (surname.length < 1) {
            alert('This is a required field')
        }
        else {
            fetch('/findfamily', {
                headers: {
                    "Content-Type": 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    surname
                })
            }).then((res) => { return res.json() }).then((data) => {
                if (data.messege == 'not found') {
                    alert('Family do not exist')
                }
                else {
                    props.setFamily(data)
                    nav('/' + data.surname)
                }
            })
        }
    }
    return (
        <div id='main'>
            <h1>SMART HOUSE</h1>
            <input className='element' onChange={(e) => setSurname(e.target.value)} type='text' placeholder='Enter surname' required />
            <button className='element' onClick={findFamily}>Sign In</button>
            <p>New account? <Link to={'/signup'}>Sign up</Link></p>
        </div>
    )
}
