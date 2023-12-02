import React, { FC, useEffect, useState } from "react";
import { Event } from '@/types/events'
import CardsShowEvents from '@/components/ui/cardGeneral/cardShows/cardShows'
import { getAllEvents } from "@/service/events-service";


export const CardShowsContainer:FC = () => {

  const [events, setEvents] = useState<Event[]>();


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data: Event[] = await getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[])


  return (
    <div className="grid-container">
      {events?.slice(0, 8).map((item : Event) => (
        <div key={item.id}
          className={`grid-item ${
            item.image === "large" ? "large-card" : "small-card"
          }`}
        >
          <CardsShowEvents event={item}/>
        </div>
      ))}
    </div>
  );
};
