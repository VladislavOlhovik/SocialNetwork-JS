(this["webpackJsonpreact-kabzda-1"]=this["webpackJsonpreact-kabzda-1"]||[]).push([[0],{14:function(e,t,a){e.exports={postsBlock:"MyPost_postsBlock__3cE9X",posts:"MyPost_posts__Rngb3"}},21:function(e,t,a){e.exports={header:"Header_header__gCK-D"}},23:function(e,t,a){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__1mb3A"}},24:function(e,t,a){e.exports={item:"Post_item__2LeaV"}},26:function(e,t,a){e.exports=a(38)},31:function(e,t,a){},32:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var r=a(20),i=a.n(r),c=(a(31),a(32),a(21)),l=a.n(c),o=function(){return s.a.createElement("header",{className:l.a.header},s.a.createElement("img",{src:"https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg"}))},m=a(6),u=a.n(m),d=a(7),g=function(){return s.a.createElement("nav",{className:u.a.nav},s.a.createElement("div",{className:u.a.item},s.a.createElement(d.b,{to:"/profile",activeClassName:u.a.active},"Profile")),s.a.createElement("div",{className:u.a.item},s.a.createElement(d.b,{to:"/dialogs",activeClassName:u.a.active},"Messages")),s.a.createElement("div",{className:u.a.item},s.a.createElement(d.b,{to:"/news",activeClassName:u.a.active},"News")),s.a.createElement("div",{className:u.a.item},s.a.createElement(d.b,{to:"/music",activeClassName:u.a.active},"Music")),s.a.createElement("div",{className:u.a.item},s.a.createElement(d.b,{to:"/setting",activeClassName:u.a.active},"Setting")))},E=a(23),p=a.n(E),v=function(){return s.a.createElement("div",null,s.a.createElement("div",null,s.a.createElement("img",{src:"https://gadgetmedics.com/wp-content/uploads/2020/01/illustration-geiranger.jpg"})),s.a.createElement("div",{className:p.a.descriptionBlock},"ava+description"))},f={newPostText:"it-kamasutra.com",postData:[{id:1,message:"Hi, how are you?",likeCounts:12},{id:2,message:"It's my first post",likeCounts:11}]},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD-POST":var a={id:5,message:e.newPostText,likeCounts:0};return e.postData.unshift(a),e.newPostText="",e;case"UPDATE-NEW-POST-TEXT":return e.newPostText=t.newText,e;default:return e}},w=s.a.createContext(null),N=function(e){return s.a.createElement(w.Provider,{value:e.store},e.children)},T=w,_=a(14),P=a.n(_),b=a(24),x=a.n(b),D=function(e){return s.a.createElement("div",{className:x.a.item},s.a.createElement("img",{src:"https://i.wpimg.pl/730x0/m.gadzetomania.pl/tumblr-kwh4eacbzu1qaptl6-a9d2590.jpg",alt:""}),e.message,s.a.createElement("div",null,s.a.createElement("span",null,"like")," ",e.likeCounts))},k=function(e){var t=e.postdata.map((function(e){return s.a.createElement(D,{message:e.message,likeCounts:e.likeCounts})}));return s.a.createElement("div",{className:P.a.postsBlock},s.a.createElement("h3",null,"My post"),s.a.createElement("div",null,s.a.createElement("div",null,s.a.createElement("textarea",{onChange:function(t){e.updateNewPostText(t.currentTarget.value)},value:e.newPostText})),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){e.addPost()}},"Add post"))),s.a.createElement("div",{className:P.a.posts},t))},C=function(e){return s.a.createElement(T.Consumer,null,(function(e){var t=e.getState();return s.a.createElement(k,{addPost:function(){e.dispatch({type:"ADD-POST"})},updateNewPostText:function(t){e.dispatch({type:"UPDATE-NEW-POST-TEXT",newText:t})},newPostText:t.profilePage.newPostText,postdata:t.profilePage.postData})}))},M=function(e){return s.a.createElement("div",null,s.a.createElement(v,null),s.a.createElement(C,null))},S=a(8),y=a.n(S),A=function(e){return s.a.createElement("div",{className:y.a.dialog},s.a.createElement(d.b,{to:"/dialogs/"+e.id},e.name))},B=function(e){return s.a.createElement("div",{className:y.a.message},e.message)},j=function(e){var t=e.state.dialogsData.map((function(e){return s.a.createElement(A,{name:e.name,id:e.id})})),a=e.state.messagesData.map((function(e){return s.a.createElement(B,{message:e.message})}));return s.a.createElement("div",{className:y.a.dialogs},s.a.createElement("div",{className:y.a.dialogsItems},t),s.a.createElement("div",{className:y.a.messages},a,s.a.createElement("div",null,s.a.createElement("textarea",{onChange:function(t){e.updateNewMessage(t.currentTarget.value)},placeholder:"Enter your message",value:e.state.newMessageText})),s.a.createElement("div",null,s.a.createElement("button",{onClick:function(){e.addMessage()}},"sent"))))},I={dialogsData:[{id:1,name:"Dimych"},{id:2,name:"Andrey"},{id:3,name:"Sveta"},{id:4,name:"Sasha"},{id:5,name:"Viktor"},{id:6,name:"Valera"}],newMessageText:"",messagesData:[{id:1,message:"Hi"},{id:2,message:"How is your it-kamasutra"},{id:3,message:"Yo"},{id:4,message:"Yo"},{id:5,message:"Yo"}]},O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD-MESSAGE":var a={id:8,message:e.newMessageText};return e.messagesData.push(a),e.newMessageText="",e;case"UPDATE-NEW-MESSAGE-TEXT":return e.newMessageText=t.newText,e;default:return e}},W=function(e){return s.a.createElement(T.Consumer,null,(function(e){var t=e.getState().dialogsPage;return s.a.createElement(j,{state:t,updateNewMessage:function(t){e.dispatch({type:"UPDATE-NEW-MESSAGE-TEXT",newText:t})},addMessage:function(){e.dispatch({type:"ADD-MESSAGE"})}})}))},U=a(1),X=function(){return s.a.createElement("div",null,"Setting")},z=function(){return s.a.createElement("div",null,"Music")},G=function(){return s.a.createElement("div",null,"News")},H=function(e){return s.a.createElement("div",{className:"app-wrapper"},s.a.createElement(o,null),s.a.createElement(g,null),s.a.createElement("div",{className:"app-wrapper-content"},s.a.createElement(U.a,{path:"/profile",render:function(){return s.a.createElement(M,null)}}),s.a.createElement(U.a,{path:"/dialogs",render:function(){return s.a.createElement(W,null)}}),s.a.createElement(U.a,{path:"/news",component:G}),s.a.createElement(U.a,{path:"/music",component:z}),s.a.createElement(U.a,{path:"/setting",component:X})))},J=a(15),V={},Y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V;return e},q=Object(J.a)({profilePage:h,dialogsPage:O,sidebar:Y}),K=Object(J.b)(q),F=function(){i.a.render(s.a.createElement(d.a,null,s.a.createElement(N,{store:K},s.a.createElement(H,null))),document.getElementById("root"))};F(),K.subscribe((function(){F()})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,a){e.exports={nav:"Navbar_nav__2eyog",item:"Navbar_item__2sQ4m",active:"Navbar_active__qb4iJ"}},8:function(e,t,a){e.exports={dialogs:"Dialogs_dialogs__1BjSN",dialogsItems:"Dialogs_dialogsItems__UwFPe",active:"Dialogs_active__2na5C",messages:"Dialogs_messages__tmKcJ"}}},[[26,1,2]]]);
//# sourceMappingURL=main.8cd2e273.chunk.js.map