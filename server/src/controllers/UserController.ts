import express from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import uuid from "uuid";
import {handleErrors, tokenService} from "../utils";

export const UserController = {
    register: async (req: express.Request, res: express.Response) => {
        try {

            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            const activationLink = uuid.v4();
            const doc = new UserModel({
                email: req.body.email,
                username: req.body.username,
                passwordHash: hash,
                avatarUrl: req.body.avatarUrl,
                activationLink
            })

            const user: any = await doc.save()

            const tokens = tokenService.generateTokens({
                _id: user._id,
                role: req.body.role,
                isActivated: user.isActivated
            })

            await tokenService.saveToken(user._id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            const {passwordHash, __v, createdAt, updatedAt, ...userData} = user._doc

            res.status(200).json({
                status: "success",
                message: "authorization.register.success",
                data: userData,
                tokens
            })

        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "authorization.register.failed",
            })
        }
    },
    login: async (req: express.Request, res: express.Response) => {
        try {
            const user: any = await UserModel.findOne({email: req.body.email})
            if (!user) {
                handleErrors.badRequest(res)
                return
            }

            const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

            if (!isValidPass) {
                handleErrors.badRequest(res)
                return
            }

            const tokens = tokenService.generateTokens({
                _id: user._id,
                role: req.body.role,
            })

            await tokenService.saveToken(user._id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            const {passwordHash, __v, createdAt, updatedAt, ...userData} = user._doc

            res.status(200).json({
                status: "success",
                message: "authorization.login.success",
                data: userData,
                tokens
            })
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "authorization.login.failed",
            })
        }
    },
    logout: async (req: express.Request, res: express.Response) => {
        try {
            const {refreshToken} = req.cookies;
            const token = await tokenService.removeToken(refreshToken);

            if (!token) {
                handleErrors.badRequest(res)
                return
            }

            res.clearCookie('refreshToken');

            res.status(200).json({
                status: "success",
                message: "authorization.login.success",
            })
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "authorization.login.failed",
            })
        }
    },
    refresh: async (req: express.Request, res: express.Response) => {
        try {
            const {refreshToken} = req.cookies;

            if (!refreshToken) {
                handleErrors.badRequest(res)
                return
            }

            const tokenUserData: any = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);

            if (!tokenUserData || !tokenFromDb) {
                handleErrors.badRequest(res)
                return
            }

            const user: any = await UserModel.findById(tokenUserData._id);

            const tokens = tokenService.generateTokens({
                _id: user._id,
                role: req.body.role,
            })

            await tokenService.saveToken(user._id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            const {passwordHash, __v, createdAt, updatedAt, ...userData} = user._doc

            res.status(200).json({
                status: "success",
                message: "authorization.login.success",
                data: userData,
                tokens
            })
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "authorization.login.failed",
            })
        }
    },
    activate: async (req: express.Request, res: express.Response) => {
        try {
            const activationLink = req.params.link;

            const user = await UserModel.findOneAndUpdate(
                {
                    activationLink: activationLink,
                },
                {
                    isActivated: true,
                }
            ).exec()

            if (!user) {
                handleErrors.badRequest(res)
                return
            }

            res.status(200)
                .redirect(
                    process.env.CLIENT_URL
                )

        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "authorization.login.failed",
            })
        }
    },
    getMe: async (req: any, res: express.Response) => {
        try {
            const user: any = await UserModel.findById(req.userId)

            if (!user) {
                handleErrors.notFound(res)
                return
            }

            const tokens = tokenService.generateTokens({
                _id: user._id,
                role: req.body.role,
            })

            const {passwordHash, __v, createdAt, updatedAt, ...userData} = user._doc

            res.status(200).json({
                status: "success",
                message: "authorization.me.success",
                data: userData,
                tokens
            })
        } catch (err) {
            res.status(500).json({
                status: "error",
                message: "authorization.me.failed",
            })
        }
    }
}