import { connect } from 'react-redux';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/profile-reducer';
import { MyPost } from './MyPost';

const mapStateToProps = (state)=>{
  return{
    newPostText: state.profilePage.newPostText,
    postdata: state.profilePage.postData
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    updateNewPostText: (e)=>dispatch(updateNewPostTextActionCreator(e)),
    addPost: ()=>dispatch(addPostActionCreator())
  }
}

export const MyPostContainer = connect(mapStateToProps,mapDispatchToProps)(MyPost)
