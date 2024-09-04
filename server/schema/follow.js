const Follow = require("../models/follow");

const followTypeDefs = `#graphql

type Follow {
_id: String
followingId: String
followerId: String
createdAt: String
updatedAt: String
}

type FollowData {
user: User
followers: [User]
followings: [User]
}

type Query {
#follows:[Follow]
resultFollowData(usersId: String): FollowData
}

input newFollow {
followingId: String
}

type Mutation {
addFollow(follow: newFollow): Follow
}
`;

const followResolvers = {

    Query: {
        resultFollowData: async(parent, args, contextValue) => {
            const user = await contextValue.authentication()
            let result
            if(!args.usersId) {
                result = await Follow.findAllFollow(user._id)
                
            } else {
                result = await Follow.findAllFollow(args.usersId)
            }
            return result
        }
    },
    Mutation: {
        addFollow: async (parent, args, contextValue) => {
            // console.log(args, "<<<<<args");
            const user = await contextValue.authentication();
            const { follow } = args;
            let results = await Follow.addFollow({ user }, follow);
            return results;
        },

    },
};

module.exports = { followTypeDefs, followResolvers };
