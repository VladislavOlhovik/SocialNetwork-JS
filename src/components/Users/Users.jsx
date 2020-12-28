import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import styles from './Users.module.css'



const Users = ({
    totalUsersCount,
    pageSize,
    onPageChanged,
    currentPage,
    users,
    followingInProgress,
    unfollow,
    follow
}) => {
    return (
        <div>
            <div className={styles.paginator}>
                <Paginator totalItemsCount={totalUsersCount}
                    portionSize={20}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChanged={onPageChanged} />
            </div>
            {
                users.map(el => <User key={el.id} user={el}
                    followingInProgress={followingInProgress}
                    unfollow={unfollow}
                    follow={follow} />)
            }
        </div>
    )
}
export default Users
