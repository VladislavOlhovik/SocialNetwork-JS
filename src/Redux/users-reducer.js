import { call, put, takeEvery } from "redux-saga/effects";
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

function* requestUsersS ({payload}) {
  yield put(toggleIsFetching(true));
  let data = yield call(usersAPI.getUsers,payload.currentPage, payload.pageSize)
  yield put(setUsers(data.items));
  yield put(setTotalUsersCount(data.totalCount));
  yield put(toggleIsFetching(false));
};

function* getUsersCurrentPageS ({payload}) {
  yield put(setCurrentPage(payload.currentPage));
  yield put(toggleIsFetching(true));
  let data = yield call(usersAPI.getUsers, payload.currentPage, payload.pageSize);
  yield put(toggleIsFetching(false));
  yield put(setUsers(data.items));
};

function* followingS ({payload} ) { 
  yield put(toggleFolowingProgress(true, payload.userId));
  let data = yield call(payload.API, payload.userId)
  if (data.resultCode === 0) {
    yield put(payload.AC(payload.userId));
  }
  yield put(toggleFolowingProgress(false, payload.userId));
}

export function* usersListener () { 
  yield takeEvery('users/RequestUsers', requestUsersS)
  yield takeEvery('users/GetUsersCurrentPage', getUsersCurrentPageS)
  yield takeEvery('users/Following', followingS)
}


export const requestUsers = (currentPage, pageSize) => ({type:'users/RequestUsers',payload:{currentPage,pageSize}})
export const getUsersCurrentPage = (currentPage, pageSize) => ({type:'users/GetUsersCurrentPage',payload:{currentPage, pageSize}})

export const follow = (userId) => ({type:'users/Following', payload:{
  userId:userId, 
  API: followAPI.follow, 
  AC: followSuccess
}})

export const unFollow = (userId) => ({type:'users/Following', payload:{
  userId:userId, 
  API: followAPI.unFollow, 
  AC: unFollowSuccess
}})

export default usersReducer;
