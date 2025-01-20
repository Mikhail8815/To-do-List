import React from 'react';
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from "./hooks";
import {selectThemeMode} from "../features/todolists/model/app-selectors";
import {getTheme} from "../common/theme/theme";
import {Main} from "./main";
import {Header} from '../common/components/Header/Header';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TodolistType = {
    title: string,
    filter: FilterValuesType,
    id: string
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const themeMode = useAppSelector(selectThemeMode) // Тема (dark/light)

    const theme = getTheme(themeMode) //Получение темы

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header />
                <Main/>
            </ThemeProvider>
        </div>
    )
}

export default App;
