import express from "express";
import TodoModel from "../models/Todo";
import {handleErrors} from "../utils";

export const TodoController = {
    create: async (req: any, res: express.Response) => {
        try {

            const doc = new TodoModel({
                todoName: req.body.title,
                description: req.body.title,
                user: req.userId,
            })

            const todo: any = await doc.save()

            res.status(200).json({
                status: "success",
                message: "todo.create.success",
                data: todo,
            })

        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "todo.create.failed",
            })
        }
    },
    getAll: async (req: express.Request, res: express.Response) => {
        try {

            const todo: any = await TodoModel.find().sort({createdAt: -1})
                .populate('user', ["email", "userName", "avatarUrl"])
                .exec()

            res.status(200).json({
                status: "success",
                message: "todo.getAll.success",
                data: todo,
            })

        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "todo.getAll.failed",
            })
        }
    },
    getById: async (req: express.Request, res: express.Response) => {
        try {

            const todo: any = await TodoModel.findOne(
                {
                    _id: req.params.id,
                })
                .populate('user', ["email", "userName", "avatarUrl"])
                .exec()

            if (!todo) {
                handleErrors.badRequest(res)
                return
            }

            res.status(200).json({
                status: "success",
                message: "todo.getById.success",
                data: todo,
            })

        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "todo.getById.failed",
            })
        }
    },
    update: async (req: express.Request, res: express.Response) => {
        try {

            const todo: any = await TodoModel.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    todoName: req.body.title,
                    description: req.body.title,
                })
                .populate('user', ["email", "userName", "avatarUrl"])
                .exec()

            if (!todo) {
                handleErrors.badRequest(res)
                return
            }

            res.status(200).json({
                status: "success",
                message: "todo.update.success",
                data: todo
            })

        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "todo.update.failed",
            })
        }
    },
    remove: async (req: express.Request, res: express.Response) => {
        try {

            const todo: any = await TodoModel.findOneAndDelete(
                {
                    _id: req.params.id,
                }
            )

            if (!todo) {
                handleErrors.badRequest(res)
                return
            }

            res.status(200).json({
                status: "success",
                message: "todo.remove.success",
            })

        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "todo.remove.failed",
            })
        }
    },
}