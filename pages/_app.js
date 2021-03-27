import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, *, body {
    margin: 0;
    padding: 0;
  }

  body {
    box-sizing: border-box;
    position: relative; 
    min-height: 100vh; 
    font-family: "Helvetica Neue", sans-serif;
    max-width: 100vw;
  }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
