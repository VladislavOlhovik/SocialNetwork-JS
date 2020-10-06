import React from 'react';
import Dialogs from './Dialogs'
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/dialogs-reducer';
import StoreContext from '../../StoreContext';

export const DialogsContainer = (props) => {

    return (
        <StoreContext.Consumer>{
            (store)=>{
                const state = store.getState().dialogsPage
                const addMessage=()=>{
                    store.dispatch(addMessageActionCreator())
                }
                const onMessageChange=(e)=>{
                     store.dispatch(updateNewMessageActionCreator(e))
                }
                return <Dialogs state={state}
                    updateNewMessage={onMessageChange}
                    addMessage={addMessage}/>
            }
        }
        </StoreContext.Consumer>
 )
}