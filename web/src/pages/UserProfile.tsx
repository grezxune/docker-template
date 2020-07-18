import React from 'react'
import { useViewerQuery } from '../generated/graphql'
import { Layout } from '../components/Layout'

export const UserProfile = () => {
  const { loading, data, error } = useViewerQuery()

  console.log(data)
  return (
    <Layout>
      <div>
        {loading
          ? 'loading...'
          : error
          ? 'Error'
          : !data?.viewer
          ? 'No Data'
          : `Worked - your email is ${data.viewer?.email}`}
      </div>
    </Layout>
  )
}
