import { rerenderEntireTree } from "../rerender"

let state = {
    profilePage: {
        postData: [
            { id: 1, message: 'Hi, how are you?', likeCounts: 12 },
            { id: 2, message: "It's my first post", likeCounts: 11 },
        ]
    },
    dialogsPage: {
        dialogsData: [
            { id: 1, name: 'Dimych' },
            { id: 2, name: 'Andrey' },
            { id: 3, name: 'Sveta' },
            { id: 4, name: 'Sasha' },
            { id: 5, name: 'Viktor' },
            { id: 6, name: 'Valera' },
        ],
        messagesData: [
            { id: 1, message: 'Hi' },
            { id: 2, message: 'How is your it-kamasutra' },
            { id: 3, message: 'Yo' },
            { id: 4, message: 'Yo' },
            { id: 5, message: 'Yo' }
        ]
    },
    sidebar: {}
}

export const addPost = (postMessage) => {
    let newPost = {
        id: 5,
        message: postMessage,
        likeCounts: 0
    }
    state.profilePage.postData.push(newPost)
    rerenderEntireTree(state)
}
export default state