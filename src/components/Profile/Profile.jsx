import React from 'react';
import { ProfileInfo} from './ProfileInfo/ProfileInfo';
import { MyPostContainer } from './MyPosts/MyPostContainer';


export const Profile = (props) =>{ 
    return(
        <div>
          <ProfileInfo profile = {props.profile}
                       status = {props.status}
                       isOwner = {props.isOwner}
                       savePhoto={props.savePhoto}
                       updateUserStatus={props.updateUserStatus}/>
          <MyPostContainer />
      </div>
    )
}