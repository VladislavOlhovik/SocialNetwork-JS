import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, changeToggleEditMode, updateUserStatus, savePhoto, saveProfile } from '../../Redux/profile-reducer'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';



class ProfileContainer extends React.Component {
  refreshProfile(){
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.userID
      if(!userId){
        this.props.history.push('/login')
      }
    }
    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }
  componentDidMount() {
    this.refreshProfile()
  }
  componentDidUpdate(prevProps){
    if(this.props.match.params.userId!==prevProps.match.params.userId){
      this.refreshProfile()
    }
  }

  render() {
    return (
      <div>
        <Profile profile={this.props.profile}
                 isOwner={!!this.props.userID&&!this.props.match.params.userId}
                 status = {this.props.status}
                 toggleEditMode = {this.props.toggleEditMode}
                 savePhoto={this.props.savePhoto}
                 saveProfile={this.props.saveProfile}
                 changeToggleEditMode={this.props.changeToggleEditMode}
                 updateUserStatus={this.props.updateUserStatus} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    userID: state.auth.id,
    status: state.profilePage.status,
    toggleEditMode: state.profilePage.toggleEditMode,
  }
}

export default compose(
  connect(mapStateToProps, { 
    getUserProfile, 
    getUserStatus, 
    updateUserStatus, 
    savePhoto, 
    changeToggleEditMode,
    saveProfile }),
  withRouter,
)(ProfileContainer)