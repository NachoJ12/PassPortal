import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import border from "../../../../../public/border.svg";

interface CardProfileProps {
  onClose: () => void;
}

const eventsReserved = [
  { amount: 2, name: "League Of Legends",date: "24-11-2023" },
  { amount: 2, name: "League Of Legends",date: "24-11-2023" },
  { amount: 2, name: "League Of Legends",date: "24-11-2023" },
  { amount: 2, name: "League Of Legends",date: "24-11-2023" },
  { amount: 2, name: "League Of Legends",date: "24-11-2023" },
  { amount: 2, name: "League Of Legends",date: "24-11-2023" },
  { amount: 2, name: "League Of Legends",date: "24-11-2023" },
  { amount: 2, name: "League Of Legends",date: "24-11-2023" },
];

export const CardProfile: React.FC<CardProfileProps> = ({ onClose }) => {
  const { data: session } = useSession();

  return (
    <div className="cardProfile" data-aos="zoom-in">
      <Image
        src={border}
        alt="border-image"
        className="image-profile"
        width={525}
        height={512}
        data-aos="zoom-in"
      />
      <div className="cardProfile-background"></div>
      <div className="cardProfile-general" data-aos="zoom-in">
        <h1 className="cardProfile-title">Profile</h1>
        <div className="cardProfile-info">
          {session?.user ? (
            <>
              <span className="cardProfile-userName">
                {session.user.username}
              </span>
            </>
          ) : (
            <ul></ul>
          )}
          <div className="cardProfile-events">
            <h2>Booked Events</h2>
          </div>
          <div className="cardProfile-description">
            {eventsReserved.map((event, index) => (
              <div key={index} className="cardProfile-chart">
                <div className="cardProfile-chart-amount">
                <span className="span-name">Amount </span>
                <span>{event.amount}</span>
                </div>
                <div className="cardProfile-chart-name">
                <span className="span-name" >Event </span>
                <span>{event.name.length > 15 ? `${event.name.slice(0, 15)}...` : event.name}</span>
                </div>
                <div className="cardProfile-chart-date">
                <span className="span-name">Date </span>
                <span>{event.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="cardProfile-close-button" onClick={onClose}>
            X
          </div>
        </div>
      </div>
    </div>
  );
};
