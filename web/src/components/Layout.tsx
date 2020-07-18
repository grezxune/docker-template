import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Header } from './Header'

const useStyles = makeStyles((theme) => ({
  appBar: {
    ...theme.mixins.toolbar,
  },
}))

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.appBar}>
        <Header />
      </div>
      {children}
    </div>
  )
}
