import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Header } from './Header'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '100vh',
  },
  appBar: {
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    height: `calc(100vh - ${
      (theme.mixins.toolbar.minHeight as number) + 20
    }px)`,
  },
}))

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.appBar}>
        <Header />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  )
}
