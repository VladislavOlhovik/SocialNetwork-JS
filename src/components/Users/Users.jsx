import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';


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
            <Paginator totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged} />
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
