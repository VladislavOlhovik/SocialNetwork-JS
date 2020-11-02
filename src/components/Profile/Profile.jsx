import React from 'react';
import { ProfileInfo} from './ProfileInfo/ProfileInfo';
import { MyPostContainer } from './MyPosts/MyPostContainer';


export const Profile = (props) =>{ 
    return(
        <div>
          <ProfileInfo profile = {props.profile}/>
          <MyPostContainer />
      </div>
    )
}