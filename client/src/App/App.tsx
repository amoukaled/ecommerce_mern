import "./App.css"
import { ThemeProvider } from "@material-ui/core"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Shop from "../Shop/Shop"
import AuthProvider from "../Contexts/AuthContext"
import Layout from "./Layout"
import Theme from "./Theme"
import ItemsProvider from "../Contexts/ItemsContext"
import Auth from "../Auth/Auth"
import ProtectedRoute from "../Auth/ProtectedRoute"
import CartProvider from "../Contexts/CartContext"
import Invoices from "../Invoices/Invoices"
import Cart from "../Cart/Cart"
import InvoicePage from "../Invoices/InvoicePage"

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <ItemsProvider>
          <CartProvider>
            <AuthProvider>
              <Layout>
                <Switch>
                  <Route exact path="/">
                    <Shop />
                  </Route>

                  <ProtectedRoute.EnsureUnAuthenticated
                    component={<Auth />}
                    exact
                    path="/login"
                  />

                  <ProtectedRoute.EnsureAuthenticated
                    component={<InvoicePage />}
                    exact
                    path="/invoices/:id"
                  />

                  <ProtectedRoute.EnsureAuthenticated
                    component={<Invoices />}
                    exact
                    path="/invoices"
                  />

                  <ProtectedRoute.EnsureAuthenticated
                    component={<Cart />}
                    exact
                    path="/cart"
                  />
                </Switch>
              </Layout>
            </AuthProvider>
          </CartProvider>
        </ItemsProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
