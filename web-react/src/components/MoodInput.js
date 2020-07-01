import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { useMutation, gql } from '@apollo/client'

import getDay from '../utils/getDay'

const SUBMIT_MOOD_MUTATION = gql`
  mutation SubmitMood($value: String!, $day: String!) {
    CreateWord(value: $value, day: $day) {
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

const useCustomMutation = (formattedMood) => {
  const [submitMood] = useMutation(SUBMIT_MOOD_MUTATION, {
    variables: { value: formattedMood, day: getDay() },
  })

  return (value) =>
    submitMood({
      variables: { value, day: getDay() },
      refetchQueries: ['TodaysWords'],
    })
}

const getFilteredMood = (mood) => {
  const pattern = /[!@#$%^&*()~`,?.\\/<>0-9]/gi
  return mood.replace(pattern, '').toLocaleLowerCase()
}

export default () => {
  const [mood, setMood] = useState('')
  const submitMood = useCustomMutation()

  const submit = async () => {
    const filtered = getFilteredMood(mood).trim()
    if (!!filtered) {
      await submitMood(filtered)
      setMood('')
    }
  }

  return (
    <div>
      <TextField
        value={mood}
        onChange={(e) => setMood(getFilteredMood(e.target.value))}
        placeholder="Enter your mood"
        onKeyDown={({ keyCode }) => keyCode === 13 && submit()}
        style={{ marginRight: '20px' }}
      />
      <Button variant={'outlined'} color={'primary'} onClick={submit}>
        Submit
      </Button>
    </div>
  )
}
