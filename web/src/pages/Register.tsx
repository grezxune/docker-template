import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { SignUpForm } from '../components/forms/SignUp'

export const Register: React.FC<RouteComponentProps> = (props) => {
  return (
    <Layout>
      <SignUpForm {...props} />
    </Layout>
  )
}
