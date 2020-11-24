import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './MyPost.module.css';
import { Post } from './Post/Post';

export const MyPost = (props) => {
  let postElements=props.postdata.map(el => <Post key={el.id} message={el.message} likeCounts={el.likeCounts} />)
  
  let addPost=(dataForm) => {
    props.addPost(dataForm.newPost)
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
        <Field component={'textarea'} name={'newPost'} placeholder={'Enter your New post'}/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const PostReduxForm = reduxForm({form: 'post'})(PostForm)
