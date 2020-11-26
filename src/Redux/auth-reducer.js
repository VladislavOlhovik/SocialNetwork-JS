import { stopSubmit } from "redux-form";
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
      }
    default:
      return state;
  }
};

export const setAuthUserData = (data, isAuth) => ({ type: SET_USERS_DATA, payload:{...data, isAuth} });

export const getAuthUserData = () => (dispatch) => {
  authAPI.getMe().then((data) => {
    debugger
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(data.data, true));
    }
  });
};
export const loginUser = (formData) => (dispatch) => {
  authAPI.login(formData.login, formData.password, formData.rememberMe).then((data) => {
    if (data.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let message = data.data.messages.length>0?data.data.messages[0]:'Some error'
      dispatch(stopSubmit('login', {_error:message}))
    }
  });
};
export const logoutUser = () => (dispatch) => {
  authAPI.logout().then((data) => {
    debugger
    if (data.data.resultCode === 0) {
      dispatch(setAuthUserData({
        id:null,
        login:null,
        email:null
      }, false));
    }
  });
};

export default authReducer;
