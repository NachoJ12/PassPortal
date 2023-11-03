import React, { useState, FC, use } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IMunicipioResponse } from '@/interface/municipio';
import { IProvinciaResponse } from '@/interface/provincia';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';

interface Props {
    municipios: IMunicipioResponse
    provincias: IProvinciaResponse
}

const SearchBar: FC<Props> = ({ municipios, provincias }) => {

    const router = useRouter()
    const [search, setSearch] = useState({
        provincia: "",
        municipio: ""
    });

    const [event, setEvent] = useState("");

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
        setEvent(value)
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        router.push({
            query: {
                ...router.query, name: event
            }
        })
        const dataFormt = {
            event,
            municipio: search.municipio,
            provincia: search.provincia
        }
    }


    return (
        <form onSubmit={handleSubmit} style={{ minWidth: 120, width: "100%", marginTop: "5rem", display: "flex", justifyContent: "center" }}>
            <Box style={{ zIndex: 1, display: "flex", width: "70%", justifyContent: "center", padding: "0.5rem", color:"red", }}>
                <Box sx={{ minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">Evente Name</InputLabel>
                    <TextField sx={{ width: "80%" }} onChange={handleChangeEvent} variant="outlined" />
                </Box>

                <Box sx={{ minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">Province</InputLabel>
                    <Select
                        sx={{ width: "80%" }}
                        id="demo-simple-select"
                        name="provincia"
                        value={search.provincia}
                        label="Please Select a Province"
                        onChange={handleChange}
                    >
                        {provincias?.provincias?.map(provincia => (<MenuItem value={provincia.nombre} key={provincia.id}>{provincia.nombre}</MenuItem>))}

                    </Select>
                </Box>

                <Box sx={{ minWidth: 120, width: "100%" }}>
                    <InputLabel id="select-label">Location</InputLabel>
                    <Select
                        sx={{ width: "80%" }}
                        id="simple-select"
                        name="municipios"
                        value={search.provincia ? search.municipio : "Please Select a Province"}
                        label="Please Select a Location"
                        onChange={handleChange}
                    >
                        {municipios.municipios.length > 0 ? municipios.municipios.map(municipio => (<MenuItem value={municipio.nombre} key={municipio.id}>{municipio.nombre}</MenuItem>)) : <MenuItem>There are no Location Available</MenuItem>}
                    </Select>
                </Box>
            </Box>

            <Button sx={{height: "fit - content", alignSelf: "center", marginTop: "1rem"}} size="small"  type="submit" variant="outlined">Search</Button>
        </form >
    )
}

export default SearchBar