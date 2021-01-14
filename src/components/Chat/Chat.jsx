import React from 'react'
import s from './Chat.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import userPhoto from '../../assets/images/user.png'
import { useSelector } from 'react-redux'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import { NavLink } from 'react-router-dom'


const Chat = () => {
    const messagesBlockRef = useRef()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null)
    const userID = useSelector(state => state.auth.id)

    useEffect(() => {
        const socket = new WebSocket('wss://social-network.samuraijs.com/handlers/chatHandler.ashx')
        setSocket(socket)
        return () => {
            socket.onclose = function () {
            }
        }
    }, [])
    if (socket) {
        socket.onmessage = function (event) {
            setMessages([...messages, ...JSON.parse(event.data)])
            messagesBlockRef.current &&
                messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight)
        }
    }
    const onChangeHandler = (e) => {
        setMessage(e.currentTarget.value)
    }
    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.send(message)
            setMessage('')
        }
    }
    const onKeyPressHandler = (event) => {
        if(event.ctrlKey&&event.charCode===13){
            sendMessage()
        }
    }

    return (
        <div className={s.block}>
            <h3>Chat</h3>
            <div className={s.messages} ref={messagesBlockRef}>
                {messages.map((m, i) => {
                    return (
                        <div key={i} className={`${s.wrapper} ${m.userId === userID ? s.myMessage : ''}`}>
                            <NavLink to={'/profile/' + m.userId}>
                                <img src={m.photo ? m.photo : userPhoto} alt="avatar" />
                            </NavLink>
                            <div className={`${m.userId === userID ? s.mySpeechbubble : s.speechbubble}`}>
                                <div className={s.name}>
                                    <div>{m.userName}</div>
                                </div>
                                <div className={s.message}>{m.message}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={s.inputss}>
                <textarea placeholder='Enter your message...' 
                          value={message} onKeyPress={onKeyPressHandler} 
                          onChange={onChangeHandler} />
                <button onClick={sendMessage}>SEND</button>
            </div>
        </div>
    )
}

export default WithAuthRedirect(Chat)