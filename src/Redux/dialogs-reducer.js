import { v1 } from "uuid";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

const initialState = {
  dialogsData: [
    { id: v1(), name: "Dimych" },
    { id: v1(), name: "Andrey" },
    { id: v1(), name: "Sveta" },
    { id: v1(), name: "Sasha" },
    { id: v1(), name: "Viktor" },
    { id: v1(), name: "Valera" },
  ],
  newMessageText: "",
  messagesData: [
    { id: v1(), message: "Hi" },
    { id: v1(), message: "How is your it-kamasutra" },
    { id: v1(), message: "Yo" },
    { id: v1(), message: "Yo" },
    { id: v1(), message: "Yo" },
  ],
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newPost = {id: v1(),message: state.newMessageText};
      return {
        ...state,
        messagesData:[...state.messagesData, newPost],
        newMessageText: ""
      };
    case UPDATE_NEW_MESSAGE_TEXT:
      return {...state,newMessageText: action.newText};
    default:
      return state;
  }
};

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });
export const updateNewMessageActionCreator = (newText) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newText: newText,
});

export default dialogsReducer;
