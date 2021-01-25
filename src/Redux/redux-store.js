import { applyMiddleware, combineReducers, createStore } from "redux";
// import thunk from "redux-thunk";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form: formReducer,
    app: appReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

// let store = createStore(reducers, applyMiddleware(thunk));

const sagaMiddleware = createSagaMiddleware()

let store = createStore(reducers, applyMiddleware(sagaMiddleware));
window.store = store

sagaMiddleware.run(rootSaga)
export default store;
