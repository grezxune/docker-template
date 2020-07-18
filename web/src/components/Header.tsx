import React, { useState } from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Hidden,
  Link,
  makeStyles,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import MenuDrawer from './MenuDrawer'
import { useViewerQuery } from '../generated/graphql'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    // [theme.breakpoints.up('xs')]: {
    //   justifyContent: 'flex-end',
    // },
    // [theme.breakpoints.down('xs')]: {
    //   justifyContent: 'space-between',
    // },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export const Header = () => {
  const { loading, data, error } = useViewerQuery()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const classes = useStyles()

  return (
    <div>
      <AppBar color={'primary'} position={'absolute'}>
        <Toolbar className={classes.toolbar}>
          {/* <Hidden smUp> */}
          <IconButton
            onClick={() => setIsDrawerOpen(true)}
            edge={'end'}
            color="secondary"
          >
            <Menu />
          </IconButton>
          {/* </Hidden> */}
          <Link
            href="/"
            variant={'button'}
            color={'secondary'}
            className={classes.button}
          >
            BitBelt
          </Link>
          <Link
            href="/login"
            variant={'button'}
            color={'secondary'}
            className={classes.button}
          >
            Login
          </Link>
        </Toolbar>
      </AppBar>

      <MenuDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  )
}
