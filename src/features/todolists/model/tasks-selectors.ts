import {RootState} from "../../../App/store";
import {TasksStateType} from "../../../App/App";

export const selectTasks = (state: RootState): TasksStateType => state.tasks