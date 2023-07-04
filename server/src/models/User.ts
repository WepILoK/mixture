import mongoose from "mongoose";

export interface IUserSchema extends mongoose.Document {
    _doc?: any
    email: string
    username: string
    passwordHash: string
    avatarUrl: string
    themeMode: "light" | "dark"
    timestamps: any
}

const UserSchema = new mongoose.Schema<IUserSchema>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    themeMode: {
        type: String,
        default: "light"
    },
    avatarUrl: String
}, {
    timestamps: true,
})

export default mongoose.model("User", UserSchema)