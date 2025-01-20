import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../features/todolists/model/torolists-reducer";
import {tasksReducer} from "../features/todolists/model/tasks-reducer";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export type RootState = ReturnType<typeof store.getState>

export const store = legacy_createStore(rootReducer)

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store