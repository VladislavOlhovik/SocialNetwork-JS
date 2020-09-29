import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/dialogs-reducer';

const Dialogs = (props) => {
let state = props.store.getState().dialogsPage
let dialogsElements = state.dialogsData.map(el => <DialogItem name={el.name} id={el.id} />)
let messagesElement = state.messagesData.map(el => <Message message={el.message} />)
const addMessage=()=>{
    props.store.dispatch(addMessageActionCreator())
}
const onMessageChange=(e)=>{
    props.store.dispatch(updateNewMessageActionCreator(e.currentTarget.value))
}

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
                <div>
                    <textarea onChange={onMessageChange} placeholder='Enter your message' value={state.newMessageText}></textarea>
                </div>
                <div><button onClick={addMessage}>sent</button></div>
            </div>
        </div>
    )
}

export default Dialogs