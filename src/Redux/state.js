import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
      newPostText: "it-kamasutra.com",
      postData: [
        { id: 1, message: "Hi, how are you?", likeCounts: 12 },
        { id: 2, message: "It's my first post", likeCounts: 11 },
      ],
    },
    dialogsPage: {
      dialogsData: [
        { id: 1, name: "Dimych" },
        { id: 2, name: "Andrey" },
        { id: 3, name: "Sveta" },
        { id: 4, name: "Sasha" },
        { id: 5, name: "Viktor" },
        { id: 6, name: "Valera" },
      ],
      newMessageText: "",
      messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How is your it-kamasutra" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" },
      ],
    },
    sidebar: {},
  },
  _callSubscriber() {
    console.log("yo");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

   dispatch(action) {
     this._state.profilePage=profileReducer(this._state.profilePage,action)
     this._state.dialogsPage=dialogsReducer(this._state.dialogsPage,action)
     this._state.sidebar=sidebarReducer(this._state.sidebar,action)

     this._callSubscriber(this._state);
  },
};

export default store;

window.store = store;
