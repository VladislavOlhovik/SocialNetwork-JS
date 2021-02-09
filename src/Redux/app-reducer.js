import { put, takeEvery } from "redux-saga/effects";

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS";

const initialState = {
    initialized: false,
}

export const appReducer = (state=initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export function* initializeAppS () {
  yield put(initializedSuccess())
};


export function* appListener () { 
  yield takeEvery('app/InitializeApp', initializeAppS)
}

export const initializeApp = () => ({type:'app/InitializeApp'})

export default appReducer;
