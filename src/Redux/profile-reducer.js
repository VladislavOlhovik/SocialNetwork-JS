import { v1 } from "uuid";
import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

const initialState = {
  newPostText: "it-kamasutra.com",
  postData: [
    { id: v1(), message: "Hi, how are you?", likeCounts: 12 },
    { id: v1(), message: "It's my first post", likeCounts: 11 },
  ],
  profile:null,
  status:'',
}

const profileReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: v1(),
        message: state.newPostText,
        likeCounts: 0,
      };
      return {
        ...state,
        postData:[newPost , ...state.postData],
        newPostText: ""
      };
    case UPDATE_NEW_POST_TEXT:
      return {...state, newPostText: action.newText};
    case SET_USER_PROFILE:
      return {...state, profile:action.profile}  
    case SET_STATUS:
      return {...state, status:action.status}  
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const updateNewPostTextActionCreator = (newText) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: newText,
});

export const getUserProfile = (userId) => (dispatch) => {
  profileAPI.getProfile(userId).then((respons) => {
    dispatch(setUserProfile(respons.data));
  });
};
export const getUserStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((respons) => {
    dispatch(setStatus(respons.data));
  });
};
export const updateUserStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((respons) => {
    if(respons.data.resultCode===0){
    dispatch(setStatus(status));
    }
  });
};

export default profileReducer;
