const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");

class Posts {
    static col() {
        return db.collection("Posts");
    }

    static async findAll() {
        const result = await this.col().find().toArray();
        return result;
    }

    static async findByPk(id) {
        const result = await this.col().findOne({ _id: new ObjectId(id) });
        return result;
    }

    static async create(newPosts) {
        newPosts.createdAt = newPosts.updatedAt = new Date().toISOString();
        newPosts.comments = [];
        newPosts.likes = [];
        // newPosts.authorId = new ObjectId(String(authorId))
        // newPosts.author = {_id: new ObjectId(String(author._id)), username: author.username, email: author.email}
        const result = await this.col().insertOne(newPosts);
        return {
            ...newPosts,
            _id: result.insertedId,
        };
    }

    static async deleteById(id) {
        await this.col().deleteOne({
            _id: new ObjectId(id),
        });
    }

    static async addComment(payload, postId) {
        payload.createdAt = payload.updataedAt = new Date();

        const result = await this.col().updateOne(
            {
                _id: new ObjectId(String(postId)),
            },
            {
                $push: {
                    comments: payload,
                },
            }
        );
        return result;
    }

    static async addLike(username, postId) {
        let findLike = await this.col().findOne({
            "likes.username": username,
            _id: new ObjectId(postId),
        });
        if (findLike) {
            throw new Error("User Already like post");
        } else {
            const result = await this.col().updateOne(
                {
                    _id: new ObjectId(postId),
                },
                {
                    $push: {
                        likes: {
                            username: username,
                            createdAt: new Date(),
                            updataedAt: new Date(),
                        },
                    },
                }
            );
        }

        return "User Success Like Post";
    }
}

module.exports = Posts;
