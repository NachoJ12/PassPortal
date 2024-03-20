import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import BaseLayout from '@/components/layouts/base-layout'
import { getEventById } from '@/service/events-service'
import { SingleEvent } from '@/types/events'
import CardEventReservation from '@/components/ui/cardGeneral/cardEventReservation/cardEventReservation'

interface Props {
  event: SingleEvent
}

const EventPage: NextPage<Props> = ({ event }) => {
  return (
    <BaseLayout>
      <CardEventReservation event={event} />
    </BaseLayout>
  )
}
export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id: string = typeof params?.id === 'string' ? params.id : '';
  const event = await getEventById(id)
  return {
    props: {
      event,
    },
  };
};

export default EventPage

