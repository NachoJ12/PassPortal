import React, { FC } from "react";
import { Event } from "@/data/cardItems";
import CardUpcoming from '@/components/ui/cardGeneral/cardUpcoming/cardUpcoming'



interface Props {
  events: Event[];
}

const CardUpcomingContainer: FC<Props> = ({ events }) => {


  return (
    <div className="cardUpcoming-container">
      {events.slice(0, 6).map((item : Event) => (
        <div key={item.id} className="custom-Upcoming-container">
          <CardUpcoming event={item}/>
        </div>
      ))}
    </div>
  );
};

export default CardUpcomingContainer;
