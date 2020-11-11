import React from 'react';
import './App.css';
import { Nav } from './components/Navbar/Nav';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { Route } from 'react-router-dom';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import News from './components/News/News';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/login';




const App = () => {
  return (    
      <div className='app-wrapper'>
        <HeaderContainer />
        <Nav />
        <div className='app-wrapper-content'>
          <Route path='/profile/:userId?' render={()=><ProfileContainer />} />
          <Route path='/dialogs' render={()=><DialogsContainer />} />
          <Route path='/users' render={()=><UsersContainer />} />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/setting' component={Setting} />
          <Route path='/login' render={() => <Login/>}/>
        </div>
      </div>
  );
}


export default App;