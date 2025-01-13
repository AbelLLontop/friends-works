import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        //by default it uses username and password
        super({
            usernameField:'email'
        });
    }

    async validate(username:string,password:string) {
        const user = await this.authService.validateUser({
            email:username,
            password:password
        });
        if(!user) throw new UnauthorizedException();
        //return the response in req.user
        return user;
    }

}