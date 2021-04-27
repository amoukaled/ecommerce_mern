import { createContext, useContext, useEffect, useState } from "react"
import { loginApi, logoutApi, registerApi, verifyApi } from "../api/auth"
import { UserAddress } from "../models/Invoice"
import { CartContext } from "./CartContext"

export interface IAuth {
  uid: string | null
  register: (email: string, password: string, address: UserAddress) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: () => boolean
}

export const AuthContext = createContext<IAuth | null>(null)

const AuthProvider = (props: any) => {
  const { clearItems } = useContext(CartContext)!

  useEffect(() => {
    verifyApi().then((data) => {
      setUid(data)
    })
  }, [])

  const [uid, setUid] = useState<string | null>(null)

  const register = async (email: string, password: string, address: UserAddress) => {
    const id = await registerApi(email, password, address)
    setUid(id)
  }

  const login = async (email: string, password: string) => {
    const result = await loginApi(email, password)
    setUid(result)
  }

  const logout = async () => {
    const result = await logoutApi()
    if (result) {
      setUid(null)
      clearItems()
    }
  }

  const isAuthenticated = () => uid !== null

  return (
    <AuthContext.Provider
      value={{
        uid,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
