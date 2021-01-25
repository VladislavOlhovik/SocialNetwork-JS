import {all} from 'redux-saga/effects'
import { appListener } from './app-reducer'
import { authListener } from './auth-reducer'
import { profileListener } from './profile-reducer'
import { usersListener } from './users-reducer'



export default function* rootSaga(){   
    yield all([
        appListener(),
        authListener(),
        usersListener(),
        profileListener(),
    ])
  }