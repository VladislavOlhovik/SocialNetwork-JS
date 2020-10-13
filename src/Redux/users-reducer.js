
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

const initialState = {
  users: []
}

const usersReducer = (state=initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(el=>{
          if(el.id===action.userId){
            return {...el,followed:true}
          }
          return el
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(el=>{
          if(el.id===action.userId){
            return {...el,followed:false}
          }
          return el
        })
      }
    case SET_USERS:
      return {...state, users:[...state.users, ...action.users]} 
    default:
      return state;
  }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unFollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});

export default usersReducer;
