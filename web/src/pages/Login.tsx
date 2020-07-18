import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { LoginForm } from '../components/forms/Login'

export const Login: React.FC<RouteComponentProps> = (props) => {
  return (
    <Layout>
      <LoginForm {...props} />
    </Layout>
  )
}
