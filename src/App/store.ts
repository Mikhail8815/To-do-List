import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../model/torolists-reducer";
import {tasksReducer} from "../model/tasks-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof store.getState>

export const store = legacy_createStore(rootReducer)

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store