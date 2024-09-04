require('dotenv').config()
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { verifyToken } = require('./helpers/jwt');
const User =  require('./models/user')

const {userTypeDefs, userResolvers} = require("./schema/user");
const {postsTypeDefs, postsResolvers} = require("./schema/posts")
const {followTypeDefs, followResolvers} = require("./schema/follow")

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postsTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postsResolvers, followResolvers],
    introspection:true
})

startStandaloneServer(server, {
    listen: { port : 3000 },
    context: async ({ req }) => {
        async function authentication() {
            const authorization = req.headers.authorization || ""
            if(!authorization) throw new Error("Invalid token");
            const [type, token] = authorization.split(' ')
            if(type !== "Bearer") throw new Error("Invalid token");
            // console.log(token);
            
            const payload = verifyToken(token)
            
            const user = await User.findByPk(payload._id)

            return user
            
        }
            return{
                authentication
            }
    }
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);    
})