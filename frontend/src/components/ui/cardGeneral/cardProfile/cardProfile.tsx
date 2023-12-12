import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import border from "../../../../../public/border.svg";

interface CardProfileProps {
  onClose: () => void;
}

interface Ticket {
  name: string;
  price: number;
  eventid: number;
  id: number;
}

interface Order {
  date_time: string;
  total_price: number;
  delivery_address: string;
  userid: number;
  ticket: Ticket[];
  id: number;
}

interface Event {
  event_id: number;
  event_name: string;
  order: Order;
}

export const CardProfile: React.FC<CardProfileProps> = ({ onClose }) => {
  const { data: session } = useSession();
  const [eventsReserved, setEventsReserved] = useState<Event[]>([]);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userid = session?.user?.userId;
        if (!userid) {
          console.error("User ID not available.");
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/user/${userid}`);
        const data = await response.json();

        console.log("API Response:", data);

        // Supongo que la respuesta ahora es un array de eventos
        const eventsData = data || [];
        setEventsReserved(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [session]);

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
              <span className="cardProfile-userName">{session.user.username}</span>
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
                  <span>{event.order.total_price}</span>
                </div>
                <div className="cardProfile-chart-type">
                  <span className="span-name">Type</span>
                  <span>
                    {event.order.ticket.map((ticket) => (
                      // Aquí puedes mostrar información específica del ticket
                      <div key={ticket.id}>
                        {ticket.name} - {ticket.price}
                      </div>
                    ))}
                  </span>
                </div>
                <div className="cardProfile-chart-name">
                  <span className="span-name">Event </span>
                  <span>{event.event_name}</span>
                </div>
                <div className="cardProfile-chart-date">
                  <span className="span-name">Date </span>
                  <span>{event.order.date_time.slice(0, 10)}</span>
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