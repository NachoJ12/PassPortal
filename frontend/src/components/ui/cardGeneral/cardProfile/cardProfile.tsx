import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import border from "../../../../../public/border.svg";

interface CardProfileProps {
  onClose: () => void;
}

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
              <span className="cardProfile-userName">{session.user.name}</span>
            </>
          ) : (
            <ul></ul>
          )}
          <div className="cardProfile-events">
            <h2>Booked Events</h2>
          </div>
          <div className="cardProfile-description">
          <div className="cardProfile-chart">
            <span>Amount: </span>
            <span>3</span>
          </div>
          <div className="cardProfile-chart">
            <span>Event: </span>
            <span>worlds</span>
          </div>
          </div>
          <div className="cardProfile-close-button" onClick={onClose}>
            X
          </div>
        </div>
      </div>
    </div>
  );
};
