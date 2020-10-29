import React from 'react';
import { ProfileInfo} from './ProfileInfo/ProfileInfo';
import { MyPostContainer } from './MyPosts/MyPostContainer';


export const Profile = (props) =>{ 
  debugger
    return(
        <div>
          <ProfileInfo profile = {props.profile}/>
          <MyPostContainer />
      </div>
    )
}