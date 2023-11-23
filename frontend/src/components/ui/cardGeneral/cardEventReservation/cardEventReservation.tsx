import React, { useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { Event } from "@/data/cardItems";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logo from "../../../../../public/logo-grey.svg";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

interface Props {
  event: Event;
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#E5C0D9",
      main: "#cb74a8",
      dark: "#b3437d",
      contrastText: "#fff",
    },
  },
});

const CardEventReservation: NextPage<Props> = ({ event }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setSelectedValue(event.target.value);
  };
  const handleReserveClick = () => {
    console.log("Reservar", selectedValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="cardReservation-general">
        <div className="cardReservation-boxEvent">
          <div className="cardReservation-title">
            <h2>
              Reserva tu ticket para: <br />
              {event.title}
            </h2>
            <p>
              Asegura tu lugar en este evento inolvidable. ¡Reserva ahora y no
              te pierdas la oportunidad de vivir una experiencia única!
            </p>
          </div>
          <div className="cardReservation-box">
            <div className="cardReservation-containerImg">
              <Image
                className="cardReservation-image"
                src={event.path}
                alt={event.title}
              />
            </div>

            <div className="cardReservation-description">
              <p>{event.description.slice(0, 100)}</p>
              <div className="cardReservation-dateUbi">
                <p>
                  <CalendarMonthIcon />
                  {event.date}
                </p>
                <p>
                  <LocationOnIcon />
                  {event.ubication}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cardReservation-boxReserve">
          <div>
            <Image src={logo} alt="logo" width={250} height={250} ></Image>
          </div>
          <div className="cardReservation-form">
          <Typography variant="body1">
              Entradas a reservar:
            </Typography>
            <FormControl>
              <InputLabel
                id="select-label"
                sx={{ color: theme.palette.primary.main + "!important", }}>
                Selecciona
              </InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={selectedValue}
                label="Selecciona"
                onChange={handleChange}
                sx={{
                  "& fieldset": {
                    borderColor: "#cb74a8 !important", // Cambia "your-desired-color" al color que desees
                  },
                  width: "80px !important",
                  color:"white !important"
                }}
              >
                <MenuItem value="">Selecciona...</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button variant="outlined" color="primary" onClick={handleReserveClick}>
              Reserva
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default CardEventReservation;
