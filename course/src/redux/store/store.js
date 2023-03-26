import {combineReducers, createStore,applyMiddleware} from 'redux';
import {NoteListReducer,UpdateNoteReducer,DeleteNoteReducer,CreateNoteReducer} from '../reducer/NoteReducer';
import {LoginUserReducer,RegisterUserReducer,UpdateUserReducer} from '../reducer/UserReducer';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    NoteList:NoteListReducer,
    NoteCreate:CreateNoteReducer,
    NoteDelete:DeleteNoteReducer,
    NoteUpdate:UpdateNoteReducer,
    UserLogin:LoginUserReducer,
    UserRegister:RegisterUserReducer,
    UserUpdate:UpdateUserReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  UserLogin: { userInfo: userInfoFromStorage },
};
  
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
// console.log(store.getState());
export default store;