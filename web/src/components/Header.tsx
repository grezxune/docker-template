import React, { useState } from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Hidden,
  Link,
  makeStyles,
  ButtonGroup,
  Button,
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
          <Button>
            <Link
              href="/"
              variant={'button'}
              color={'secondary'}
              className={classes.button}
            >
              BitBelt
            </Link>
          </Button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!data?.viewer ? (
              <>
                <ButtonGroup color={'secondary'} variant={'text'}>
                  <Button>
                    <Link href="/auth" variant={'button'} color={'secondary'}>
                      Sign In
                    </Link>
                  </Button>
                  <Button>
                    <Link href="/auth/1" variant={'button'} color={'secondary'}>
                      Sign Up
                    </Link>
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <Link
                  href="/userProfile"
                  variant={'button'}
                  color={'secondary'}
                  className={classes.button}
                >
                  {data?.viewer.email}
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <MenuDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </div>
  )
}
