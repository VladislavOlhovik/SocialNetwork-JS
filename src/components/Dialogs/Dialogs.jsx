import React from 'react';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
let newMessageElement=React.createRef()
const addMessage=()=>{
    props.addMessage(props.dialogsPage.newMessageText)
}
const onMessageChange=()=>{
    props.updateNewMessageText(newMessageElement.current.value)
}

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.dialogsPage.dialogsData.map(el => {
                    return <DialogItem name={el.name} id={el.id} />
                })}
            </div>
            <div className={s.messages}>
                {props.dialogsPage.messagesData.map(el => {
                    return <Message message={el.message} />
                })}
                <textarea ref={newMessageElement} onChange={onMessageChange} value={props.dialogsPage.newMessageText}></textarea>
                <button onClick={addMessage}>sent</button>
            </div>
        </div>
    )
}

export default Dialogs