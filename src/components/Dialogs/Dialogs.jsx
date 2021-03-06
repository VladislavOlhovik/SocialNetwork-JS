import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validator';

const Dialogs = (props) => {
let dialogsElements = props.dialogsPage.dialogsData.map(el => <DialogItem key={el.id} name={el.name} id={el.id} />)
let messagesElement = props.dialogsPage.messagesData.map(el => <Message key={el.id} message={el.message} />)
const addMessage=(dataForm)=>{
    props.addMessage(dataForm.newMessageBody)
    props.clearForm()
}
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
                <AddMessageReduxForm onSubmit={addMessage}/>
            </div>
        </div>
    )
}
const maxLength = maxLengthCreator(15)
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} 
                       placeholder='Enter your message' 
                       validate={[required, maxLength]}
                       name='newMessageBody'/>
            </div>
            <div>
                <button>sent</button>
            </div>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({form: 'dialogAddMassage'})(AddMessageForm)

export default Dialogs