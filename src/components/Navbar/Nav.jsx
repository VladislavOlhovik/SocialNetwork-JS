import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';


export const Nav = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/dialogs' activeClassName={s.active}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/news' activeClassName={s.active}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/music' activeClassName={s.active}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/users' activeClassName={s.active}>Find users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/setting' activeClassName={s.active}>Setting</NavLink>
      </div>
    </nav>
  )
}