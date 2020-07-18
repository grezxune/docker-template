import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { UserProfile } from './pages/UserProfile'
import { NotFound } from './pages/NotFound'
import { ProtectedRoute } from './components/ProtectedRoute'

export const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <ProtectedRoute
            path="/userProfile"
            component={UserProfile}
            exact={true}
          />
          <Route path="/register" component={Register} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/" component={Home} exact={true} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
