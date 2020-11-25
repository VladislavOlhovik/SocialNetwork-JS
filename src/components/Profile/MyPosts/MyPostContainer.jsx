import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../Redux/profile-reducer';
import { MyPost } from './MyPost';

const mapStateToProps = (state)=>{
  return{
    postdata: state.profilePage.postData
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    addPost: (newPost)=>dispatch(addPostActionCreator(newPost)),
  }
}

export const MyPostContainer = connect(mapStateToProps,mapDispatchToProps)(MyPost)
