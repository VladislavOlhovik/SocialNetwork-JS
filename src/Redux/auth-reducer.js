import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, securityAPI } from "../api/api";

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

export const getAuthUserData = () => async (dispatch) => {
  let data = await authAPI.getMe();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(data.data, true));
    let me = await profileAPI.getProfile(data.data.id);
    dispatch(setPhotos(me.data.photos))
  }
};
const getCaptchaUrl = () => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl()
  dispatch(setCaptchaUrl(data.data.url))
}
export const loginUser = (formData) => async (dispatch) => {
  let data = await authAPI.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
    if (data.data.resultCode === 0) {
      dispatch(getAuthUserData());
      dispatch(setCaptchaUrl(null))
    } else {
      if(data.data.resultCode === 10){
        dispatch(getCaptchaUrl())
      }
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
