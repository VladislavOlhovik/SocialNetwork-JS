import React from 'react';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
let newMessageElement=React.createRef()
const addMessage=()=>{
    alert(newMessageElement.current.value)
}
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.state.dialogsData.map(el => {
                    return <DialogItem name={el.name} id={el.id} />
                })}
            </div>
            <div className={s.messages}>
                {props.state.messagesData.map(el => {
                    return <Message message={el.message} />
                })}
                <textarea ref={newMessageElement}></textarea>
                <button onClick={addMessage}>sent</button>
            </div>
        </div>
    )
}

export default Dialogs