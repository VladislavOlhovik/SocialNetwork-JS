import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../Redux/profile-reducer'
import { withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';



class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.userID
    }
    this.props.getUserProfile(userId)
  }

  render() {
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
    userID: state.auth.id,
  }
}

export default compose(
  connect(mapStateToProps, { getUserProfile }),
  withRouter,
  WithAuthRedirect
)(ProfileContainer)