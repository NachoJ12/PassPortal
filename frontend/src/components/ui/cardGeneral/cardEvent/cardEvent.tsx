import React, { FC, useEffect } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
} from "@mui/material";
import { Event } from '@/types/events'
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
                    {/* TODO usar img del evento correspondiente */}
                    <Image 
                        src={event?.image} 
                        alt={event?.name} 

                        quality={100}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="card-image" 
                    />
                    <div className="card-info">
                        <div className="description-card">
                            <div className="card-date-ubication">
                                <span className="card-icon">
                                    <CalendarMonthIcon />
                                </span>
                                <span className="card-name">{event?.date}</span>
                            </div>
                            <div className="card-date-ubication">
                                <span className="card-icon">
                                    <LocationOnIcon />
                                </span>
                                <span className="card-name">{event?.venue.address.city}</span>
                            </div>
                        </div>
                        <Typography variant="h3" className="card-typography">
                            {event?.name}
                        </Typography>
                        <Typography
                            variant="h6"
                            align="center"
                            className="card-typography-description"
                        >
                            {event?.description}
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