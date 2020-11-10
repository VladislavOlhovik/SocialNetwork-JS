import { v1 } from "uuid";
import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

const initialState = {
  newPostText: "it-kamasutra.com",
  postData: [
    { id: v1(), message: "Hi, how are you?", likeCounts: 12 },
    { id: v1(), message: "It's my first post", likeCounts: 11 },
  ],
  profile:null,
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
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const updateNewPostTextActionCreator = (newText) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: newText,
});

export const getUserProfile = (userId) => (dispatch) => {
  profileAPI.getUser(userId).then((respons) => {
    dispatch(setUserProfile(respons.data));
  });
};

export default profileReducer;
