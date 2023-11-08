import React, { FC } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
} from "@mui/material";
import { Event } from '@/data/cardItems';
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface Props {
    event: Event
}

const CardEvent: FC<Props> = ({ event }) => {
    return (
        <Card key={event.id} className="card-general" data-aos="fade-up">
            <CardContent className="card-elements">
                <Image src={event.path} alt={event.title} className="card-image" />
                <div className="card-info">
                    <div className="description-card">
                        <div className="card-date-ubication">
                            <span className="card-icon">
                                <CalendarMonthIcon />
                            </span>
                            <span className="card-name">{event.date}</span>
                        </div>
                        <div className="card-date-ubication">
                            <span className="card-icon">
                                <LocationOnIcon />
                            </span>
                            <span className="card-name">{event.ubication}</span>
                        </div>
                    </div>
                    <Typography variant="h3" className="card-typography">
                        {event.title}
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        className="card-typography-description"
                    >
                        {event.description}
                    </Typography>
                    <CardActions className="card-boton">
                        <Button variant="outlined" color="primary" className="boton">
                            Reservar
                        </Button>
                    </CardActions>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardEvent