import React from 'react';
import { connect } from 'react-redux';
import { follow, setUsers, unFollow, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFolowingProgress } from '../../Redux/users-reducer';
import Users from './Users';
import Preloader from '../common/preloader/Preloader'
import { usersAPI } from '../../api/api';

class UsersContainer extends React.Component {
    componentDidMount(){
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage,this.props.pageSize)
        .then(data=>{
            this.props.setUsers(data.items)
            this.props.setTotalUsersCount(data.totalCount)
            this.props.toggleIsFetching(false)
        })        
    }
    onPageChanged = (el) => {
        this.props.setCurrentPage(el)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(el,this.props.pageSize)
        .then(data=>{
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })  
    }   
    render(){
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
                        followingInProgress={this.props.followingInProgress}
                        toggleFolowingProgress={this.props.toggleFolowingProgress} />
                }
            </>
        ) 
    }
}




const mapStateToProps = (state) =>{
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount:state.usersPage.totalUsersCount,
        currentPage:state.usersPage.currentPage,
        isFetching:state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps,{
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFolowingProgress,
})(UsersContainer)