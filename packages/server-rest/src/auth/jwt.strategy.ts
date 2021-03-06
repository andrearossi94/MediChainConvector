import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './types/jwt-payload.interface';
import { envVariables as e } from '../env';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: e.accessTokenJwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      firstname: payload.firstname,
      lastname: payload.lastname,
      roles: payload.roles
    };
  }
}
