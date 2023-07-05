import mongoose, {Schema} from "mongoose";
import {IUserSchema} from "./User";

export interface ITokenSchema extends mongoose.Document {
    _doc?: any
    user: IUserSchema
    refreshToken: string
}

const TokenSchema = new mongoose.Schema<ITokenSchema>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        required: true
    }
})

export default mongoose.model("Token", TokenSchema)