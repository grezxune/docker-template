import React from 'react'
import { Typography } from '@material-ui/core'
import MoodInput from './MoodInput'
import WordCloud from './WordCloud'
import getDay from '../utils/getDay'
import PreviousCloudList from './PreviousCloudList'
import GoogleAd from './GoogleAd'

export default () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant={'h1'} color={'primary'}>
        Mood Cloud
      </Typography>
      <Typography variant={'h3'} color={'primary'}>
        How is the world feeling today?
      </Typography>
      <div style={{ margin: '20px 0px' }}>
        <MoodInput />
      </div>
      <WordCloud day={getDay()} />
      <PreviousCloudList />
    </div>
  )
}
