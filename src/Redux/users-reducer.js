import { followAPI, usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

const initialState = {
  users: [],
  pageSize:10,
  totalUsersCount:0,
  currentPage:1,
  isFetching:false,
  followingInProgress:[],
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
      return {...state, users:action.users} 
    case SET_CURRENT_PAGE:
      return {...state, currentPage:action.pageNumber} 
    case SET_TOTAL_USERS_COUNT:
      return {...state, totalUsersCount:action.totalUsersCount} 
    case TOGGLE_IS_FETCHING:
      return {...state, isFetching:action.isFetching} 
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress:action.payload.isFetching
        ?[...state.followingInProgress, action.payload.userId]
        :state.followingInProgress.filter(id=>id!==action.payload.userId)
      }
    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unFollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFolowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, payload:{isFetching,userId}});

export const getUsers = (currentPage, pageSize) => (dispatch) => {
  debugger;
  dispatch(toggleIsFetching(true));
  usersAPI.getUsers(currentPage, pageSize).then((data) => {
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(toggleIsFetching(false));
  });
};
export const getUsersCurrentPage = (currentPage, pageSize) => (dispatch) => {
  dispatch(setCurrentPage(currentPage));
  dispatch(toggleIsFetching(true));
  usersAPI.getUsers(currentPage, pageSize).then((data) => {
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
  });
};
export const follow = (userId) => (dispatch) => {
  dispatch(toggleFolowingProgress(true, userId));
  followAPI.follow(userId).then((data) => {
    if (data.resultCode === 0) {
      dispatch(followSuccess(userId));
    }
    dispatch(toggleFolowingProgress(false, userId));
  });
};
export const unFollow = (userId) => (dispatch) => {
  dispatch(toggleFolowingProgress(true, userId));
  followAPI.unFollow(userId).then((data) => {
    if (data.resultCode === 0) {
      dispatch(unFollowSuccess(userId));
    }
    dispatch(toggleFolowingProgress(false, userId));
  });
};

export default usersReducer;
