const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");
const User = require("./user");

class Follow {
    static col() {
        return db.collection("Follows");
    }

    static async addFollow(payload, followingId) {
        // console.log(followerId, "<<<<< followerid")
        // console.log(payload, "<<<< payload");
        let follow = {
            followingId: new ObjectId(followingId.followingId),
            followerId: new ObjectId(payload.user._id),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        let results = await this.col().insertOne(follow);
        return follow;
    }

    static async findAllFollow(id) {
        console.log(id, "<<<<<<id");
        const user = await User.findByPk(id)
        
        console.log(user, "<<<<<<<<<user");
        
        const followings = []
        const followers = []

        const follower = await this.col().aggregate([
            {
                $match: {
                    followingId: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "followerId",
                    foreignField: "_id",
                    as: "follower"
                }
            },
            {
                $unwind: {
                    path: "$follower"
                }
            }
        ]).toArray()

        const following = await this.col().aggregate([
            {
                $match: {
                    followerId: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "followingId",
                    foreignField: "_id",
                    as: "following"
                }
            },
            {
                $unwind: {
                    path: "$following"
                }
            }
        ]).toArray()

        follower.map(item => {
            followers.push(item.follower)
        })

        following.map(item => {
            followings.push(item.following)
        })

        return {
            user,
            followers,
            followings
        }
    }
}

module.exports = Follow;
