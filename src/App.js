import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Nav } from './components/Navbar/Nav';
import { Profile } from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, BrowserRouter } from 'react-router-dom';
import Setting from './components/Setting/Setting';
import Music from './components/Music/Music';
import News from './components/News/News';




const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Nav />
        <div className='app-wrapper-content'>
          <Route path='/profile' render={()=><Profile state={props.state.profilePage} addPost={props.addPost}/>} />
          <Route path='/dialogs' render={()=><Dialogs state={props.state.dialogsPage}/>} />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/setting' component={Setting} />
        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;