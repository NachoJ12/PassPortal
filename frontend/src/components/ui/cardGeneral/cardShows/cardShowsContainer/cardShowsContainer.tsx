import React, { FC } from "react";
import { Event } from '@/types/events'
import CardsShowEvents from '@/components/ui/cardGeneral/cardShows/cardShows'

interface Props {
  events: Event[];
}

export const CardShowsContainer: FC<Props> = ({ events }) => {
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
