import Dialogs from './Dialogs'
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../Redux/dialogs-reducer';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';

const mapStateToProps = (state)=>{
    return{
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        updateNewMessage: (e)=>dispatch(updateNewMessageActionCreator(e)),
        addMessage: ()=>dispatch(addMessageActionCreator())
    }
}


export const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(WithAuthRedirect(Dialogs))