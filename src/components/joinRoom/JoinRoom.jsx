import React from 'react'
import './JoinRoom.css'

const JoinRoom = ({setUserName,setRoomId,joinRoom}) => {
  return (
    <div className='join-room-wrap'>
        <div className='join-room-inner'>
            <div>

            <input type="text" placeholder='Enter your name' onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
            <input type="text" placeholder='Enter ROOM ID' onChange={(e) =>setRoomId(e.target.value)}/>
            </div>
            <button onClick={() => joinRoom()}>Join A Room</button>
        </div>
    </div>
  )
}

export default JoinRoom