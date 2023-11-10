import React, { FC, useEffect } from "react";
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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation'
interface Props {
    event: Event
}

const CardEvent: FC<Props> = ({ event }) => {
    useEffect(() => {
        AOS.init();
    }, []);


    const router = useRouter()

    const redirect = () => {
        router.push(`events/${event.id}`)
    }

    return (
        <div onClick={redirect}>
            <Card  key={event.id} className="card-general" data-aos="fade-up">
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
        </div>
    )
}

export default CardEvent