import { BaseRepository } from "./base.repository";
import User from "../models/user.model";

export class AuthRepository extends BaseRepository {
  constructor() {
    super();
  }
  /**
   * Finds a user by their Google ID.
   * @param googleId Google user ID.
   */
  public async findByGoogleId(googleId: string) {
    return User.findOne({ where: { googleId } });
  }

  /**
   * Creates a new user with the provided data.
   * @param data User data for creation.
   */
  public async createUser(data: { googleId: string; name: string; email: string }) {
    return User.create(data);
  }
}