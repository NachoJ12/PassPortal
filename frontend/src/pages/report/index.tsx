import BaseLayout from '@/components/layouts/base-layout'
import React from 'react'
import Image from "next/image";
import passPortalLogo from "../../../public/logo-grey.svg";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { TextField, Button } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { getReportByDate } from '../../service/order-service';

export default function report() {
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const pdf = await getReportByDate(11, 2023);
      const url = window.URL.createObjectURL(new Blob([pdf]));
      // const url = window.URL.createObjectURL(pdf);
      const link = document.createElement('a');
      link.href = url;
      // link.setAttribute(
      //   'download',
      //   `Report.pdf`,
      // );

      link.download = 'Report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Ocurrio un error. Intente mas tarde");
    }
  }

  return (
    <BaseLayout>
      <div className='event-page'>
        <Image src={passPortalLogo} alt="logo" className="logo-main" />
        <form onSubmit={handleSubmit} className="searchbar_form" >
            <div className='searchbar_inputs'>
              <Box sx={{ minWidth: 120, width: "100%" }}>
                <InputLabel sx={{ color: "white !important" }} id="demo-simple-select-label" className="input-searchbar">Month</InputLabel>
                {/* <TextField sx={{ width: "100% !important", border: "1px solid #d67ab1 !important" }} className="input-searchbar" InputProps={{ style: { color: "white" } }} name="event" onChange={handleChangeEvent} variant="outlined" /> */}
                <Select
                    defaultValue="0"
                    labelId='select-label'
                    id='select'
                    // name={`${row.name}-${row.id}-${row.eventid}`}
                    label='Choose'
                    // onChange={handleChange}
                    sx={{
                        '& fieldset': {
                            borderColor: '#cb74a8 !important', // Cambia "your-desired-color" al color que desees
                        },
                        width: '50% !important',
                        color: 'white !important',
                    }}
                  >
                    <MenuItem value='1'>1</MenuItem>
                    <MenuItem value='2'>2</MenuItem>
                    <MenuItem value='3'>3</MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='5'>5</MenuItem>
                    <MenuItem value='6'>6</MenuItem>
                    <MenuItem value='7'>7</MenuItem>
                    <MenuItem value='8'>8</MenuItem>
                    <MenuItem value='9'>9</MenuItem>
                    <MenuItem value='10'>10</MenuItem>
                    <MenuItem value='11'>11</MenuItem>
                    <MenuItem value='12'>12</MenuItem>
                </Select>
              </Box>

              <Box sx={{ minWidth: 120, width: "100%" }}>
                  <InputLabel sx={{ color: "white !important" }} id="demo-simple-select-label" className="input-searchbar">Year</InputLabel>
                  {/* <TextField sx={{ width: "100% !important", border: "1px solid #d67ab1 !important" }} className="input-searchbar" InputProps={{ style: { color: "white" } }} name="artist" onChange={handleChangeArtist} variant="outlined" /> */}
                  <Select
                    defaultValue="0"
                    labelId='select-label'
                    id='select'
                    // name={`${row.name}-${row.id}-${row.eventid}`}
                    label='Choose'
                    // onChange={handleChange}
                    sx={{
                        '& fieldset': {
                            borderColor: '#cb74a8 !important', // Cambia "your-desired-color" al color que desees
                        },
                        width: '50% !important',
                        color: 'white !important',
                    }}
                  >
                    <MenuItem value='2020'>2020</MenuItem>
                    <MenuItem value='2021'>2021</MenuItem>
                    <MenuItem value='2022'>2022</MenuItem>
                    <MenuItem value='2023'>2023</MenuItem>
                  </Select>
              </Box>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <Button sx={{ height: "fit - content !important", alignSelf: "center !important ", marginTop: "1rem !important", border: "1px solid #d67ab1 !important", color: "#d67ab1 !important" }} size="small" type="submit" variant="outlined">Download</Button>
              {/* <Button sx={{ height: "fit - content !important", alignSelf: "center !important ", marginTop: "1rem !important", border: "1px solid #d67ab1 !important", color: "#d67ab1 !important" }} size="small" onClick={handleClear} variant="outlined"> Clear </Button> */}
            </div>
        </form >
      </div>
    </BaseLayout>
  )
}
