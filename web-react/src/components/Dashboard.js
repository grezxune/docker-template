import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Typography } from '@material-ui/core'

export default () => {
  const { loading, data, error } = useQuery(gql`
    query Test {
      day {
        date
      }
    }
  `)

  console.log(data, error)
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant={'h1'} color={'primary'}>
        Mood Cloud
      </Typography>
      <Typography variant={'h3'} color={'primary'}>
        How is the world feeling today?
      </Typography>
      <Typography variant={'h3'} color={'primary'}>
        {data?.day?.date}
      </Typography>
    </div>
  )
}
