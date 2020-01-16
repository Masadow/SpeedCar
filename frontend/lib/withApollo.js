import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { graphql_url } from '../config';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: graphql_url,
      cache: new InMemoryCache().restore(initialState || {})
    })
);