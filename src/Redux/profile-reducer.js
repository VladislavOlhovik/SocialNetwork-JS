import { stopSubmit } from "redux-form";
import { call, put, takeEvery } from "redux-saga/effects";
import { v1 } from "uuid";
import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const SET_PHOTO = "profile/SET_PHOTO";
const CHANGE_TOGGLE_EDIT_MODE = "profile/CHANGE_TOGGLE_EDIT_MODE";

const initialState = {
  postData: [
    { id: v1(), message: "Hi, how are you?", likeCounts: 12 },
    { id: v1(), message: "It's my first post", likeCounts: 11 },
  ],
  profile:null,
  status:'',
  toggleEditMode:false
}

export const profileReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: v1(),
        message: action.newPostText,
        likeCounts: 0,
      };
      return {
        ...state,
        postData:[newPost , ...state.postData],
        newPostText: ""
      };
    case SET_USER_PROFILE:
      return {...state, profile:action.profile}  
    case SET_STATUS:
      return {...state, status:action.status}  
    case SET_PHOTO:
      return {...state, profile:{...state.profile, photos:action.photos}}  
    case CHANGE_TOGGLE_EDIT_MODE:
      return {...state, toggleEditMode:action.toggleEditMode}  
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setPhotos = (photos) => ({ type: SET_PHOTO, photos });

function* getUserProfileS ({userId}) {
  if(userId){
  let respons = yield call(profileAPI.getProfile, userId)
  yield put(setUserProfile(respons.data));
  }
};
function* getUserStatusS ({userId}) {
  if(userId){
  let respons = yield call(profileAPI.getStatus, userId)
  yield put(setStatus(respons.data));
  }
};
function* updateUserStatusS ({status}) {
  let respons = yield call(profileAPI.updateStatus, status)
  if(respons.data.resultCode===0){
    yield put(setStatus(status));
  }
};
function* savePhotoS ({file}) {
  let respons = yield call(profileAPI.sendPhoto, file)
  if(respons.data.resultCode===0){
    yield put(setPhotos(respons.data.data.photos));
  }
};
function* saveProfileS ({formData}) {
  yield put({type:CHANGE_TOGGLE_EDIT_MODE, toggleEditMode: false})
  let respons = yield call(profileAPI.updateProfile, formData)
    if(respons.data.resultCode===0){
      yield put(getUserProfile(formData.userId))
      yield put({type:CHANGE_TOGGLE_EDIT_MODE, toggleEditMode: true})
    } else {
      let message =
      respons.data.messages.length > 0 ? respons.data.messages[0] : "Some error";
      yield put(stopSubmit("profileEdit", { _error: message }));
    }
};


export function* profileListener () { 
  yield takeEvery('profile/GetUserProfile', getUserProfileS)
  yield takeEvery('profile/GetUserStatus', getUserStatusS)
  yield takeEvery('profile/UpdateUserStatus', updateUserStatusS)
  yield takeEvery('profile/SavePhoto', savePhotoS)
  yield takeEvery('profile/SaveProfile', saveProfileS)
}


export const getUserProfile = (userId) => ({type:'profile/GetUserProfile', userId})
export const getUserStatus = (userId) => ({type:'profile/GetUserStatus', userId})
export const updateUserStatus = (status) => ({type:'profile/UpdateUserStatus', status})
export const savePhoto = (file) => ({type:'profile/SavePhoto', file})
export const saveProfile = (formData) => ({type:'profile/SaveProfile', formData})

export default profileReducer;
