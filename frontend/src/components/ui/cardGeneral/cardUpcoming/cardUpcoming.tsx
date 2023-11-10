import React, { FC } from "react";
import { Event } from '@/data/cardItems';
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from 'next/navigation'
interface Props {
  event: Event
}

const CardUpcoming: FC<Props> = ({ event }) => {

  const router = useRouter()

  const redirect = () => {
    router.push(`events/${event.id}`)
  }


  return (
      <Card className="cardUpcoming-general" data-aos="fade-up">
        <CardContent className="cardUpcoming-elements">
          <div className="cardUpcoming-image-container">
            <Image
              src={event.path}
              alt={event.title}
              className="cardUpcoming-image"
            />
          </div>
          <div className="cardUpcoming-info">
            <Typography variant="h3" className="cardUpcoming-typography">
              {event.title.length > 20 ? `${event.title.slice(0, 20)}...` :
                event.title}
            </Typography>
            <div className="cardUpcoming-description">
              <div className="cardUpcoming-date-ubication">
                <span className="cardUpcoming-icon">
                  <CalendarMonthIcon />
                </span>
                <span className="cardUpcoming-name">{event.date}</span>
              </div>
              <div className="cardUpcoming-date-ubication">
                <span className="cardUpcoming-icon">
                  <LocationOnIcon />
                </span>
                <span className="cardUpcoming-name">{event.ubication}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    
  );
};
export default CardUpcoming;