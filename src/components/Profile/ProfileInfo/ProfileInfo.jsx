import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png'
import ProfileStatusWithHook from './ProfileStatus/ProfileStatusWithHook';
import ProfileDataForm from './ProfileData/ProfileDataForm';
import { ProfileData } from './ProfileData/ProfileData';
import { useDispatch } from 'react-redux';



export const ProfileInfo = ({ 
  toggleEditMode, 
  savePhoto, 
  profile, 
  isOwner, 
  status, 
  updateUserStatus, 
  saveProfile,
  changeToggleEditMode, 
}) => {
  const dispatch = useDispatch()
  const sendFile = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }
  const onSubmit = (formData) => {
    saveProfile(formData)
  }
  const goToEditMode = () => {
    dispatch(changeToggleEditMode(true))
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
                {toggleEditMode
                  ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                  : <ProfileData goToEditMode={goToEditMode} isOwner={isOwner} profile={profile} />}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

