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
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small 
                            ? user.photos.small 
                            : userPhoto} alt="users" className={styles.usersPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} 
                                  onClick={() => unfollow(user.id)}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} 
                                  onClick={() => follow(user.id)}>Follow</button>}
                </div>
            </span>
            <span className={styles.content}>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status ? user.status : 'no status'}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </span>
        </div>)
}
export default User
