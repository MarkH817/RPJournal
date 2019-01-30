import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'nprogress/nprogress.css'
import '@reach/skip-nav/styles.css'
import 'draft-js/dist/Draft.css'
import 'draftail/dist/draftail.css'

const theme = {
  white: '#ffffff',
  offWhite: '#dfdfdf',
  lightGray: '#c3c3c3',
  gray: '#767676',
  darkGray: '#525252',
  black: '#353535',
  primaryColor: '#ea45ba',
  accentColor: ''
}

const GlobalStyles = createGlobalStyle`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  body {
    color: ${props => props.theme.black};
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1em;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${props => props.theme.primaryColor};
  }
`

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />

      {children}
    </React.Fragment>
  </ThemeProvider>
)

export default Theme