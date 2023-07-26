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

const theme = createTheme({
	typography: {
		fontFamily: [
			'"Lato"',
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
})

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