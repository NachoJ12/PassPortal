import React, { useState, FC, use } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IMunicipioResponse } from '@/interface/municipio';
import { IProvinciaResponse } from '@/interface/provincia';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';

interface Props {
    municipios: IMunicipioResponse
    provincias: IProvinciaResponse
}

const SearchBar: FC<Props> = ({ municipios, provincias }) => {


    // useSearchParams({
    //     name:"",
    //     artist:"",
    //     date:"",
    //     category:"",
    // })

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
        router.push({
            query: {
                ...router.query, name, artist
            }
        })
        const dataFormt = {
            name,
            municipio: search.municipio,
            provincia: search.provincia
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
                    <TextField sx={{ width: "100% !important", border: "1px solid #d67ab1 !important" }} className="input-searchbar" InputProps={{ style: { color: "white" } }} name="event" onChange={handleChangeEvent} variant="outlined" />
                </Box>

                <Box sx={{ minWidth: 120, width: "100%" }}>
                    <InputLabel sx={{ color: "white !important" }} id="demo-simple-select-label" className="input-searchbar">Artist Name</InputLabel>
                    <TextField sx={{ width: "100% !important", border: "1px solid #d67ab1 !important" }} className="input-searchbar" InputProps={{ style: { color: "white" } }} name="artist" onChange={handleChangeArtist} variant="outlined" />
                </Box>

                <Box sx={{ minWidth: 120 + "!important", width: "100% !important" }}>
                    <InputLabel id="demo-simple-select-label" className="input-searchbar" style={{ color: "white !important" }}>Province</InputLabel>
                    <Select
                        sx={{ width: "100% !important ", border: "1px solid #d67ab1 !important ", color: "white !important" }}
                        id="demo-simple-select"
                        name="provincia"
                        value={search.provincia}
                        label="Please Select a Province"
                        className="input-searchbar"
                        onChange={handleChange}>

                        {provincias?.provincias?.map(provincia => (<MenuItem value={provincia.nombre} key={provincia.id}>{provincia.nombre}</MenuItem>))}

                    </Select>
                </Box>

                <Box sx={{ minWidth: 120 + "!important", width: "100% !important" }}>
                    <InputLabel id="select-label" className="input-searchbar" style={{ color: "white !important" }}>Location</InputLabel>
                    <Select
                        sx={{ width: "100% !important", border: "1px solid #d67ab1 !important", color: "white !important" }}
                        id="simple-select"
                        name="municipio"
                        value={search.municipio}
                        label="Please Select a Location"
                        onChange={handleChange}
                        className="input-searchbar"
                    >
                        {municipios.municipios.length > 0 ? municipios.municipios.map(municipio => (<MenuItem value={municipio.nombre} key={municipio.id}>{municipio.nombre}</MenuItem>)) : <MenuItem>There are no Location Available</MenuItem>}
                    </Select>
                </Box>
            </div>

            <div style={{display:"flex", gap:"16px"}}>

                <Button sx={{ height: "fit - content !important", alignSelf: "center !important ", marginTop: "1rem !important", border: "1px solid #d67ab1 !important", color: "#d67ab1 !important" }} size="small" type="submit" variant="outlined">Search</Button>
                <Button sx={{ height: "fit - content !important", alignSelf: "center !important ", marginTop: "1rem !important", border: "1px solid #d67ab1 !important", color: "#d67ab1 !important" }} size="small" onClick={handleClear} variant="outlined"> Clear </Button>
            </div>

        </form >


    )
}

export default SearchBar