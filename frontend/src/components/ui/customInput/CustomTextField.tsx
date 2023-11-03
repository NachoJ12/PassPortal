import { TextField, TextFieldVariants } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface CustomTextFieldProps {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    control: Control<any>;
    defaultValue?: string;
    textFieldProps?: Record<string, any>;
    variant:TextFieldVariants | undefined
}

export const CustomTextField = ({
    name,
    label,
    type,
    required,
    control,
    defaultValue,
    variant,
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
                    variant={variant}
                    fullWidth
                    required={required}
                    sx={{ width:"80%" }}
                    {...textFieldProps}
                />
            )
            }
        />
    );
};