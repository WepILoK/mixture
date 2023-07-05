import mongoose from "mongoose";
import {IUserSchema} from "./User";

export interface ITodoSchema extends mongoose.Document {
    todoName: string
    description: string
    user: IUserSchema
    status: "todo" | "done" | "deleted"
}

const TodoSchema = new mongoose.Schema<ITodoSchema>({
    todoName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        default: "todo"
    }
}, {
    timestamps: true,
})

export default mongoose.model("Todo", TodoSchema)