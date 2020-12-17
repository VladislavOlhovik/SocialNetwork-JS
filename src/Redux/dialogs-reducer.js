import { v1 } from "uuid";

const ADD_MESSAGE = "ADD-MESSAGE";

const initialState = {
  dialogsData: [
    { id: v1(), name: "Dimych" },
    { id: v1(), name: "Andrey" },
    { id: v1(), name: "Sveta" },
    { id: v1(), name: "Sasha" },
    { id: v1(), name: "Viktor" },
    { id: v1(), name: "Valera" },
  ],
  messagesData: [
    { id: v1(), message: "Hi" },
    { id: v1(), message: "How is your it-kamasutra" },
    { id: v1(), message: "Yo" },
    { id: v1(), message: "Yo" },
    { id: v1(), message: "Yo" },
  ],
}

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      let newPost = {id: v1(),message: action.newMessageBody};
      return {
        ...state,
        messagesData:[...state.messagesData, newPost]
      };
    default:
      return state;
  }
};

export const addMessageActionCreator = (newMessageBody) => ({ type: ADD_MESSAGE, newMessageBody });

export default dialogsReducer;
