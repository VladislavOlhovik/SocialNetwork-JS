import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus } from '../../Redux/profile-reducer'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';



class ProfileContainer extends React.Component {
  componentDidMount() {
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

  render() {
    return (
      <div>
        <Profile profile={this.props.profile}
                 status = {this.props.status}
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
  }
}

export default compose(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
)(ProfileContainer)