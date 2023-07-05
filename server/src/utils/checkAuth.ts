import express from "express";
import jwt from "jsonwebtoken";
import {handleErrors, tokenService} from "./index";

export default async (req: any, res: express.Response, next: express.NextFunction) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

    if (!token) {
        handleErrors.unauthorizedError(res)
        return
    }
    try {
        const userData: any = tokenService.validateAccessToken(token);
        req.userId = userData._id
        next()
    } catch (err) {
        handleErrors.unauthorizedError(res)
        return
    }
}