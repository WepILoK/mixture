import {Box, Tab, Tabs} from "@mui/material";
import React from "react";
import style from './AuthPage.module.sass'
import {TabPanel} from "../../components/TabPanel";
import {Login} from "./components/Login/Login";
import {Registration} from "./components/Registration/Registration";


export const AuthPage = () => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box className={style.auth_form}>
            <div className={style.container}>
                <Tabs className={style.tabs} value={tabValue} onChange={handleChangeTab}
                      aria-label="disabled tabs example">
                    <Tab label="Авторизация"/>
                    <Tab sx={{m: "auto"}} label="" disabled/>
                    <Tab label="Регистрация"/>
                </Tabs>
                <Login tabValue={tabValue}/>
                <Registration tabValue={tabValue}/>
            </div>
        </Box>
    )
}