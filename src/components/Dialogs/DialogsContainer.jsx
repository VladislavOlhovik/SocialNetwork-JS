import Dialogs from './Dialogs'
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/dialogs-reducer';
import { connect } from 'react-redux';

const mapStateToProps = (state)=>{
    return{
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updateNewMessage: (e)=>dispatch(updateNewMessageActionCreator(e)),
        addMessage: ()=>dispatch(addMessageActionCreator())
    }
}


export const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)