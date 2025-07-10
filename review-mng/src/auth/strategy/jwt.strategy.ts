import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "mySecretKey", 
    });

}

// async validate(payload: any ){
//     const user = await this.authService.findUserById(payload.sub);
//     if(!user) {
//       throw new UnauthorizedException();
//     }
//     const bussiness = await this.authService.findUserByIdforBusiness(payload.sub);
//     if (!bussiness) {
//       throw new UnauthorizedException();
//     }
//     return user;
  
// }
async validate(payload: any) {
  let user;

  if (payload.type === 'customer') {
    user = await this.authService.findUserById(payload.sub);
  } else if (payload.type === 'business') {
    user = await this.authService.findUserByIdforBusiness(payload.sub);
  }

  if (!user) {
    throw new UnauthorizedException();
  }

  return {
    id: user.id,
    email: user.email,
    type: payload.type,
  };
}


}