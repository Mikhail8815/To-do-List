import {AppRootState} from "../App/store";
import {TasksStateType} from "../AppWithRedux";

export const selectTasks = (state: AppRootState): TasksStateType => state.tasks