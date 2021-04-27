import { useContext } from "react"
import { Redirect, Route } from "react-router"
import { AuthContext } from "../Contexts/AuthContext"

namespace ProtectedRoute {
  export const EnsureAuthenticated = ({ component, ...rest }: any) => {
    const { isAuthenticated } = useContext(AuthContext)!

    return (
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated()) {
            return component
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
          }
        }}
      />
    )
  }

  export const EnsureUnAuthenticated = ({ component, ...rest }: any) => {
    const { isAuthenticated } = useContext(AuthContext)!

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!isAuthenticated()) {
            return component
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
            )
          }
        }}
      />
    )
  }
}

export default ProtectedRoute
