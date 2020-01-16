import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import withApollo from '../lib/withApollo';
import Layout from '../components/Layout';
import {getUser} from '../components/Auth';

function MyApp({ Component, pageProps, User, apollo }) {
    return <ApolloProvider client={apollo}>
                <Head>
                    <title>Speed Car</title>
                </Head>
                <Layout User={User}>
                    <Component User={User} {...pageProps} />
                </Layout>
            </ApolloProvider>
  }
  
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    //Fetch the logged user
    const apolloClient = appContext.ctx.apolloClient;
    appProps.User = await getUser(appContext.ctx.apolloClient);

    return { ...appProps };
  }

export default withApollo(MyApp)