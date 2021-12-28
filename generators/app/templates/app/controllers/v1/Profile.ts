import { ModelController } from "@/libraries/ModelController";
import { Profile } from "@/models/Profile";
import { filterOwner, appendUser } from "@/policies/General";
import { ProfileSchema } from "@/validators/Profile";
import {
  Authentication,
  Authorization,
  Controller,
  Get,
  Middlewares,
  Put,
  validateBody,
} from "flugzeug";

@Authentication()
@Authorization()
@Middlewares([filterOwner()])
@Controller("profile", Profile)
export class ProfileController extends ModelController<Profile> {
  constructor() {
    super();
  }
  @Get("/")
  getProfiles = (req, res) => this.handleFindAll(req, res);

  @Get("/:id")
  getProfile = (req, res) => this.handleFindOne(req, res);

  @Put("/:id")
  @Middlewares([validateBody(ProfileSchema), filterOwner(), appendUser()])
  putProfile = (req, res) => this.handleUpdate(req, res);
}

const controller = new ProfileController();
export default controller;
