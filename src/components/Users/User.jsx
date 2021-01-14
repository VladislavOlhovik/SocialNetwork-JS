import React from 'react';
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';


const User = ({
    user,
    followingInProgress,
    unfollow,
    follow
}) => {
    return (
        <div className={styles.wrapper}>
            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small || userPhoto} alt="users" className={styles.usersPhoto} />
                </NavLink>
            </div>
            <span className={styles.content}>
                <span>
                    <div><b>Name: </b>{user.name}</div>
                    <div><b>Status: </b>{user.status ? user.status : 'no status'}</div>
                </span>
                <div className={styles.btn}>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => unfollow(user.id)}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => follow(user.id)}>Follow</button>}
                </div>
            </span>
        </div>)
}
export default User
