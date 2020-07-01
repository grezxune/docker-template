import React, { useRef } from 'react'
import { useQuery, gql } from '@apollo/client'
import Wordcloud from 'wordcloud'

const WORD_QUERY = gql`
  query TodaysWords($filter: WordFilter!) {
    Word(filter: $filter) {
      _id
      value
      count
      day {
        _id
        date {
          formatted
        }
      }
    }
  }
`

export default ({ day }) => {
  const canvas = useRef()
  const { data, loading, error } = useQuery(WORD_QUERY, {
    variables: { filter: { day } },
  })

  const { Word: words } = !!data && data

  if (words && canvas.current) {
    const list = words.map((word) => [
      word.value.toLocaleUpperCase(),
      word.count < 5 ? 5 : word.count >= 12 ? 12 : word.count,
    ])
    new Wordcloud(canvas.current, {
      list,
      weightFactor: 3,
      backgroundColor: '#efefef',
      shrinkToFit: true,
      drawOutOfBound: false,
      //   gridSize: 20,
    })
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column nowrap',
        alignItems: 'center',
      }}
    >
      {loading && <h4>Loading...</h4>}
      {error && <h4>Error... {error.message}</h4>}
      <div>
        <canvas ref={canvas} width={'900'} height={'500'} />
      </div>
    </div>
  )
}
