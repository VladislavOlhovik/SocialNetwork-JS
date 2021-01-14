import React from 'react';
import s from './Post.module.css';

export const Post = (props) => {
  return (
    <div className={s.item}>
      <img src={props.photosSmall} alt="user" />
      {props.message}
      <div>
        <span>like: </span> {props.likeCounts}
      </div>
    </div>
  )
}