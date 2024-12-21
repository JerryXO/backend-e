import { Service } from "typedi";
import { BaseService } from "./base.service";
import { AuthRepository } from "../repositories";


@Service()
export class AuthService extends BaseService {
  constructor(private authRepo: AuthRepository) {
    super()
  }

  public async loginUser(

  ) {
    
  }
}