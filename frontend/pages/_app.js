import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import withApollo from '../lib/withApollo';
import gql from 'graphql-tag';
import Layout from '../components/Layout';

const ME_QUERY = gql`
{
    me {
        id,
        name
    }
}`;

function MyApp({ Component, pageProps, User, apollo }) {
    return <ApolloProvider client={apollo}>
                <Head>
                    <title>Speed Car</title>
                </Head>
                <Layout User={User}>
                    <Component {...pageProps} />
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
    const queryResult = await apolloClient.query({query: ME_QUERY});

    if (queryResult.data.me) {
        appProps.User = queryResult.data.me;
    } else {
        appProps.User = null;
    }

    return { ...appProps };
  }

export default withApollo(MyApp)