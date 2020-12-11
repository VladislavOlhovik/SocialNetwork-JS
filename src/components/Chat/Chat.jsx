import React from 'react'
import s from './Chat.module.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import userPhoto from '../../assets/images/user.png'
import { useSelector } from 'react-redux'


const Chat = () => {
    const messagesBlockRef = useRef()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null)
    const userID = useSelector(state=>state.auth.id)

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
            messagesBlockRef.current && messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight)
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

    return (
        <div>
            <h3 className={s.header}>Chat</h3>
            <div className={s.messages} ref={messagesBlockRef}>
                {messages.map((m, i) => {
                    return (
                        <div key={i} className={`${s.wrapper} ${m.userId===userID?s.myMessage:''}`}>
                            <img src={m.photo?m.photo:userPhoto} alt="avatar" />
                            <div className={`${m.userId===userID?s.mySpeechbubble:s.speechbubble}`}>
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
                <input value={message} onChange={onChangeHandler} />
                <button onClick={sendMessage}>SEND</button>
            </div>
        </div>
    )
}

export default Chat