import React, { FC, useState, useEffect } from "react";
import { Event } from '@/types/events'
import CardUpcoming from '@/components/ui/cardGeneral/cardUpcoming/cardUpcoming'
import { getUpcomingEvents } from "@/service/events-service";


const CardUpcomingContainer: FC = () => {
  const [events, setEvents] = useState<Event[]>();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Event[] = await getUpcomingEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])

  return (
    <div className="cardUpcoming-container">
      {events?.slice(0, 6).map((item : Event) => (
        <div key={item.id} className="custom-Upcoming-container">
          <CardUpcoming event={item}/>
        </div>
      ))}
    </div>
  );
};

export default CardUpcomingContainer;
