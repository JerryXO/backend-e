import { Body, JsonController, Post} from "routing-controllers";
import { AuthService } from "../services";
import { BaseController } from "./base.controller";


@JsonController('/auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super()
  }

  @Post('/google-login')
  public async googleLogin(@Body() profile: any) {
    return await this.authService.handleGoogleLogin(profile);
  }
}