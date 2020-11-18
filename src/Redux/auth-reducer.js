import { authAPI } from "../api/api";

const SET_USERS_DATA = "SET_USERS";
const SET_LOGIN = "SET_LOGIN";


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
    case SET_LOGIN:
      return {
        ...state,
        id:action.data.userId,
        isAuth:true,
      }
    default:
      return state;
  }
};

export const setAuthUserData = (data) => ({ type: SET_USERS_DATA, payload:data });
export const setLoginUser = (data) => ({ type: SET_LOGIN, payload:data });

export const getAuthUserData = () => (dispatch) => {
  authAPI.getMe().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(data.data));
    }
  });
};
export const loginUser = (formData) => (dispatch) => {
  authAPI.login(formData.login, formData.password, formData.rememberMe).then((data) => {
    debugger
    if (data.data.resultCode === 0) {
      debugger
      dispatch(setAuthUserData(data.data));
    }
  });
};

export default authReducer;
