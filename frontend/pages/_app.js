import '../styles/global.css'
/* eslint-disable @next/next/no-page-custom-font */
import 'react-toastify/dist/ReactToastify.css'

import { CacheProvider } from '@emotion/react'
import { config, dom } from "@fortawesome/fontawesome-svg-core"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react'
import Head from 'next/head'
import { Provider as AuthProvider } from 'next-auth/client'
import { getSession } from "next-auth/client"
import { useState } from 'react' 
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"

import { LanguageWrapper } from '@/context/LanguageContext'
import createEmotionCache from '@/createEmotionCache'

// const theme = {
// 	colors: {
// 		primary: '#0077B6',
// 		darkBlue: '#1F2041', 
// 		cyan: '#0077B6', 
// 		red: '#DA5552',
// 		cultured: '#F8FAFA', 
// 		white: '#FFFFFF', 
// 		darkText: '#222222',
// 		lightGrey: '#DFDFDF',
// 	},
// 	fonts: {
// 		mont: 'Montserrat', 
// 		sans: 'source sans pro',
// 	}, 
// 	fontSizes: {
// 		extraLarge: '48px', 
// 		large: '34px', 
// 		regular: '24px', 
// 		small: '12px',
// 		body: '24px'
// 	}
// }

const theme = createTheme({
	typography: {
		fontFamily: [
			'"Montserrat"', 
			'source sans pro', 
			'"Helvetica Neue"', 
			'Arial',
      'sans-serif',
		].join(',')
	}, 
	colors: {
		primary: '#0077B6',
		darkBlue: '#1F2041', 
		cyan: '#0077B6', 
		red: '#DA5552',
		cultured: '#F8FAFA', 
		white: '#FFFFFF', 
		darkText: '#222222',
		lightGrey: '#DFDFDF',
	},
	components: {
		MuiCssBaseline: {
			"@global": {
				margin: 0, 
				padding: 0, 
				boxSizing: 'border-box'
			}, 
			body: {
				boxSizing: 'border-box', 
				position: 'relative', 
				minHeight: '100vh',
				height: '100vh',
				fontFamily: "Helvetica Neue sans-serif",
				maxWidth: '100vw',
				fontWeight: 300,
				overflowX: 'hidden',
			},
			h1: {
				lineHeight: '20px'
			}
		}
	}
})

// const GlobalStyle = createGlobalStyle`
//   	html, *, body {
// 		margin: 0;
// 		padding: 0;
// 		box-sizing: border-box;
// 	}

// 	body {
// 		box-sizing: border-box;
// 		position: relative; 
// 		min-height: 100vh; 
// 		height: 100vh;
// 		font-family: "Helvetica Neue", sans-serif;
// 		max-width: 100vw;
// 		font-weight: 300;
// 		overflow-x: hidden;
// 	}

// 	h1, h2 {
// 		font-family: "Montserrat", sans-serif !important;
// 		font-weight: 600;
// 	}

// 	p, div, span, textarea {
// 		font-family: "source sans pro", sans-serif;
// 	}
// `

config.autoAddCss = false;

const clientSideEmotionCache = createEmotionCache()

const App = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {

	const props = pageProps || {}

	const [queryClient] = useState(() => new QueryClient())
	// TODO: Import user context when it's necessary. 

	return (
		<>
			<CacheProvider value={emotionCache}>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com"></link>
					<link 
						href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap&family=Source+Sans+Pro:wght@300;500;700;900&display=swap"
						rel="stylesheet"></link> 
					<style>{dom.css()}</style>
				</Head>
				<QueryClientProvider client={queryClient}>
					<AuthProvider session={props.session || {}}>
							<ThemeProvider theme={theme}>
								<CssBaseline />
								<LanguageWrapper>
									<Component {...pageProps} />
									<Analytics />
								</LanguageWrapper>
							</ThemeProvider>
					</AuthProvider>
					<ToastContainer />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</CacheProvider>
		</>
	)
}

App.getInitialProps = async ({ctx}) => {
	const session = await getSession(ctx)
	return ({props: {session}})
}

export default App;