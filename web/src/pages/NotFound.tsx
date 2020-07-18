import React from 'react'
import { useUsersQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'
import { Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

interface Props {}

export const NotFound: React.FC<Props> = () => {
  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <h1>Uh oh... we couldn't find what you're looking for.</h1>
        <h4>
          Return{' '}
          <Link to="/" component={RouterLink} color="secondary">
            home
          </Link>
        </h4>
      </div>
    </Layout>
  )
}
