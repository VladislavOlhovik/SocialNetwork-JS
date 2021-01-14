import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

export const Header = (props) => {
  return (
    <header className={s.header}>
      <span>SocialNetwork</span>
      <div className={s.loginBlock}>
        {props.isAuth 
        ? <div> 
          {props.profile&&<img src={props.profile.photos.small} alt="logo"/>}
          {props.login}  <button onClick={props.logoutUser}>Log out</button>
          </div>
        : <NavLink to={'/login'}>login</NavLink>}
      </div>
    </header>
  )
}