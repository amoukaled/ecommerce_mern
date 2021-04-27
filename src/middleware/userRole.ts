import { Role } from "../models/User"

export const initRole = function (req: any, res: any, next: any) {
  const user: any = req.session?.passport?.user

  const role = user?.role ?? undefined

  if (role) {
    req.isAdmin = role === Role.admin
  }
  return next()
}
