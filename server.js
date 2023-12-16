const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");
const routes = require("./controller");
const helpers = require("./utils/helpers");

const hbs = exphbs.create({helpers});

const SequelizedStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESSKEY,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizedStore({
        db: sequelize,
    }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

// app.post("/api/clear-session", (req, res) => {
//     req.session.destroy(() => {
//         req.statusCode(204).end();
//     });
// });

app.use(routes);

sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
});