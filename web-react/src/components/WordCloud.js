import React, { useRef, useEffect, useState, useMemo } from 'react'
import { useQuery, gql } from '@apollo/client'
import Wordcloud from 'wordcloud'
import { Typography, Paper } from '@material-ui/core'
import moment from 'moment'
import getDay from '../utils/getDay'

const WORD_QUERY = gql`
  query TodaysWords($filter: WordFilter!, $dayFilter: DayFilter!) {
    day(filter: $dayFilter) {
      _id
      date {
        formatted
      }
      totalSubmissions
    }

    Word(filter: $filter) {
      _id
      value
      count
    }
  }
`

export default ({ day }) => {
  const [canvasWidth, setCanvasWidth] = useState()
  const canvas = useRef()
  const { data, loading, error } = useQuery(WORD_QUERY, {
    variables: { filter: { day }, dayFilter: { day } },
  })

  const { Word: words } = !!data && data

  const windowResize = () => {
    setCanvasWidth(window.innerWidth * window.innerHeight)
    resizeCanvas()
  }

  useEffect(() => {
    if (words && canvas.current) {
      const list = words.map((word) => [
        word.value.toLocaleUpperCase(),
        word.count < 5 ? 5 : word.count >= 12 ? 12 : word.count,
      ])

      new Wordcloud(canvas.current, {
        list,
        weightFactor: 3,
        backgroundColor: 'lightgrey',
        shrinkToFit: true,
        drawOutOfBound: false,
        //   gridSize: 20,
      })
    }

    if (window) {
      window.addEventListener('resize', windowResize)
    }

    return () => window.removeEventListener('resize', windowResize)
  })

  const resizeCanvas = () => {
    const ctx = canvas.current.getContext('2d')
    ctx.canvas.width = window.innerWidth * 0.9
    console.log(ctx.canvas.width)
  }

  const isToday = data && data.day?.date.formatted === getDay()

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
      {!loading && data && (
        <Paper style={{ padding: '20px 0px', margin: '20px 0px' }}>
          <Typography variant={'h6'} color={'primary'}>
            {`${moment(day).format('LL')}${isToday ? ` (today)` : ''}`}
          </Typography>
          {window && (
            <div>
              <canvas
                ref={canvas}
                width={window.innerWidth * 0.9}
                height={'500'}
                style={{ backgroundColor: 'lightgrey' }}
              />
            </div>
          )}
          <Typography variant={'h6'} color={'primary'}>
            Total Word Submissions: {data.day?.totalSubmissions || 0}
          </Typography>
        </Paper>
      )}
    </div>
  )
}
