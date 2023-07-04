import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React from "react";


interface PasswordFieldProps {
    register: any
    errors: any
    fieldName: string
}

export const PasswordField: React.FC<PasswordFieldProps> = ({register, errors, fieldName}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl
            sx={{mt: 1, mb: 1}}
            variant="outlined"
            fullWidth
        >
            <InputLabel
                htmlFor={`outlined-adornment-${fieldName}`}
                        error={Boolean(errors.password?.message)}
            >
                Пароль
            </InputLabel>
            <OutlinedInput
                {...register(fieldName, {required: "Введите пароль"})}
                type={showPassword ? 'text' : 'password'}
                label="Пароль"
                id={`outlined-adornment-${fieldName}`}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
                error={Boolean(errors[fieldName]?.message)}
            />
            <FormHelperText
                error={Boolean(errors[fieldName]?.message)}
            >
                {errors[fieldName]?.message}
            </FormHelperText>
        </FormControl>
    )
}