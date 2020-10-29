import React from 'react';
import { Profile } from './Profile';
import Axios from 'axios';
import { connect } from 'react-redux';
import {setUserProfile} from '../../Redux/profile-reducer'
import { withRouter } from 'react-router-dom';
 


class ProfileContainer extends React.Component { 
  componentDidMount () {
    let userId = this.props.match.params.userId
    if(!userId){
      userId=2
    }
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        .then(respons=>{
            this.props.setUserProfile(respons.data)
        })   
  }

  render (){  
    return(
        <div>
         <Profile profile = {this.props.profile}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    profile:state.profilePage.profile,
  }
}

export default connect(mapStateToProps,{setUserProfile})(withRouter(ProfileContainer))