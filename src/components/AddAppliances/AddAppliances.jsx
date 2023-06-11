import React, { useState } from 'react'
import './AddAppliances.css'
export default function AddAppliances(props) {
  const [select, setSelect] = useState('')
  let bathroom = ['dryer', 'water-heater']
  let bedroomOrLivingroom = ['light', 'TV', 'air-conditioner']
  let kitchen = ['mixer', 'oven', 'dish-washer']

  const addBtn = () => {
    if (select.length > 0) {
      props.addAppliances(select)
      props.setAppliances(!props.appliances)
    }
    else {
      alert('This is a required field')
    }
  }

  const showOptions = () => {
    if (props.type == 'bathroom') {
      return bathroom.map((val) => { return <option>{val}</option> })
    }
    else if (props.type == 'kitchen') {
      return kitchen.map((val) => { return <option>{val}</option> })
    }
    else {
      return bedroomOrLivingroom.map((val) => { return <option>{val}</option> })
    }
  }
  return (
    <div id='main'>
      <label>Choose an appliance</label>
      <select className='element' onChange={(e) => setSelect(e.target.value)}>
        <option ></option>
        {showOptions()}
      </select>
      <button onClick={addBtn}>Add</button>
    </div>
  )
}
