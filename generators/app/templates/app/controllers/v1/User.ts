import { ModelController } from "@/libraries/ModelController";
import { User } from "@/models/User";
import { isSelfUser } from "@/policies/General";
import { validateBody } from "@/libraries/Validator";
import { UserSchema } from "@/validators/User";
import { Request, Response } from "express";
import {
  Controller,
  Get,
  Put,
  Delete,
  Auth,
  Middlewares,
} from "@/libraries/routes/decorators";
import {
  ApiDocs,
  ApiDocsRouteSummary,
  ApiDocsAddSearchParameters,
} from "@/libraries/documentation/decorators";
import { AuthMiddleware } from "@/policies/Authorization";

@ApiDocs(true)
@Controller("user", User)
export class UserController extends ModelController<User> {
  @ApiDocsRouteSummary("Get a List of Users")
  @ApiDocsAddSearchParameters()
  @Get("/")
  @Auth()
  @Middlewares([AuthMiddleware()])
  getUsers = (req: Request, res: Response) => {
    this.handleFindAll(req, res);
  };

  @ApiDocsRouteSummary("Get a User by Id")
  @Get("/:id")
  @Auth()
  @Middlewares([AuthMiddleware(), isSelfUser()])
  getUser = (req: Request, res: Response) => {
    this.handleFindOne(req, res);
  };

  @ApiDocsRouteSummary("Upload a User by Id")
  @Put("/:id")
  @Auth()
  @Middlewares([AuthMiddleware(), validateBody(UserSchema)])
  updateUser = (req: Request, res: Response) => {
    this.handleUpdate(req, res);
  };

  @ApiDocsRouteSummary("Delete User by Id")
  @Delete("/:id")
  @Auth()
  @Middlewares([AuthMiddleware()])
  deleteUser = (req: Request, res: Response) => {
    this.handleDelete(req, res);
  };
}

const controller = new UserController();
export default controller;
