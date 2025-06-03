import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy  , ExtractJwt} from "passport-jwt";
import { AuthSvcService } from "../auth-svc.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthSvcService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "mySecretKey", 
    });
  }

  async validate(payload: any) {
    const user = await this.authService.findUserById(payload.sub);
    // console.log('payload', payload, 'user from DB:', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}