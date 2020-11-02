
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


export default authReducer;
