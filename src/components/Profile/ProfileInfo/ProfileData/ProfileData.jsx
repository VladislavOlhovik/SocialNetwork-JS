import React from 'react';
import s from './ProfileData.module.css'

const iconName = ["fab fa-facebook","fas fa-laptop-code",
"fab fa-vk","fab fa-twitter","fab fa-instagram",
"fab fa-youtube","fab fa-github","fas fa-mail-bulk"]

export const ProfileData = ({ profile, goToEditMode, isOwner }) => {
    return (
      <div className={s.wrapper}>
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
          <b>Contact links: </b>
          <div className={s.contactBloc}>
            {Object.keys(profile.contacts).map((el, i) => {
              return <Contact key={i} contactIcon={iconName[i]} contactValue={profile.contacts[el]} />
            })}
          </div>
        </div>
            {isOwner && <div><button onClick={goToEditMode}>edit profile</button></div>}
      </div>
    )
  }
  
  
const Contact = ({ contactIcon, contactValue }) => {
  return (
    <div className={s.icon}>
      {contactValue && <div>
        <a href={contactValue} target="blank">
          <i className={contactIcon}></i>
        </a>
      </div>}
    </div>)
}