export const registerErrorHandler = (err: any) => {
  const errors: any = {}

  // Duplicate error code
  if (err.code === 11000) {
    errors.email = "Email already registered"
    return errors
  }

  // Validation errors
  if (err.message.toLowerCase().includes("user validation failed")) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message
    })
  }

  return errors
}
