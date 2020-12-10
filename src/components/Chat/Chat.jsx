import React from 'react'
import s from './Chat.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

const Chat = () => {
    const messagesBlock = useRef()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null)

    const onChangeHandler = (e) => {
        setMessage(e.currentTarget.value)
    }
    useEffect(() => {
        const socket = new WebSocket('wss://social-network.samuraijs.com/handlers/chatHandler.ashx')
        setSocket(socket)
    },[])
    if(socket){
    socket.onmessage = function (event) {
        setMessages([...messages, ...JSON.parse(event.data)])
        messagesBlock.current.scrollTo(0, document.body.scrollHeight)
    }}
    const sendMessage = () => {
        socket.send(message)
        setMessage('')
    }

    return (
        <div>
            <h3>Chat</h3>
            <div className = {s.messages} ref={messagesBlock}>
                {messages.map(( m, i ) => {
                    return (
                    <div key={i}>
                        <b>{m.userName}</b> - {m.message}
                    </div>
                    )
                })}
            </div>
            <textarea value={message} onChange={onChangeHandler}/>
            <button onClick={sendMessage}>SEND</button>
        </div>
    )
}

export default Chat