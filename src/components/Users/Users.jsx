import Axios from 'axios';
import React from 'react';
import styles from './Users.module.css'
import userPhoto from '../../assets/images/user.png'

class Users extends React.Component {
    componentDidMount(){
        Axios.get('https://social-network.samuraijs.com/api/1.0/users?page=100').then(respons=>{
        this.props.setUsers(respons.data.items)
        })        
    }   
    render(){
        return(
            <div>
                {
                    this.props.users.map(el=><div key={el.id} className={styles.wrapper}>
                        <span>
                            <div>
                                <img src={el.photos.small?el.photos.small:userPhoto} alt="users" className={styles.usersPhoto}/>
                            </div>
                            <div>
                                {el.followed?<button onClick={()=>this.props.unfollow(el.id)}>Unfollow</button>
                                :<button onClick={()=>this.props.follow(el.id)}>Follow</button>}
                            </div>
                        </span>
                        <span className={styles.content}>
                            <span>
                                <div>{el.name}</div>
                                <div>{el.status?el.status:'no status'}</div>
                            </span>
                            <span>
                                <div>{'el.location.country'}</div>
                                <div>{'el.location.city'}</div>
                            </span>
                        </span>
                    </div>)
                }
            </div>
        )
    }
}

export default Users
    