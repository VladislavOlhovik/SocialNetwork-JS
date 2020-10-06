const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const initialState = {
  newPostText: "it-kamasutra.com",
  postData: [
    { id: 1, message: "Hi, how are you?", likeCounts: 12 },
    { id: 2, message: "It's my first post", likeCounts: 11 },
  ],
}

const profileReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 5,
        message: state.newPostText,
        likeCounts: 0,
      };
      state.postData.unshift(newPost);
      state.newPostText = "";
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (newText) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: newText,
});

export default profileReducer;
