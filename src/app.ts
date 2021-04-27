import express from "express"
import mongoose from "mongoose"
import passport from "passport"
import { strategy } from "./config/passport"
import session from "express-session"
import MongoStore from "connect-mongo"
import { initRole } from "./middleware/userRole"
require("dotenv").config()

const app = express()
const PORT = 5000
const uri = process.env.MONGO_URI
const SECRET = process.env.SECRET

//passport
passport.use(strategy)

// Middleware
app.use(express.json())
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SECRET!,
    store: MongoStore.create({ mongoUrl: uri }),
    name: "sessions",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(initRole)

mongoose.connect(
  uri!,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(err)

    console.log("Db connected")

    app.listen(PORT, () => console.log("Server running"))
  }
)

// routes
import userRouter from "./routes/userRoutes"
import defaultRoutes from "./routes/defaultRoutes"
import adminRoute from "./routes/adminRoutes"
app.use("/api/user", userRouter)
app.use("/api", defaultRoutes)
app.use("/api/admin", adminRoute)
