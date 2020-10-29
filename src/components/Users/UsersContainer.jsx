import React from 'react';
import { connect } from 'react-redux';
import { follow, setUsers, unFollow, setCurrentPage, setTotalUsersCount, toggleIsFetching } from '../../Redux/users-reducer';
import Axios from 'axios';
import Users from './Users';
import Preloader from '../common/preloader/Preloader'

class UsersContainer extends React.Component {
    componentDidMount(){
        this.props.toggleIsFetching(true)
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
        .then(respons=>{
            this.props.toggleIsFetching(false)
            this.props.setUsers(respons.data.items)
            this.props.setTotalUsersCount(respons.data.totalCount)
        })        
    }
    onPageChanged = (el) => {
        this.props.setCurrentPage(el)
        this.props.toggleIsFetching(true)
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${el}&count=${this.props.pageSize}`)
        .then(respons=>{
            this.props.toggleIsFetching(false)
            this.props.setUsers(respons.data.items)
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
                        follow={this.props.follow} />
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
    }
}

export default connect(mapStateToProps,{
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer)