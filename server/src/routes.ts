import {Router} from "express";
import {loginValidator, registerValidator, todoValidator} from "./validations/validations";
import {UserController} from "./controllers/UserController";
import {checkAuth, handleErrors} from "./utils";
import {TodoController} from "./controllers/TaskController";

const router = Router();

router.post("/auth/register", registerValidator, handleErrors.validationError, UserController.register)

router.post("/auth/login", loginValidator, handleErrors.validationError, UserController.login)

router.post("/auth/logout", UserController.logout)

router.post("/auth/refresh", UserController.refresh)

router.post("/auth/activate/:link", UserController.activate)

router.get("/auth/me", checkAuth, UserController.getMe)


router.post("/todos", todoValidator, handleErrors.validationError, checkAuth, TodoController.create)

router.get("/todos", TodoController.getAll)

router.get("/todos/:id", TodoController.getById)

router.patch("/todos/:id", todoValidator, handleErrors.validationError, checkAuth, TodoController.update)

router.delete("/todos/:id", checkAuth, TodoController.remove)


export default router;
