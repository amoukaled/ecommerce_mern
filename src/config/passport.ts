import passport from "passport"
import passportLocal, { IVerifyOptions } from "passport-local"
import User, { UserDocument } from "../models/User"
import { Response, Request, NextFunction } from "express"
import PasswordUtils from "../utils/passwordUtils"

const LocalStrategy = passportLocal.Strategy

const verifyCallback = async (
  email: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) => {
  try {
    const result = await User.findByEmail(email.toLocaleLowerCase())

    if (!result) {
      return done(undefined, false, { message: `Email ${email} not found.` })
    }

    const isAuth: boolean = PasswordUtils.validPassword(
      password,
      result.hash,
      result.salt
    )

    if (isAuth) {
      return done(undefined, result)
    } else {
      return done(undefined, false, { message: "Invalid email or password." })
    }
  } catch (error) {
    return done(error, false)
  }
}

const customField = { usernameField: "email" }

export const strategy = new LocalStrategy(customField, verifyCallback)

// Funcs
export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).end()
}

export const ensureUnAuthenticated = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.status(403).end()
}

export const ensureAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.isAdmin) {
    return next()
  }
  res.status(403).end()
}

passport.serializeUser<any, any>(
  (req, user, done: (err: any, id?: any) => void) => {
    done(undefined, user)
  }
)

passport.deserializeUser((id, done) => {
  User.findById(id, (err: any, user: UserDocument) => {
    done(err, user.id)
  })
})
