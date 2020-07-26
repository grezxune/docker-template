import React, { useEffect } from 'react'
import { Redirect, Route, useLocation } from 'react-router'
import { useViewerQuery } from '../generated/graphql'
import { RouteProps } from 'react-router-dom'
import { redirectPathOnAuthentication } from '../apollo/cache'

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const { data, loading } = useViewerQuery()
  const currentLocation = useLocation()

  useEffect(() => {
    ;(async () => {
      if (!loading && !data?.viewer) {
        console.log('Setting redirect path to:', currentLocation.pathname)
        redirectPathOnAuthentication(currentLocation.pathname)
        console.log('After set:')
      }
    })()
  }, [data, loading])

  if (loading) {
    return <div>Loading...</div>
  }

  console.log(loading, data?.viewer)
  console.log(!loading && !data?.viewer)

  console.log('In protected route...', props)
  if (!data?.viewer) {
    const renderComponent = () => <Redirect to={{ pathname: '/auth' }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  } else {
    return <Route {...props} />
  }
}
