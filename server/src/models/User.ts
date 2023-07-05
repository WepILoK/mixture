import mongoose from "mongoose";

export interface IUserSchema extends mongoose.Document {
    email: string
    userName: string
    passwordHash: string
    avatarUrl: string
    themeMode: "light" | "dark"
    activationLink: string
    timestamps: any
    isActivated: boolean
}

const UserSchema = new mongoose.Schema<IUserSchema>({
    userName: {
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
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: String,
    avatarUrl: String
}, {
    timestamps: true,
})

export default mongoose.model("User", UserSchema)