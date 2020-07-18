import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { ApolloProvider } from '@apollo/client'
import { App } from './App'
import { client } from './apollo'

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#36454f',
    },
    secondary: {
      main: '#6ed3cf',
    },
  },
})

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
