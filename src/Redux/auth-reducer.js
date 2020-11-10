import { authAPI } from "../api/api";

const SET_USERS_DATA = "SET_USERS";


const initialState = {
    id:null,
    login:null,
    email:null,
    isAuth:false,
}

const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_USERS_DATA:
      return {
        ...state,
        ...action.payload,
        isAuth:true,
      }
    default:
      return state;
  }
};

export const setAuthUserData = (data) => ({ type: SET_USERS_DATA, payload:data });

export const getAuthUserData = () => (dispatch) => {
  authAPI.getMe().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(data.data));
    }
  });
};

export default authReducer;
