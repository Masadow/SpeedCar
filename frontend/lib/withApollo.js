import withApollo from 'next-with-apollo';
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
);