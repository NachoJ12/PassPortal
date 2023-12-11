import React , {FC, useState} from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface Props {
    date : Dayjs | null;
    setValue: (newValue: Dayjs | null) => void
}

const DatePickerValue : FC< Props> = ({date, setValue}) => {
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={date}
                    minDate={dayjs(new Date())}
                    onChange={(newValue: Dayjs | null) => setValue(newValue)}
                    sx={{ alignSelf: "flex-end !important", color:"white !important", width:"100%", minWidth:"120px"}}
                />
        </LocalizationProvider>
    );
}

export default DatePickerValue