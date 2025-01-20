import {createTheme} from "@mui/material";
import {ThemeMode} from "../../App/app-reducer";

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#1E90FF',
            },
        },
    })
}