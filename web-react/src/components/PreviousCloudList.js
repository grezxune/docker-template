import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Typography } from '@material-ui/core'

import getDay from '../utils/getDay'
import WordCloud from './WordCloud'

const DASHBOARD_QUERY = gql`
  query Dashboard {
    Day(orderBy: date_desc) {
      _id
      date {
        formatted
      }
    }
  }
`

export default () => {
  const { data } = useQuery(DASHBOARD_QUERY)
  const day = getDay()

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      {data && (
        <>
          <Typography variant={'h4'} color={'primary'}>
            Previous Clouds
          </Typography>
          {data.Day.filter(({ date: { formatted } }) => formatted !== day).map(
            ({ date: { formatted } }) => (
              <div key={`wordcloud-${formatted}`}>
                <Typography variant={'body2'} color={'primary'}>
                  {formatted}
                </Typography>
                <WordCloud day={formatted} />
              </div>
            )
          )}
        </>
      )}
    </div>
  )
}
