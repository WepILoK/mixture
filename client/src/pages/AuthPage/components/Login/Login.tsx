import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginFormSchema} from "../../../../utils";
import {Button, TextField} from "@mui/material";
import React from "react";
import {TabPanel} from "../../../../components";
import {PasswordField} from "../PasswordField/PasswordField";


export const Login: React.FC<{ tabValue: number }> = ({tabValue}) => {
    const {register, handleSubmit, setError, formState: {errors, isValid, defaultValues}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: 'onChange',
        resolver: yupResolver(loginFormSchema)
    })

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <TabPanel value={tabValue} index={0}>
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
                <PasswordField
                    register={register}
                    fieldName='password'
                    errors={errors}
                />
                <Button
                    disabled={!isValid}
                    sx={{mt: 8}}
                    type={"submit"}
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Авторизация
                </Button>
            </form>
        </TabPanel>
    )
}