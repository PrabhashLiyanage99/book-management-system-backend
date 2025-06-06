import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:configService.get<string>(process.env.JWT_SECRET),
    });
  }

  async validate(payload: any) {
    if(!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return { userId: payload.sub,email: payload.email, username: payload.username };
  }
}

