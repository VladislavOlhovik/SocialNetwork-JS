import { v1 } from "uuid";
import { profileAPI } from "../api/api";

const ADD_POST = "profile/ADD-POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";

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
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });


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

export default profileReducer;
