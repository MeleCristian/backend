import passport from "passport"
import { Strategy as JWTStrategy , ExtractJwt} from "passport-jwt"
import{JWT_secret} from '../utils.js'

function cookieExtractor(req){
    let token=null
    if(req && req.signedCookies){
        token=req.signedCookies['access_token']
    }

    return token
}

const opt={
    secretOrKey:JWT_secret,
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor])
}

export const init=()=>{
    
    passport.use(new JWTStrategy(opt,(payload,done)=>{
        return done(null,payload)
    }))
}