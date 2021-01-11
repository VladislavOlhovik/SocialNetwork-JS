import React from 'react';
import './App.css';
import { Nav } from './components/Navbar/Nav';
import { Redirect, Route } from 'react-router-dom';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import News from './components/News/News';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './Redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import Chat from './components/Chat/Chat';
import WithSuspense from './hoc/WithSuspense';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));




class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return  <Preloader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Nav />
        <div className="app-wrapper-content">
          <Redirect from='/' to='/profile'/>
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs" render={ WithSuspense(DialogsContainer) } />
          <Route path="/chat" render={() => <Chat />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/setting" component={Setting} />
          <Route path="/login" render={() => <Login />} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  connect(mapStateToProps, { initializeApp } )
)(App);