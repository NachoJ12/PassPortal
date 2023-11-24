import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import BaseLayout from '@/components/layouts/base-layout'
import { getEventsById } from '@/service/events-service'
import { Event } from '@/data/cardItems'
import CardEventReservation from '@/components/ui/cardGeneral/cardEventReservation/cardEventReservation'

interface Props {
  event: Event
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
  const event = await getEventsById(id);
  return {
    props: {
      event,
    },
  };
};

export default EventPage

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const id: string = typeof params?.id === 'string' ? params.id : ''
//     const event = await getEventsById(id)
//     return {
//         props: {
//             event
//         }
//     }
// }
