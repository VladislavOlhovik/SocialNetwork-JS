import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../Redux/profile-reducer'
import { withRouter } from 'react-router-dom';



class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = 2
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
  }
}

export default connect(mapStateToProps, { getUserProfile })(withRouter(ProfileContainer))