import BaseLayout from '@/components/layouts/base-layout'
import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { getEvents } from '@/service/events-service'
import { Event } from '@/data/cardItems'
import { CardEventContainer } from '@/components/ui/cardEventContainer/cardEventContainer'

interface Props {
  events: Event[]
}


const Events: NextPage<Props> = ({ events }) => {
  return (
    <BaseLayout>
      <CardEventContainer events={events} />
    </BaseLayout>
  )
}

export default Events;

export const getServerSideProps: GetServerSideProps = async ({ }) => {
  
  const events = await getEvents()

  return {
    props: {
      events
    }
  }
}
