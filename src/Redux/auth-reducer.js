import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USERS_DATA = "auth/SET_USERS_DATA";


const initialState = {
    id:null,
    login:null,
    email:null,
    isAuth:false,
}

export const authReducer = (state=initialState, action) => {
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

export const getAuthUserData = () => async (dispatch) => {
  let data = await authAPI.getMe();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(data.data, true));
  }
};
export const loginUser = (formData) => async (dispatch) => {
  let data = await authAPI.login(formData.login, formData.password, formData.rememberMe)
    if (data.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let message =
        data.data.messages.length > 0 ? data.data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
};
export const logoutUser = () => async (dispatch) => {
  let data = await authAPI.logout()
    if (data.data.resultCode === 0) {
      dispatch(setAuthUserData({
        id:null,
        login:null,
        email:null
      }, false));
    }
};

export default authReducer;
