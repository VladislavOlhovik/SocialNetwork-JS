import React from 'react';
import { connect } from 'react-redux';
import { follow, getUsersCurrentPage, unFollow, getUsers } from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader'
import { compose } from 'redux';

class UsersContainer extends React.Component {
    componentDidMount() {
        debugger
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    onPageChanged = (el) => {
        this.props.getUsersCurrentPage(el, this.props.pageSize)
    }
    render() {
        return (
            <>
                {this.props.isFetching ?
                    <Preloader />
                    : <Users totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        onPageChanged={this.onPageChanged}
                        unfollow={this.props.unFollow}
                        follow={this.props.follow}
                        followingInProgress={this.props.followingInProgress} />
                }
            </>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default compose(
    connect(mapStateToProps, {
        follow,
        unFollow,
        getUsers,
        getUsersCurrentPage,
    }),
)(UsersContainer)