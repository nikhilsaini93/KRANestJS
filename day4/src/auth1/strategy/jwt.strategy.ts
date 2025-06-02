import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy  , ExtractJwt} from "passport-jwt";
import { Auth1Service } from "../auth1.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService : Auth1Service) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "your_jwt_secret"


        })
    }

    async validate(payload: any) {
        try {

            const user = await this.authService.getUSerById(payload.sub); // Assuming payload.sub contains the user ID
            if (!user) {
                throw new UnauthorizedException("User not found");
            }
            return {...user,
                role : payload.role
            }; // Return the user object to be attached to the request
            
        } catch (error) {
            throw new UnauthorizedException("Unauthorized access");
        }
    }
}
