// @ts-nocheck
import React, { Dispatch, SetStateAction } from 'react'
import {
  Hidden,
  Drawer,
  List,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Person, ExitToApp, Home } from '@material-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { useLogoutMutation, useViewerQuery } from '../generated/graphql'
import { setAccessToken } from '../accessToken'

function ListItemLink(props) {
  const { icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

export default ({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { loading, data, error } = useViewerQuery()
  const [logout, { client }] = useLogoutMutation()
  const history = useHistory()

  const drawer = (
    <List>
      <ListItemLink icon={<Home />} primary={'Home'} to="/" />
      {data?.viewer && !loading ? (
        <>
          <ListItemLink
            icon={<Person />}
            primary={'User Profile'}
            to="/userProfile"
          />
          <ListItem
            button
            onClick={async () => {
              await logout()
              setAccessToken('')
              await client?.resetStore()
              history.push('/')
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={'Sign Out'} />
          </ListItem>
        </>
      ) : (
        <>
          <ListItemLink icon={<ExitToApp />} primary={'Sign In'} to="/auth" />
          <ListItemLink icon={<Home />} primary={'Sign Up'} to="/auth/1" />
        </>
      )}
    </List>
  )

  return (
    <>
      {/* <Hidden xsDown>
        <Drawer
          anchor={'left'}
          variant={'permanent'}
          open
          onClose={() => setIsDrawerOpen(false)}
          style={{ display: 'block', position: 'relative' }}
        >
          {drawer}
        </Drawer>
      </Hidden>

      <Hidden smUp>
        <Drawer
          anchor={'left'}
          variant={'temporary'}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          {drawer}
        </Drawer>
      </Hidden> */}
      <Drawer
        anchor={'left'}
        variant={'temporary'}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
    </>
  )
}
