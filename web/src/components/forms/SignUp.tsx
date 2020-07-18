import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useRegisterMutation } from '../../generated/graphql'
import { Button, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  textInput: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  submitButton: {},
}))

export const SignUpForm: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register] = useRegisterMutation()
  const classes = useStyles()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const response = await register({
          variables: {
            email,
            password,
          },
        })

        history.push('/')
      }}
    >
      <div className={classes.textInput}>
        <TextField
          required={true}
          name={'email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={'Email'}
        />
      </div>
      <div className={classes.textInput}>
        <TextField
          required={true}
          type={'password'}
          name={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={'Password'}
        />
      </div>
      <div className={classes.submitButton}>
        <Button type={'submit'} color={'secondary'} variant={'contained'}>
          Sign Up
        </Button>
      </div>
    </form>
  )
}
