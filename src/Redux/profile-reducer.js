import { stopSubmit } from "redux-form";
import { v1 } from "uuid";
import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const SET_PHOTO = "profile/SET_PHOTO";

const initialState = {
  postData: [
    { id: v1(), message: "Hi, how are you?", likeCounts: 12 },
    { id: v1(), message: "It's my first post", likeCounts: 11 },
  ],
  profile:null,
  status:'',
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
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setPhotos = (photos) => ({ type: SET_PHOTO, photos });


export const getUserProfile = (userId) => async (dispatch) => {
  let respons = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(respons.data));
};
export const getUserStatus = (userId) => async (dispatch) => {
  let respons = await profileAPI.getStatus(userId)
    dispatch(setStatus(respons.data));
};
export const updateUserStatus = (status) => async (dispatch) => {
  let respons = await profileAPI.updateStatus(status)
    if(respons.data.resultCode===0){
    dispatch(setStatus(status));
    }
};
export const savePhoto = (file) => async (dispatch) => {
  let respons = await profileAPI.sendPhoto(file)
    if(respons.data.resultCode===0){
    dispatch(setPhotos(respons.data.data.photos));
    }
};
export const saveProfile = (formData) => async (dispatch, getState) => {
  const userId = getState().auth.id
  let respons = await profileAPI.updateProfile(formData)
    if(respons.data.resultCode===0){
      dispatch(getUserProfile(userId))
    } else {
      debugger
      let message =
      respons.data.messages.length > 0 ? respons.data.messages[0] : "Some error";
      dispatch(stopSubmit("profileEdit", { _error: message }));
      return Promise.reject()
    }
};

export default profileReducer;
