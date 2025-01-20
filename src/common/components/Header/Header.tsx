import {AppBar, createTheme, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "../MenuButton/MenuButton";
import Switch from "@mui/material/Switch";
import React from "react";
import {changeThemeAC} from "../../../App/app-reducer";
import {useAppDispatch, useAppSelector} from "../../../App/hooks";
import {selectThemeMode} from "../../../features/todolists/model/app-selectors";
import {getTheme} from "../../theme/theme";

export const Header = () => {

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode);

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

        return (
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
        )
}