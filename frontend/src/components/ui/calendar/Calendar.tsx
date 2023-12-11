import React, { FC, useState , useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface Props {
    date: Dayjs | null;
    setValue: (newValue: Dayjs | null) => void
}

const DatePickerValue: FC<Props> = ({ date, setValue }) => {
    const [cleared, setCleared] = useState<boolean>(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => { };
    }, [cleared]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={date} slotProps={{
                    field: { clearable: true, onClear: () => setCleared(true) },
                }}
                minDate={dayjs(new Date())}
                onChange={(newValue: Dayjs | null) => setValue(newValue)}
                sx={{ alignSelf: "flex-end !important", color: "white !important", width: "100%", minWidth: "120px" }}
            />
        </LocalizationProvider>
    );
}

export default DatePickerValue