const { ObjectId } = require("mongodb");
const { db } = require("../config/mongodb");
const { hashPassword } = require("../helpers/bcrypt");

class User {
    static col() {
        return db.collection("User");
    }

    static async findAll() {
        const result = await this.col().find().toArray();
        return result;
    }

    static async findByPk(id) {
        const result = await this.col().findOne({ _id: new ObjectId(id) });
        return result;
    }

    static async findUserByEmail(email) {
        const results = await this.col().findOne({
            email: email,
        });
        return results;
    }

    static async register(newUser) {
        if (!newUser.username) throw new Error("Username is required");
        if (!newUser.email) throw new Error("Email is required");

        let UniqueEmailCheck = await this.findUserByEmail(newUser.email);
        if (UniqueEmailCheck) throw new Error("Email already registered");

        if (!newUser.password) throw new Error("Password is required");
        if (newUser.password.length < 5)
            throw new Error("Password min 5 Characters");

        newUser.createdAt = new Date();
        newUser.updatedAt = new Date();
        newUser.password = hashPassword(newUser.password);
        const result = await this.col().insertOne(newUser);

        return {
            ...newUser,
            _id: result.insertedId,
        };
    }

    static async login(userLogin) {
        const result = await this.col().findOne({
            username: userLogin,
        });
        // console.log(result);
        return result;
    }

    static async update(id, updateUser) {
        const result = await this.col().updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    ...updateUser,
                },
            }
        );
        return {
            ...updateUser,
            _id: id,
        };
    }

    static async deleteById(id) {
        await this.col().deleteOne({
            _id: new ObjectId(id),
        });
    }

    static async searchUser(key) {
        const user = await this.col()
            .find({
                $or: [
                    {
                        name: { $regex: key, $options: "i" },
                    },
                    {
                        username: { $regex: key, $options: "i" },
                    },
                ],
            })
            .toArray();
        return user;
    }
}

module.exports = User;
