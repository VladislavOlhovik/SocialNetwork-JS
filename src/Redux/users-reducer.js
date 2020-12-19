import { followAPI, usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = "users/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "users/TOGGLE_IS_FOLLOWING_PROGRESS"

const initialState = {
  users: [],
  pageSize:10,
  totalUsersCount:0,
  currentPage:1,
  isFetching:true,
  followingInProgress:[],
}

const usersReducer = (state=initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray( state.users, 'id', action.userId, {followed: true} )
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray( state.users, 'id', action.userId, {followed: false} )
      };
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

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  let data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
  dispatch(toggleIsFetching(false));
};
export const getUsersCurrentPage = (currentPage, pageSize) => async (dispatch) => {
  dispatch(setCurrentPage(currentPage));
  dispatch(toggleIsFetching(true));
  let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
};

const following = async (userId, dispatch, apiMethod, actionCreator ) => { 
  dispatch(toggleFolowingProgress(true, userId));
  let data = await apiMethod(userId)
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFolowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
  following(userId, dispatch, followAPI.follow, followSuccess)
};

export const unFollow = (userId) => async (dispatch) => {
  following(userId, dispatch, followAPI.unFollow, unFollowSuccess)
};

export default usersReducer;
