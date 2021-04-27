import { UserAddress } from "../models/Invoice"

// Login
export const loginApi = async (email: string, password: string) => {
  const json = JSON.stringify({ email, password })

  const result = await fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
  })
  if (result.status === 200) {
    const id: string = await result.json()
    return id
  } else {
    throw new Error("Incorrect email/password.")
  }
}

// Register
export const registerApi = async (
  email: string,
  password: string,
  address: UserAddress
) => {
  const json = JSON.stringify({ email, password, address })
  const result = await fetch("/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
  })
  const body = await result.json()
  if (result.status === 201) {
    const id = body.id
    return id
  } else {
    const { email, password } = body
    if (email) {
      throw new Error(email)
    }
    if (password) {
      throw new Error(password)
    }
  }
}

export const verifyApi = async (): Promise<string | null> => {
  try {
    const result = await fetch("/api/user/verify", {
      method: "GET",
    })

    const json = await result.json()
    const id = json.id

    if (id) {
      return id
    } else {
      return null
    }
  } catch (_) {
    return null
  }
}

// Logout
export const logoutApi = async (): Promise<boolean> => {
  try {
    const result = await fetch("/api/user/logout", { method: "GET" })
    return result.status === 200
  } catch (_) {
    return false
  }
}

// Get user address
export const getUserAddress = async () => {
  try {
    const res = await fetch("/api/user/address", { method: "GET" })

    if (res.status === 200) {
      const body = await res.json()
      const address = body.address
      return address
    }
    return null
  } catch (_) {
    return null
  }
}
