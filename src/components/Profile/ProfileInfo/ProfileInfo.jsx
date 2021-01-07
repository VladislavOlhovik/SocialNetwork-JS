import React, { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png'
import ProfileStatusWithHook from './ProfileStatusWithHook';
import ProfileDataForm from './ProfileDataForm';



export const ProfileInfo = ({savePhoto, profile, isOwner, status, updateUserStatus, saveProfile}) => {
  const [editMode, setEditMode] = useState(false)
  const sendFile = (e) => {
    if(e.target.files.length){
      savePhoto(e.target.files[0])
    }
  }
  const onSubmit = (formData) => {
    saveProfile(formData).then(()=>{
      setEditMode(false)
    })
  } 
  if(!profile){
    return <Preloader/>
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        <div className={s.wrapper}>
          <span>
            <div>
              <img src={profile.photos.large || userPhoto} alt="users" className={s.usersPhoto} />
            </div>
            {isOwner && <input type='file' onChange={sendFile} />}
          </span>
          <span className={s.content}>
            <span>
              <div>{profile.fullName}</div>
              <div>{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : 'no status'}</div>
            </span>
          </span>
        </div>
        <div>
          <b>Status: </b><ProfileStatusWithHook isOwner={isOwner} status={status} updateUserStatus={updateUserStatus} />
        </div>
        {editMode
        ?<ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
        :<ProfileData goToEditMode={()=>setEditMode(true)} isOwner={isOwner} profile={profile}/>}
      </div>
    </div>
  )
}

const ProfileData = ({profile, goToEditMode, isOwner}) => {
  return(
    <div>
      {isOwner&&<div><button onClick={goToEditMode}>edit</button></div>}
      <div>
        <b>fullName: </b>{profile.fullName}
      </div>
      <div>
        <b>looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'No'}
      </div>
      {profile.lookingForAJob &&
        <div>
          <b>My professional skills: </b>{profile.lookingForAJobDescription}
        </div>}
      <div>
        <b>About Me: </b>{profile.aboutMe}
      </div>
      <div>
        <b>Contacts: </b>{Object.keys(profile.contacts).map((el, i) => {
          return <Contact key={i} contactTitle={el} contactValue={profile.contacts[el]} />
        })}
      </div>
    </div>
  )
}


export const Contact = ({contactTitle, contactValue}) => {
  return <div style={{paddingLeft:'10px'}}>-<b>{contactTitle}:</b>{contactValue}</div>
}