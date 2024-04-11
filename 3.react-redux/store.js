// const { createStore, compose, applyMiddleware } = require('redux');
// const { composeWithDevTools } = require('redux-devtools-extension');
// ⬆️ reduc-toolkit 을 적용시키게 되면서 사용하지 않음

const { configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit');

const reducer = require('./reducers');
const { addPost } = require('./actions/post');
const { logIn, logOut } = require('./actions/user');

// const initialState = {
//   user: {
//     isLoggingIn: false,
//     data: null,
//   },
//   posts: [],
// };
// ⬆️ initialState 복잡하다 지우자 -> 그럼 어디서? 아래쪽에서 설명

// 커스텀 미들웨어
const firstMiddleware = (store) => (next) => (action) => {
  console.log('로깅', action);
  next(action);
};

// thunk 는 redux-toolkit 에 내장되어 있으니 지움
// const thunkMiddleware = (store) => (next) => (action) => {
//   if (typeof action === 'function') { // 비동기
//     return action(store.dispatch, store.getState);
//   }
//   return next(action); // 동기
// };

// enhancer 는 devtool 에 내장되어 있는 것이기 때문에 지움
// const enhancer = process.env.NODE_ENV === 'production'
//   ? compose(
//     applyMiddleware(
//       firstMiddleware,
//       thunkMiddleware,
//     ),
//   )
//   : composeWithDevTools(
//     applyMiddleware(
//       firstMiddleware,
//       thunkMiddleware,
//     ),
//   );

// createStore 에서 configureStore 로 변경, 매개변수 reducer, initialState, enhancer 였음
// preloadedState : 나중에 서버 사이드 렌더링할 때 서버로부터 initialState 가 올 때만 넣으면 된다. (SSR 전용)
// middleware : [firstMiddleware] <- firstMiddleware 는 커스텀미들웨어이기 때문에 configureStore 에 미들웨어를 이렇게 설정하면 
// toolkit 에 내장되어 있는 thunk 같은 것은 사용할 수 없게 된다 
const store = configureStore({
  reducer, 
  // preloadedState,
  middleware : [firstMiddleware, ...getDefaultMiddleware()],
  devtools : process.env.NODE_ENV !== 'production'
});


module.exports = store;