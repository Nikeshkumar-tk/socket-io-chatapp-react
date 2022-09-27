
import './App.css';
import io from 'socket.io-client'
import JoinRoom from './components/joinRoom/JoinRoom';
import { useState } from 'react';
import Chats from './components/chats/Chats';


const socket = io("https://socketio-chat-app-1.herokuapp.com/")

function App() {

  const [userName,setUserName] = useState('')
  const [roomId,setRoomId] = useState('')
  const [showChat,setShowChat] = useState(false)
  

  const joinRoom = () =>{

    if(userName !== "" && roomId !== ""){
      socket.emit('joinRoom',roomId)
      setShowChat(true)
    }

  }
  
  return (
    <div>
{ !showChat?
<JoinRoom setUserName={setUserName} setRoomId={setRoomId} joinRoom = {joinRoom}/>
     :<Chats socket = {socket} userName = {userName} roomId = {roomId}/>
}
    </div>
  );
}

export default App;
