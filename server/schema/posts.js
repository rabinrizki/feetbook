const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");
const Posts = require("../models/posts");
const redis = require("../config/redis");

const postsTypeDefs = `#graphql

type Comment{
    content: String
    username: String
    createdAt: String
    updatedAt: String
    }

type Like{
    username: String
    createdAt: String
    updatedAt: String
    }

type Posts {
    _id: String
    content: String
    tags: [String]
    imgUrl: String
    authorId: String
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    author: User
    }
    
type Query {
    posts: [Posts],
    postById(_id: String): Posts
}

input postForm {
    content: String
    tags: [String]
    imgUrl: String
}

type Mutation {
    addPost(form: postForm): Posts
    addComment(content: String, postId: String): String
    addLike(postId: String): String
    }
`;

const postsResolvers = {
    Query: {
        posts: async (parent, args, contextValue) => {
            try {
                const user = await contextValue.authentication(); 
            console.log(redis,"<<<<<<<<<<<<<<<<<<<<<<<test");
            
            const postsChace = await redis.get("Posts:all");
            if (postsChace) {
                return JSON.parse(postsChace);
            }
            console.log(user);
            console.log(postsChace, "post<<<<<<<<<<<<<<");
            
            
            const pipeline = []

            pipeline.push({
                $lookup: {
                    from: 'User',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'author'
                }
            })

            pipeline.push({
                $unwind: {
                    path: '$author'
                }
            })


            pipeline.push({
                $sort: {
                    createdAt: 1
                }
            })
            console.log(pipeline, "pipeline<<<<<<<<<<<");
            
            const result = await db.collection('Posts').aggregate(pipeline).toArray()
            console.log(result, "result<<<<<<<<<<<<");
            
            await redis.set("Posts:all", JSON.stringify(result));
            return result;
            } catch (error) {
                console.log(error);
            }
            
        },

        postById: async (parent, { _id }, contextValue) => {
            const user = contextValue.authentication();
            const posts = await Posts.findByPk(_id);

            return {
                ...posts,
            };
        },
    },
    Mutation: {
        addPost: async (parent, { form }, contextValue) => {
            if (!form.content) throw new Error("Content is Required");
            const user = await contextValue.authentication();
            form.authorId = user._id;
            console.log(user,'<<<',form);
            
            const result = await Posts.create(form);
            await redis.del("posts:all");
            return result;
        },

        addComment: async (parent, args, contextValue) => {
            const { content, postId } = args;
            const user = await contextValue.authentication();
            const username = user.username;

            const result = await Posts.addComment(
                { content, username },
                postId
            );
            await redis.del("posts:all")
            return "Add Comment success";
        },

        addLike: async (parent, args, contextValue) => {
            const { postId } = args;
            const user = await contextValue.authentication();``
            // const username = user.username
            await Posts.addLike(user.username, postId);
            await redis.del("posts:all");
            return "User Success Like Post";
        },
    },
};

module.exports = { postsTypeDefs, postsResolvers };
