import { useEffect } from 'react'
import { useState } from 'react'
import './Chats.css'
import ScrollToBottom from "react-scroll-to-bottom";

const Chats = ({userName,roomId,socket}) => {

    const [message,setMessage] = useState("")
    const [receivedMessage,setReceivedMessage] = useState([])
  



    //Function to send message

    const sendMessage = async () => {
       

        if(message !== ""){
            const messageData = {
                roomId: roomId,
                author: userName,
                message:message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

            }
            await socket.emit("send_message",messageData)
            setReceivedMessage((messages) => [...messages,messageData])

        }
    }

    useEffect(() => {
        
        socket.on("receive_message",(data) => {
            
            
            
            setReceivedMessage((message) => [...message,data])
            
        })
      

    },[socket])

  return (
    <div className='chat-wrap'>
        <div className='chat-inner'>

        {/* Chat header */}
        <div className='chat-header'>
                <h1>NiK CHaT</h1>
                <h5>User : {userName}</h5>
        </div>

        {/* chat body */}
        <div className='chat-body'>
<ScrollToBottom className='message-container'>

                {   
                    receivedMessage.map((messages) => {
                        return (
                            <div>
                        {messages.author === userName ?
                            <div className='message-wrap-sender'>
                                <div className='sender'>
                            <h6>you</h6>
                            <h3 >{ messages.message}</h3>
                                </div>
                           </div>:
                           <div className='message-wrap-receiver'>
                            <div className='receiver'>
                            <h6>{messages.author}</h6>
                           <h3 >{messages.message}</h3>
                            </div>
                          </div>
                          }
                           
                            </div>
                        )
                    })
                }

</ScrollToBottom>
            
        </div>

        {/* chat footer/input area */}
        <div className='chat-footer'>
            <input type="text" placeholder='Enter message' onChange={(e) => setMessage(e.target.value)}/>
            <i className="send-icon fa-solid fa-paper-plane" onClick={sendMessage}></i>
        </div>
        </div>
    </div>
  )
}

export default Chats