const User = require("../models/user");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const userTypeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String
        email: String
        password: String,
        access_token: String
    }

    type Query {
        users: [User]
        usersById(_id: String!): User
        searchUser(key: String): [User]
    }

    input userForm {
        name: String
        username: String
        email: String
        password: String   
    }

    input loginForm {
        username: String
        password: String
    }

    type Mutation {
        addUser(form: userForm): User
        updateUser(id: String!, form: userForm): User
        deleteUser(id: String!): String
        loginForm(username: String, password: String): User
    }
`;
const userResolvers = {
    Query: {
        users: async () => {
            return await User.findAll();
        },
        usersById: async (parent, {_id}, contextValue) => {
            const user = contextValue.authentication()
            const result =  await User.findByPk(_id);
            // console.log(_id, "id<<<<<<");
            // console.log(result, "<<< result");
            
            return {
                ...result
            }
        },
            
        searchUser: async(parent, args) => {
            const {key} = args
            const user = await User.searchUser(key)
            return user
        }
    },
    Mutation: {
        addUser: async (parent, { form }) => {
            const result = await User.register(form);
            return result;
        },
        updateUser: async (parent, { id, form }) => {
            const result = await User.update(id, form);
            return result;
        },
        deleteUser: async (parent, args) => {
            const { id } = args;
            await User.deleteById(id);
            return "Delete User berhasil !";
        },
        loginForm: async (parent, { username, password }) => {

            const result = await User.login(username);

            // console.log("result");
            
            if (!username || !password) throw new Error("User not found");

            const isPasswordValid = comparePassword(password, result.password);
            

            if (!isPasswordValid) throw new Error("Email or Password Invalid") 

            
            result.access_token = signToken({_id: result._id})
            
            return result
        },
    },
};

module.exports = {
    userTypeDefs,
    userResolvers,
};
