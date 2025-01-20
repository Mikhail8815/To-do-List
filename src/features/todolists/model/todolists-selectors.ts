import {RootState} from "../../../App/store";
import {TodolistType} from "../../../App/App";

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists