import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Head from 'next/head';
import withApollo from '../lib/withApollo';
import Layout from '../components/Layout';
import {getUser} from '../components/Auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider, {theme} from '../theme';

function MyApp({ Component, pageProps, User, apollo }) {
    return <ApolloProvider client={apollo}>
                <Head>
                    <title>Speed Car</title>
                </Head>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Layout User={User}>
                    <Component User={User} {...pageProps} />
                  </Layout>
                </ThemeProvider>
            </ApolloProvider>
  }

  MyApp.componentDidMount = () => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
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