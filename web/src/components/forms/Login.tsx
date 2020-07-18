import React, { useState } from 'react'
import {
  useLoginMutation,
  ViewerQuery,
  ViewerDocument,
} from '../../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'
import { setAccessToken } from '../../accessToken'
import { useQuery, gql } from '@apollo/client'

export const LoginForm: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()
  const { data, loading, error } = useQuery(gql`
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

        console.log('Pushing this:', data?.redirectPathOnAuthentication)
        history.push(data?.redirectPathOnAuthentication || '/')
      }}
    >
      <div>
        <input
          value={email}
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
