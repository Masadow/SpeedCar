/*import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { graphql_url } from '../config';
import nextCookie from 'next-cookies'
import Cookies from 'js-cookie';

export default withApollo(
    ({ ctx, headers, initialState }) => {
        const client = new ApolloClient({
            uri: graphql_url,
            cache: new InMemoryCache().restore(initialState || {}),
            request: (operation) => {
                let token = null;
                if (ctx) {
                    //We must use nextCookie instead of Cookies here because it won't work server side
                    const { authToken } = nextCookie(ctx);
                    token = authToken;
                } else {
                    token = Cookies.get('authToken');
                }
                operation.setContext({
                    headers: {
                        Authorization: token
                    }
                });
            }
        });
        return client;
    }
);*/

import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
//import ApolloClient, { InMemoryCache } from "apollo-boost";
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import { setContext } from 'apollo-link-context';
import Cookies from 'js-cookie';
import nextCookie from 'next-cookies'
import { graphql_url } from '../config';
import Router from 'next/router';

let globalApolloClient = null

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, authToken, ...pageProps }) => {
    const token = pageProps.pageProps.authToken || authToken;
    const client = apolloClient || initApolloClient(apolloState, token ? token : Cookies.get('authToken'))
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx

      // We must use nextCookie instead of Cookies here because it won't work server side
      const { authToken } = nextCookie(ctx.ctx);

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient({}, authToken))

      // Add apolloClient to the context of any component
      ctx.ctx.apolloClient = apolloClient;

      // Run wrapped getInitialProps methods
      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      pageProps.authToken = authToken;

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloState,
        authToken
      }
    }
  }

  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState, token) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, token)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, token)
  }

  return globalApolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}, token) {
    const graphqlLink = new HttpLink({
        uri: graphql_url, // Server URL (must be absolute),
		    //credentials: 'include',
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
      });
    
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: token
            }
        };
    });

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
        link: authLink.concat(graphqlLink),
        cache: new InMemoryCache().restore(initialState),
    })
}