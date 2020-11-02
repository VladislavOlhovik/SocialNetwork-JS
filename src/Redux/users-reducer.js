
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

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unFollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFolowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, payload:{isFetching,userId}});

export default usersReducer;
