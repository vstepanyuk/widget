import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export default function createApolloClient(uri, apiKey) {
  const httpLink = createHttpLink({ uri })
  const authLink = setContext((_, { headers }) => ({
    headers: { ...headers, 'x-api-key': apiKey }
  }))

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return client
}
