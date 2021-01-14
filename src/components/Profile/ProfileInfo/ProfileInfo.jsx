import React, { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png'
import ProfileStatusWithHook from './ProfileStatus/ProfileStatusWithHook';
import ProfileDataForm from './ProfileData/ProfileDataForm';
import { ProfileData } from './ProfileData/ProfileData';



export const ProfileInfo = ({ savePhoto, profile, isOwner, status, updateUserStatus, saveProfile }) => {
  const [editMode, setEditMode] = useState(false)
  const sendFile = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }
  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
  }
  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        <div className={s.wrapper}>
          <span>
            <div>
              <img src={profile.photos.large || userPhoto} alt="users" className={s.usersPhoto} />
            </div>
            {isOwner && <div className={s.changePhotoBtn}>
              <input type='file' id="upload" onChange={sendFile} />
              <label htmlFor="upload">Change photo</label>
            </div>}
          </span>
          <div className={s.content}>
            <span>
              <h3>{profile.fullName}</h3>
              <div className={s.status}>
                <b>Status:</b>
                <ProfileStatusWithHook isOwner={isOwner} status={status} updateUserStatus={updateUserStatus} />
              </div>
              <div>
                {editMode
                  ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                  : <ProfileData goToEditMode={() => setEditMode(true)} isOwner={isOwner} profile={profile} />}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

