import { TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface CustomTextFieldProps {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    control: Control<any>;
    defaultValue?: string;
    textFieldProps?: Record<string, any>;
}

export const CustomTextField = ({
    name,
    label,
    type,
    required,
    control,
    defaultValue,
    textFieldProps
}: CustomTextFieldProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                < TextField
                    {...field}
                    type={type}
                    label={label}
                    variant="outlined"
                    fullWidth
                    required={required}
                    sx={{ m: 2, width:"80%" }}
                    {...textFieldProps}
                />
            )
            }
        />
    );
};