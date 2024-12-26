import passport from "passport";
import passportGoogle from "passport-google-oauth20";
const GoogleStrategy = passportGoogle.Strategy;
import { Sequelize } from 'sequelize-typescript';
import User from '../models/user.model';


const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  username: process.env.USER_NAME!,
  password: process.env.PASSWORD!,
  host: process.env.DB_HOST!,
  dialect: 'mysql',
  port: Number(process.env.DB_PORT),
  logging: false,
  models: [User],
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '1058545343004-ue70ila63mt50aqtetgs152l5dtjtbuk.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ where: { googleId: profile.id } });

      // If user doesn't exist creates a new user. (similar to sign up)
      if (!user) {
        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: String(profile.emails?.[0].value),
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});