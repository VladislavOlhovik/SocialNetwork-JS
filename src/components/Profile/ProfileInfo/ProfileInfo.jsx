import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus';



export const ProfileInfo = (props) => {
  if(!props.profile){
    return <Preloader/>
  }
  return (
    <div>
      {/* <div>
        <img className={s.img} src="https://gadgetmedics.com/wp-content/uploads/2020/01/illustration-geiranger.jpg" alt='img' />
      </div> */}
      <div className={s.descriptionBlock}>
        <div className={s.wrapper}>
          <span>
            <div>
              <img src={props.profile.photos.large ? props.profile.photos.large : userPhoto} alt="users" className={s.usersPhoto} />
            </div>
          </span>
          <span className={s.content}>
            <span>
              <div>{props.profile.fullName}</div>
              <div>{props.profile.lookingForAJobDescription ? props.profile.lookingForAJobDescription : 'no status'}</div>
            </span>
          </span>
        </div>
        <ProfileStatus status = {props.status} updateUserStatus={props.updateUserStatus}/>
      </div>
    </div>
  )
}