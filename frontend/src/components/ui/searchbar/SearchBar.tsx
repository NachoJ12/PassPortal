"use client"
import React, { useState, FC, use } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePickerValue from '../calendar/Calendar';
import { useSearchParams, } from 'next/navigation'

interface Props {
    //    municipios: IMunicipioResponse
}

const SearchBar: FC<Props> = ({ }) => {
    const [date, setValue] = useState<Dayjs | null>(dayjs(new Date()));

    const searchParams = useSearchParams();
    const selectedArtist = searchParams.get("artist") || ""
    const selectedEvent = searchParams.get("name") || ""
    const selectedDate = searchParams.get("dateFormat") || null

    console.log(selectedArtist, selectedEvent, selectedDate )

    const router = useRouter()
    const [search, setSearch] = useState({
        provincia: "",
        municipio: ""
    });

    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");


    const handleChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target
        setSearch((prevValues) => ({
            ...prevValues,
            [name]: value,
        })
        )
        router.push({
            query: {
                ...router.query, [name]: value
            }
        })
    };

    const handleChangeEvent = (event: any) => {
        const { value } = event.target
        setName(value)
    };

    const handleChangeArtist = (event: any) => {
        const { value } = event.target
        setArtist(value)
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const dateFormat = date !== null ? date.format("YYYY-MM-DD") : "";

        switch (true) {
            case Boolean(name && artist && date !== null):
                router.push({
                    query: {
                        ...router.query, name, artist, dateFormat
                    }
                })
                break;
            case Boolean(name && artist):
                router.push({
                    query: {
                        ...router.query, name, artist
                    }
                })
                break;
            case Boolean(name && date !== null):
                router.push({
                    query: {
                        ...router.query, name, dateFormat
                    }
                })
                break;
            case Boolean(name):
                router.push({
                    query: {
                        ...router.query, name
                    }
                })
                break;
            case Boolean(artist && date !== null):
                router.push({
                    query: {
                        ...router.query, artist, dateFormat
                    }
                })
                break;
            case Boolean(artist):
                router.push({
                    query: {
                        ...router.query, artist
                    }
                })
                break;
            case Boolean(date !== null):
                router.push({
                    query: {
                        ...router.query, dateFormat
                    }
                })
                break;
        }
    }

    const handleClear = (e: any) => {
        e.preventDefault()
        router.push({
            query: {}
        })
    }


    return (
        <form onSubmit={handleSubmit} className="searchbar_form" >
            <div className='searchbar_inputs'>
                <Box sx={{ minWidth: 120, width: "100%" }}>
                    <InputLabel sx={{ color: "white !important" }} id="demo-simple-select-label" className="input-searchbar">Evente Name</InputLabel>
                    <TextField value={selectedEvent} sx={{ width: "100% !important", border: "1px solid #d67ab1 !important" }} className="input-searchbar" InputProps={{ style: { color: "white" } }} name="event" onChange={handleChangeEvent} variant="outlined" />
                </Box>

                <Box sx={{ minWidth: 120, width: "100%" }}>
                    <InputLabel sx={{ color: "white !important" }} id="demo-simple-select-label" className="input-searchbar">Artist Name</InputLabel>
                    <TextField value={selectedArtist} sx={{ width: "100% !important", border: "1px solid #d67ab1 !important" }} className="input-searchbar" InputProps={{ style: { color: "white" } }} name="artist" onChange={handleChangeArtist} variant="outlined" />
                </Box>


                <DatePickerValue date={date} setValue={setValue} />
            </div>
            <div style={{ display: "flex", gap: "16px" }}>

                <Button sx={{ height: "fit - content !important", alignSelf: "center !important ", marginTop: "1rem !important", border: "1px solid #d67ab1 !important", color: "#d67ab1 !important" }} size="small" type="submit" variant="outlined">Search</Button>
                <Button sx={{ height: "fit - content !important", alignSelf: "center !important ", marginTop: "1rem !important", border: "1px solid #d67ab1 !important", color: "#d67ab1 !important" }} size="small" onClick={handleClear} variant="outlined"> Clear </Button>

            </div>

        </form >


    )
}

export default SearchBar