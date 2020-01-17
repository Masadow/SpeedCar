import Router from 'next/router';
import { Component } from 'react'
import gql from 'graphql-tag';

const ME_QUERY = gql`
{
    me {
        id,
        name
    }
}`;

export async function getUser(apolloClient) {
    const queryResult = await apolloClient.query({query: ME_QUERY});
    return queryResult.data.me || null;
}

export const withAuth = WrappedComponent =>
  class AuthorizedComponent extends Component {
    static async getInitialProps (ctx) {

        //Check if the page have a getInitialProps and call it
        const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

        // Probably a better way to handle this since it de-optimizes the static optimizations (because of getInitialProps)
        // If the user is not logged, redirect him to the login page
        const user = await getUser(ctx.apolloClient);
        if (!user) {
            const isServer = typeof window === 'undefined';
            const redirectTo = '/login';
            if (isServer) {
                ctx.res.writeHead(302, {
                    Location: redirectTo
                })
                ctx.res.end()
            } else {
                Router.push(redirectTo);
            }
        }

        // IMPORTANT:
        // Return a useless user to remove a warning from nextjs, not really cool, I'll figure out a better way to catch this later
        return { ...componentProps, user }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
}
