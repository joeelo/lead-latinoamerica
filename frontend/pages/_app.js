import { createGlobalStyle, ThemeProvider } from 'styled-components'; 
import Head from 'next/head';
import { useState } from 'react'; 
import { LanguageWrapper } from '@/context/LanguageContext';
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import { Provider as AuthProvider } from 'next-auth/client';
import { getSession } from "next-auth/client"
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { UserWrapper } from '@/context/UserContext';

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
    }

    h1, h2 {
		font-family: "Montserrat", sans-serif !important;
		font-weight: 600;
    }

    p, div, span, textarea {
		font-family: "source sans pro", sans-serif;
    }
`

const theme = {
	colors: {
		primary: '#0077B6',
		darkBlue: '#1F2041', 
		cyan: '#0077B6', 
		red: '#DA5552',
		cultured: '#F8FAFA', 
		white: '#FFFFFF', 
		darkText: '#222222'
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

config.autoAddCss = false;

const App = ({ Component, pageProps }) => {

	const props = pageProps || {}

	const [queryClient] = useState(() => new QueryClient())
	// TODO: Import user context when it's necessary. 

	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com"></link>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap&family=Source+Sans+Pro:wght@300;500;700;900&display=swap" rel="stylesheet"></link> 
				<style>{dom.css()}</style>
			</Head>
			<GlobalStyle />
			<QueryClientProvider client={queryClient}>
				<AuthProvider session={props.session || {}}>
						<ThemeProvider theme={theme}>
							<LanguageWrapper>
								<Component {...pageProps} />
							</LanguageWrapper>
						</ThemeProvider>
				</AuthProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	)
}

App.getInitialProps = async ({ctx}) => {
	const session = await getSession(ctx)
	return ({props: {session}})
}

export default App;