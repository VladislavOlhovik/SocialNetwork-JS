import React from 'react';
import s from './MyPost.module.css';
import { Post } from './Post/Post';
export const MyPost = (props) => {
  let postElements=props.postdata.map(el => <Post message={el.message} likeCounts={el.likeCounts} />)
  let newPostElement=React.createRef()
  let addPost=() => {
    let text = newPostElement.current.value
    props.addPost(text)
    newPostElement.current.value=''
  }
  return (
    <div className={s.postsBlock}>
      <h3>My post</h3>
      <div>
        <div>
          <textarea ref={newPostElement}></textarea>
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postElements}
      </div>
    </div >
  )
}