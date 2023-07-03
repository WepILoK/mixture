import {Router} from "express";
import {loginValidator, registerValidator} from "./validations/validations";
import {UserController} from "./controllers/UserController";
import {checkAuth, handleValidationErrors} from "./utils";

const router = Router();

router.post("/auth/register", registerValidator, handleValidationErrors, UserController.register)

router.post("/auth/login", loginValidator, handleValidationErrors, UserController.login)

//
router.post("/auth/logout", loginValidator, handleValidationErrors, UserController.login)

router.post("/auth/refresh", loginValidator, handleValidationErrors, UserController.login)

router.post("/auth/activate", loginValidator, handleValidationErrors, UserController.login)
//

router.get("/auth/me", checkAuth, UserController.getMe)


export default router;
