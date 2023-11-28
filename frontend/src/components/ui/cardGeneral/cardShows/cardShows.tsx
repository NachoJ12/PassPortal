import { Card, CardContent, Typography } from "@mui/material";
import { Event } from '@/types/events'
import React, { FC } from "react";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from 'next/navigation'

interface Props {
  event: Event
}


const CardsShowEvents: FC<Props> = ({ event }) => {

  const router = useRouter()

  const redirect = () => {
    router.push(`events/${event.id}`)
  }

  return (
    <div onClick={redirect}>
      <Card className="cardShow-general" data-aos="fade-up">
        <CardContent className="cardShow-container-image">
          <div>
            <Image
              src={event?.image}
              alt={event?.name}
              className="cardShow-Image"
            ></Image>
          </div>
        </CardContent>
        <CardContent className="cardShow-container-info">
          <Typography variant="h6" component="div" className="cardShow-title">
            {event?.name}
          </Typography>
          <Typography variant="h6" component="div" className="cardShow-info">
            <div className="cardShow-info-container"><span><CalendarMonthIcon /></span><span>{event?.date}</span></div>
          </Typography>
          <Typography variant="h6" component="div" className="cardShow-info">
            <div className="cardShow-info-container"><span><LocationOnIcon /></span><span>{event?.venue.address.city}</span></div>
          </Typography>
          <Typography variant="h6" component="div" className="cardShow-description">
            {event?.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardsShowEvents;
