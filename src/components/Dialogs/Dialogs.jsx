import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
let dialogsElements = props.dialogsPage.dialogsData.map(el => <DialogItem key={el.id} name={el.name} id={el.id} />)
let messagesElement = props.dialogsPage.messagesData.map(el => <Message key={el.id} message={el.message} />)
const addMessage=()=>{
    props.addMessage()
}
const onMessageChange=(e)=>{
    props.updateNewMessage(e.currentTarget.value)
}

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
                <div>
                    <textarea onChange={onMessageChange} placeholder='Enter your message' value={props.dialogsPage.newMessageText}></textarea>
                </div>
                <div><button onClick={addMessage}>sent</button></div>
            </div>
        </div>
    )
}

export default Dialogs