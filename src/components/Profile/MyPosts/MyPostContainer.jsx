import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { addPostActionCreator } from '../../../Redux/profile-reducer';
import { MyPost } from './MyPost';

const mapStateToProps = (state)=>{
  return{
    postdata: state.profilePage.postData,
    profile: state.profilePage.profile,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    addPost: (newPost)=>dispatch(addPostActionCreator(newPost)),
    clearForm: ()=>dispatch(reset('post')),
  }
}

export const MyPostContainer = connect(mapStateToProps,mapDispatchToProps)(MyPost)
