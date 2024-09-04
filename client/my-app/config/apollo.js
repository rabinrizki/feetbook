import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from "@apollo/client";
import {setContext} from '@apollo/client/link/context'
import * as SecureStore from 'expo-secure-store'

const httpLink = createHttpLink({
    // uri: 'http://localhost:3000/',
    uri: 'https://api.cbasic.my.id/'
    // uri: "https://8897-139-228-111-126.ngrok-free.app"
})

const authLink = setContext(async (_,{headers}) => {
    const token = await SecureStore.getItemAsync('access_token')

    return {
        headers: {
            ...headers,
            authorization: token? `Bearer ${token}`:''
        }
    }
})

const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default client