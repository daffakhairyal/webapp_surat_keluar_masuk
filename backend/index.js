import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from 'dotenv';
import SequelizeStore from "connect-session-sequelize"
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
})

// (async()=> {
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

const PORT = process.env.APP_PORT || 5000;


app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

//store.sync();
app.listen(PORT,()=> {
    console.log(`Server berjalan dalam port ${PORT}`)
});