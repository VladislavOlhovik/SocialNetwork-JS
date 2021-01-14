import Dialogs from './Dialogs'
import { addMessageActionCreator } from '../../Redux/dialogs-reducer';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { reset } from 'redux-form';

const mapStateToProps = (state)=>{
    return{
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        addMessage: (newMessageBody)=>dispatch(addMessageActionCreator(newMessageBody)),
        clearForm: ()=>dispatch(reset('dialogAddMassage')),
    }
}

const DialogsContainer = compose(
    connect(mapStateToProps,mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

export default DialogsContainer