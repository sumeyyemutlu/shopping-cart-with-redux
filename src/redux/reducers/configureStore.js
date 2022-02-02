import { applyMiddleware, createStore } from "redux";
import rootReducers from "./index"; //index.js içindeki birleştirdiğimiz reducerlarımızı import ettik
import thunk from 'redux-thunk'//eylemleri eşzamansız olarak göndermemizi sağlar.

export default function configureStore () {
    return createStore(rootReducers, applyMiddleware(thunk)) //createStore ile birleştirilen reducerlar hatta actionlar da store'nin içine atıldı.
}