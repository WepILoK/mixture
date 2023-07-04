import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerFormSchema} from "../../../../utils";
import React from "react";
import {TabPanel} from "../../../../components";
import {Button, TextField} from "@mui/material";
import {PasswordField} from "../PasswordField/PasswordField";

export const Registration: React.FC<{ tabValue: number }> = ({tabValue}) => {
    const {register, handleSubmit, setError, formState: {errors, isValid, defaultValues}} = useForm({
        defaultValues: {
            email: "",
            userName: "",
            password: "",
            password2: "",
        },
        mode: 'onSubmit',
        resolver: yupResolver(registerFormSchema)
    })

    const onSubmit = (data) => {

    };




    return (
        <TabPanel value={tabValue} index={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    sx={{mt: 1, mb: 1}}
                    {...register("email", {required: "Введите email"})}
                    label="E-Mail"
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                />
                <TextField
                    sx={{mt: 1, mb: 1}}
                    {...register("userName", {required: "Введите логин"})}
                    label="Логин"
                    type="userName"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                />
                <PasswordField
                    register={register}
                    fieldName='password'
                    errors={errors}
                />
                <PasswordField
                    register={register}
                    fieldName='password2'
                    errors={errors}
                />
                <Button
                    sx={{mt: 8}}
                    type={"submit"}
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Регистрация
                </Button>
            </form>
        </TabPanel>
    )
}