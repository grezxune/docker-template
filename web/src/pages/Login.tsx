import React, { useState, ComponentProps, ReactPropTypes } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { SignInForm } from '../components/forms/SignIn'
import { SignUpForm } from '../components/forms/SignUp'
import { Tab, Tabs, TabProps, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paperContainer: {
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
  loginTitle: {
    margin: '0px 0px 20px 0px',
  },
  textInput: {
    margin: '20px 0px',
  },
  submitButton: {},
}))

export const Login: React.FC<RouteComponentProps> = (props) => {
  const [currentTab, setCurrentTab] = useState(0)
  const classes = useStyles()

  const changeTab = (event: React.ChangeEvent<{}>, newValue: any) => {
    setCurrentTab(newValue)
  }

  return (
    <Layout>
      <div className={classes.container}>
        <Paper className={classes.paperContainer} elevation={24}>
          <Tabs value={currentTab} onChange={changeTab}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          <div hidden={currentTab !== 0}>
            <SignInForm {...props} />
          </div>
          <div hidden={currentTab !== 1}>
            <SignUpForm {...props} />
          </div>
        </Paper>
      </div>
    </Layout>
  )
}
