import { Service } from "typedi";
import { BaseService } from "./base.service";
import { AuthRepository } from "../repositories";
import { StatusCodes } from "http-status-codes";


@Service()
export class AuthService extends BaseService {
  constructor(private readonly authRepo: AuthRepository) {
    super()
  }

  public async handleGoogleLogin(profile: any) {
    try {
      const { id: googleId, displayName, emails } = profile;

      // Check if the user already exists
      let user = await this.authRepo.findByGoogleId(googleId);
      if (!user) {
        // Create a new user if not found
        user = await this.authRepo.createUser({
          googleId,
          name: displayName,
          email: emails?.[0].value,
        });
      }
  
      return {
        message: 'Login Successful',
        data: user,
        statuscode: StatusCodes.OK,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}