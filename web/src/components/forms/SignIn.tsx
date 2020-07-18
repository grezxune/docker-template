import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Button, makeStyles, TextField } from '@material-ui/core'

import {
  useLoginMutation,
  ViewerQuery,
  ViewerDocument,
} from '../../generated/graphql'
import { setAccessToken } from '../../accessToken'

const useStyles = makeStyles((theme) => ({
  loginTitle: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  textInput: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  submitButton: {},
}))

export const SignInForm: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()
  const classes = useStyles()
  const { data } = useQuery(gql`
    query RedirectPathOnAuthentication {
      redirectPathOnAuthentication @client
    }
  `)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        const response = await login({
          variables: {
            email,
            password,
          },
          update: (store, { data }) => {
            if (!data) {
              return null
            }

            store.writeQuery<ViewerQuery>({
              query: ViewerDocument,
              data: {
                viewer: data.login.user,
              },
            })
          },
        })

        if (response?.data) {
          setAccessToken(response?.data?.login.accessToken)
        }

        history.push(data?.redirectPathOnAuthentication || '/')
      }}
    >
      <div className={classes.textInput}>
        <TextField
          required={true}
          type={'text'}
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
          Sign In
        </Button>
      </div>
    </form>
  )
}
