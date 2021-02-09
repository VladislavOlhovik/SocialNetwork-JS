import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, securityAPI } from "../api/api";
import { call, put, takeEvery } from 'redux-saga/effects'
import { initializeAppS } from "./app-reducer";


const SET_USERS_DATA = "auth/SET_USERS_DATA";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";
const SET_PHOTOS = "auth/SET_PHOTOS";


const initialState = {
    id:null,
    login:null,
    email:null,
    isAuth:false,
    captchaUrl:null,
    photos:{
      small:null,
      large:null
    }
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_USERS_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
      }
    case SET_PHOTOS:
      return{
        ...state,
        photos:{...action.payload}
      }
    default:
      return state;
  }
};

export const setAuthUserData = (data, isAuth) => ({ type: SET_USERS_DATA, payload:{...data, isAuth} });
export const setPhotos = (data) => ({ type: SET_PHOTOS, payload:{...data} });
export const setCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA_URL, payload:{captchaUrl} });


function* getAuthUserDataS() {
  try {
    const data = yield call(authAPI.getMe);
    if (data.resultCode === 0) {
      yield put(setAuthUserData(data.data, true));
      let me = yield call(profileAPI.getProfile, data.data.id);
      yield put(setPhotos(me.data.photos));
    }
  } catch (e) {
    console.log("err", e);
  }
  yield* initializeAppS()
}

function* getCaptchaUrlS(){
  try{
    let data = yield securityAPI.getCaptchaUrl()
    yield put(setCaptchaUrl(data.data.url))
  } catch(e){
    console.log('err', e);
  }
}

function* loginUserS ({ formData }) {
  let data = yield call(authAPI.login, formData)
    if (data.data.resultCode === 0) {
      yield put(getAuthUserData())
      yield put(setCaptchaUrl(null))
    } else {
      if(data.data.resultCode === 10){
        yield put({type: 'auth/GetCaptchaUrl'})
      }
      let message =
        data.data.messages.length > 0 ? data.data.messages[0] : "Some error";
        yield put(stopSubmit("login", { _error: message }));
    }
};

function* logoutUserS () {
  let data = yield call(authAPI.logout)
    if (data.data.resultCode === 0) {
      yield put(setAuthUserData({
        id:null,
        login:null,
        email:null
      }, false));
    }
};

export function* authListener () {
  yield takeEvery('auth/GetAuthUserData', getAuthUserDataS)
  yield takeEvery('auth/GetCaptchaUrl', getCaptchaUrlS)
  yield takeEvery('auth/LoginUser', loginUserS)
  yield takeEvery('auth/LogoutUser', logoutUserS)
}

export const getAuthUserData = () => ({type:'auth/GetAuthUserData'})
export const loginUser = (formData) => ({type:'auth/LoginUser', formData})
export const logoutUser = () => ({type:'auth/LogoutUser'})


export default authReducer;
