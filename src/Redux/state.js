let rerenderEntireTree=()=>{
    console.log('yo');
} 

let state = {
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
    newMessageText: "newMessage",
    messagesData: [
      { id: 1, message: "Hi" },
      { id: 2, message: "How is your it-kamasutra" },
      { id: 3, message: "Yo" },
      { id: 4, message: "Yo" },
      { id: 5, message: "Yo" },
    ],
  },
  sidebar: {},
};
window.state = state;
export const updateNewMessageText = (newText) => {
  state.dialogsPage.newMessageText = newText;
  rerenderEntireTree(state);
};
export const addMessage = () => {
  let newPost = {
    id: 6,
    message: state.dialogsPage.newMessageText,
  };
  state.dialogsPage.messagesData.push(newPost);
  state.dialogsPage.newMessageText = "";
  rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};
export const addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    likeCounts: 0,
  };
  state.profilePage.postData.push(newPost);
  state.profilePage.newPostText = "";
  rerenderEntireTree(state);
};
export const subscribe =(observer)=>{
    rerenderEntireTree=observer
}


export default state;
