import '../styles/global.css'
import { CacheProvider } from '@emotion/react'
/* eslint-disable @next/next/no-page-custom-font */
import 'react-toastify/dist/ReactToastify.css'
import { config, dom } from "@fortawesome/fontawesome-svg-core"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider, createGlobalStyle } from 'styled-components' 
import { Analytics } from '@vercel/analytics/react'
import { Provider as AuthProvider } from 'next-auth/client'
import createEmotionCache from '@/createEmotionCache'
import { getSession } from "next-auth/client"
import Head from 'next/head'
import { LanguageWrapper } from '@/context/LanguageContext'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { useState } from 'react' 

const theme = {
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
	fonts: {
		mont: 'Montserrat', 
		sans: 'source sans pro',
	}, 
	fontSizes: {
		extraLarge: '48px', 
		large: '34px', 
		regular: '24px', 
		small: '12px',
		body: '24px'
	}
}

const GlobalStyle = createGlobalStyle`
  	html, *, body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		box-sizing: border-box;
		position: relative; 
		min-height: 100vh; 
		font-family: "Helvetica Neue", sans-serif;
		max-width: 100vw;
		font-weight: 300;
		overflow-x: hidden;
	}

	h1, h2 {
		font-family: "Montserrat", sans-serif !important;
		font-weight: 600;
	}

	p, div, span, textarea {
		font-family: "source sans pro", sans-serif;
	}

	.next-image {
		zIndex: -1 !important; 
		position: 'absolute' !important;
	}
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid ${theme.colors.cyan};
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: ${theme.colors.cyan} transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

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
				<GlobalStyle />
				<QueryClientProvider client={queryClient}>
					<AuthProvider session={props.session || {}}>
							<ThemeProvider theme={theme}>
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