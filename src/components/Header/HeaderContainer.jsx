import React from 'react';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../Redux/auth-reducer'
import { Header } from './Header';
import { authAPI } from '../../api/api';


class HeaderContainer extends React.Component {
  componentDidMount(){
        authAPI.getMe()
        .then(data=>{
            if(data.resultCode===0){
            this.props.setAuthUserData(data.data)
            }
        })        
  }
  render() {
    return (
      <Header {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth:state.auth.isAuth,
    login:state.auth.login,
  }
}

export default connect(mapStateToProps,{setAuthUserData})(HeaderContainer)