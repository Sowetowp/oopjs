import mongoose from 'mongoose';

class User {
    constructor() {
        const userSchema = new mongoose.Schema({
            firstName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            role: { type: String, required: true, enum: ["admin", "superadmin", "student", "teacher"] },
        });

        userSchema.index({ _id: 1, email: 1, __t: 1 });
        this.UserModel = mongoose.models.User || mongoose.model("User", userSchema);
    }
}

const BaseUser = new User().UserModel;
export default BaseUser;