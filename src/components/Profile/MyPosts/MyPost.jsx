import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validator';
import { Textarea } from '../../common/FormsControls/FormsControls';
import s from './MyPost.module.css';
import { Post } from './Post/Post';
import img from '../../../assets/images/user.png'
import Preloader from '../../common/preloader/Preloader';


const maxLength = maxLengthCreator(10)

export const MyPost = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  let postElements=props.postdata.map(el => (
    <Post key={el.id} 
          photosSmall={props.profile.photos.small||img} 
          message={el.message} likeCounts={el.likeCounts} />
  ))
  
  let addPost=(dataForm) => {
    props.addPost(dataForm.newPost)
    props.clearForm()
  }
  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
        <PostReduxForm onSubmit={addPost}/>
      <div className={s.posts}>
        {postElements}
      </div>
    </div >
  )
}

const PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} 
               name={'newPost'} 
               validate={[required, maxLength]}
               placeholder={'Enter your New post'}/>
      </div>
      <div>
        <button className={s.btn}>Add post</button>
      </div>
    </form>
  )
}

const PostReduxForm = reduxForm({form: 'post'})(PostForm)
