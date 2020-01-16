import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head'
import withApollo from '../lib/withApollo'

function MyApp({ Component, pageProps, apollo }) {
    return <ApolloProvider client={apollo}>
                <Head>
                    <title>Speed Car</title>
                </Head> 
                <Component {...pageProps} />
            </ApolloProvider>
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // MyApp.getInitialProps = async (appContext) => {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  
  export default withApollo(MyApp)