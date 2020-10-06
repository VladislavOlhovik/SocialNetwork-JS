import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/profile-reducer';
import StoreContext from '../../../StoreContext';
import { MyPost } from './MyPost';

export const MyPostContainer = (props) => { 
  
  return (
    <StoreContext.Consumer>{
      (store)=>{
        const state = store.getState()
        const addPost=() => {
          store.dispatch(addPostActionCreator())
        }
        const onPostChange=(e)=>{
          store.dispatch(updateNewPostTextActionCreator(e))
        }
          return <MyPost addPost={addPost}
                 updateNewPostText={onPostChange}
                 newPostText={state.profilePage.newPostText}
                 postdata={state.profilePage.postData}/>
      }
      }
    </StoreContext.Consumer>
  )
}