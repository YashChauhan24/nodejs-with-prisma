import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import config from './config';
import passport from 'passport';
import UserModel from '../model/user.model';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export const passportConfig = () => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await UserModel.findById(jwt_payload.id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    })
  );
};
