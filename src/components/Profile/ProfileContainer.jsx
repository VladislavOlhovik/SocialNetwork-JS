import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import {setUserProfile} from '../../Redux/profile-reducer'
import { withRouter } from 'react-router-dom';
import { profileAPI } from '../../api/api';
 


class ProfileContainer extends React.Component { 
  componentDidMount () {
    let userId = this.props.match.params.userId
    if(!userId){
      userId=2
    }
    profileAPI.getUser(userId)
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