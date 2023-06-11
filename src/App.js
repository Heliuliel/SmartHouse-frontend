import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { useEffect, useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import AddRoom from './components/AddRoom/AddRoom';
import RoomPage from './components/RoomPage/RoomPage';

function App() {
  const [arrOfFamilies, setArrOfFamilies] = useState([])
  const [familiesFlag, setFamiliesFlag] = useState(true)

  const [family, setFamily] = useState('')
  const [familyFlag, setFamilyFlag] = useState(true)

  const [chosenRoom, setChosenRoom] = useState('')
  const [roomFlag, setRoomFlag] = useState(true)

  useEffect(() => {
    fetch('/getallfamilies').then((res) => { return res.json() }).then((data) => {
      setArrOfFamilies(data)
      setFamily(family)
    })
  }, [familiesFlag])

  useEffect(() => {
    fetch('/getcurrentfamily').then((res) => { return res.json() }).then((data) => {
      setFamily(data)
    })
  }, [familyFlag])

  useEffect(() => {
    fetch('/getroom').then((res) => { return res.json() }).then((data) => {
      console.log('work');
      setChosenRoom(data)
    })
  }, [roomFlag])

  const addFamily = (surname, city, fm) => {
    fetch('/addfamily', {
      headers: {
        "Content-Type": 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        surname,
        city,
        fm
      })
    }).then((res) => { return res.json() }).then((data) => {
      console.log(data);
      if (data == 'added') {
        setFamiliesFlag(!familiesFlag)
      }
    })
  }

  const addRoom = (type, color) => {
    fetch('/addroom', {
      headers: {
        "Content-Type": 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        type,
        color
      })
    }).then((res) => { return res.json() }).then((data) => {
      console.log(data);
      setFamily(data)
      setFamiliesFlag(!familiesFlag)
      setFamilyFlag(!familyFlag)
      console.log(arrOfFamilies);
    })
  }

  const chosenR = (i) => {
    fetch('/getcurrentroom', {
      headers: {
        "Content-Type": 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        i: i
      })
    }).then((res) => { return res.json() }).then((data) => {
      setChosenRoom(data)
      console.log(data);
      setRoomFlag(!roomFlag)
      console.log(chosenRoom);
    })
  }
  
  const addAppliances = (choose) => {
    fetch('/addapplince', {
      headers: {
        "Content-Type": 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        choose,
        status: false
      })
    }).then((res) => { return res.json() }).then((data) => {
      setChosenRoom(data.currentRoom)
      setFamily(data.currentFamily)
      setFamiliesFlag(!familiesFlag)
      setFamilyFlag(!familyFlag)
      setRoomFlag(roomFlag)

    })
  }

  const changeStatus = (i) => {
    let tempChosenRoom = chosenRoom
    let newStatus = !tempChosenRoom.appliances[i].status
    console.log(newStatus);
    fetch('/changestatus', {
      headers: {
        "Content-Type": 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        i,
        status: newStatus
      })
    }).then((res) => { return res.json() }).then((data) => {
      setFamiliesFlag(!familiesFlag)
      setFamilyFlag(!familyFlag)
      setRoomFlag(roomFlag)
      setChosenRoom(data.currentRoom)
      setFamilyFlag(data.currentFamily)
    })
  }
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn arrOfFamilies={arrOfFamilies} setFamily={setFamily} />} />
          <Route path='/signup' element={<SignUp addFamily={addFamily} />} />
          <Route path={'/' + family.surname} element={<HomePage family={family} chosenR={chosenR} />} />
          <Route path='/addroom' element={<AddRoom family={family} addRoom={addRoom} />} />
          <Route path={'/' + family.surname + '/' + chosenRoom.type} element={<RoomPage family={family} chosenRoom={chosenRoom} addAppliances={addAppliances} changeStatus={changeStatus} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
