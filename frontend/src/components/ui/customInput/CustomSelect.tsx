import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface CustomSelectProps {
    name: string;
    label: string;
    control: Control<any>;
    defaultValue?: string;
    children: any
}

export const CustomSelect = ({
        name,
        label,
        control,
        defaultValue,
        children,
        
    }: CustomSelectProps) => {
    const labelId = `${name}-label`;
    return (
        <FormControl style={{ width:"80%" }} >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                render={({ field }) => (
                    <Select sx={{ width:"100%" }} labelId={labelId} label={label} {...field} >
                        {children}
                    </Select>
                )}
                name={name}
                control={control}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
};
