import React from 'react';
import s from './Profile.module.css';
import { MyPost } from './MyPosts/MyPost';
import { ProfileInfo} from './ProfileInfo/ProfileInfo';


export const Profile = (props) =>{
 
    return(
        <div>
          <ProfileInfo/>
          <MyPost postdata={props.profilePage.postData} 
                  newPostText={props.profilePage.newPostText}
                  addPost={props.addPost}
                  updateNewPostText={props.updateNewPostText} />
      </div>
    )
}