import {RootState} from "../../../App/store";
import {ThemeMode} from "../../../App/app-reducer";

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode