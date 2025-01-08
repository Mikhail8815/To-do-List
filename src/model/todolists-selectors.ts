import {AppRootState} from "../App/store";
import {TodolistType} from "../App";

export const selectTodolists = (state: AppRootState): TodolistType[] => state.todolists