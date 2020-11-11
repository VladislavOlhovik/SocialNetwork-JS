import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../Redux/profile-reducer'
import { Redirect, withRouter } from 'react-router-dom';



class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.userID
    }
    this.props.getUserProfile(userId)
  }

  render() {
    if(!this.props.isAuth) return <Redirect to={'/login'}/>
    return (
      <div>
        <Profile profile={this.props.profile} />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    userID: state.auth.id,
  }
}

export default connect(mapStateToProps, { getUserProfile })(withRouter(ProfileContainer))