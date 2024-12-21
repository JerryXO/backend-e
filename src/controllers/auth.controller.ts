import { JsonController, Post } from "routing-controllers";
import { AuthService } from "../services";
import { BaseController } from "./base.controller";


@JsonController('/auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super()
  }

  @Post('/login')
  public async loginUser() {
    return await this.authService.loginUser();
  }
}