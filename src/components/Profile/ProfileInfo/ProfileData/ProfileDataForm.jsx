import React from 'react'
import { reduxForm } from 'redux-form'
import { createField, Input, Textarea } from '../../../common/FormsControls/FormsControls'
import style from '../../../common/FormsControls/FormsControls.module.css'
import s from './ProfileData.module.css'


const ProfileForm = ({profile, handleSubmit, error}) => {
    return(
      <form className={s.wrapper} onSubmit={handleSubmit}>
        <div>
          <b>full Name: </b>{createField('full Name', [], 'fullName', Input)}
        </div>
        <div>
          <b>looking for a job: </b>{createField('', [], 'lookingForAJob', Input, {type:'checkbox'})}
        </div>
        <div>
          <b>My professional skills: </b>{createField('My professional skills', [], 'lookingForAJobDescription', Textarea)}
        </div>
        <div>
          <b>About Me: </b>{createField('About Me', [], 'aboutMe', Textarea)}
        </div>
        <div>
          <b>Contacts: </b>{Object.keys(profile.contacts).map((el, i) => {
              return <div key={i}>
                  -<b>{el}: </b> {createField(`${el}`, [], `contacts.${el}`, Input)}
              </div>
          })}
        </div>
        {error&&<div className={error?style.formError:''}>
                {error}
            </div>}
        <button>save</button>
      </form>
    )
  }

  const ProfileDataForm = reduxForm({form: 'profileEdit'})(ProfileForm)

  export default ProfileDataForm