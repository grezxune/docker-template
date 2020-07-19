import React from 'react'
import { useUsersQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, error } = useUsersQuery({ fetchPolicy: 'network-only' })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return null
  }
  return (
    <Layout>
      <div>Users:</div>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.email}, {user.id}
          </li>
        ))}
      </ul>
    </Layout>
  )
}
