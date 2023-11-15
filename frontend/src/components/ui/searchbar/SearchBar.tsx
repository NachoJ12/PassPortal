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
        <form onSubmit={handleSubmit} className="searchbar_form" >
            <div className='searchbar_inputs'>
                <Box sx={{ minWidth: 120, width: "100%" }}>
                    <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">Evente Name</InputLabel>
                    <TextField sx={{ width: "100%", border: "1px solid #d67ab1" }} InputProps={{ style: { color: "white" } }} onChange={handleChangeEvent} variant="outlined" />
                </Box>

                <Box sx={{ minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>Province</InputLabel>
                    <Select
                        sx={{ width: "100%", border: "1px solid #d67ab1", color: "white" }}
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
                    <InputLabel id="select-label" style={{ color: "white" }}>Location</InputLabel>
                    <Select
                        sx={{ width: "100%", border: "1px solid #d67ab1", color: "white" }}
                        id="simple-select"
                        name="municipio"
                        value={search.municipio}
                        label="Please Select a Location"
                        onChange={handleChange}
                    >
                        {municipios.municipios.length > 0 ? municipios.municipios.map(municipio => (<MenuItem value={municipio.nombre} key={municipio.id}>{municipio.nombre}</MenuItem>)) : <MenuItem>There are no Location Available</MenuItem>}
                    </Select>
                </Box>
            </div>

            <Button sx={{ height: "fit - content", alignSelf: "center", marginTop: "1rem", border: "1px solid #d67ab1", color: "#d67ab1" }} size="small" type="submit" variant="outlined">Search</Button>
        </form >
    )
}

export default SearchBar