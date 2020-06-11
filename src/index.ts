import "reflect-metadata";
import {createConnection, getManager} from "typeorm";
import * as express from "express"
import {HomeController} from "./controller/HomeController";
import {PostController} from "./controller/PostController";
import {getLogin, getLogout, getSignup, postLogin, postSignup} from "./controller/loginController";
import * as bodyParser from "body-parser";
import {getProfile, updateProfile} from "./controller/ProfileController";
import {getFav, postFav} from "./controller/FavController";
import {getMyPage} from "./controller/MypageController";

require('dotenv').config();

const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan')


createConnection().then(async connection => {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
    app.use(logger('short'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({extended: true}));
    app.use(require('express-session')({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
    }));
    app.use(express.json());
    // app.use(passport.initialize());
    // app.use(passport.session());
    app.use(bodyParser.urlencoded({extended: false}));

    app.get('/', HomeController);
    app.post('/comment', PostController);
    app.get('/login', getLogin);
    app.post('/login', postLogin);
    app.get('/logout', getLogout);
    app.get('/signup', getSignup);
    app.post('/signup', postSignup);
    app.get('/profile/:id', getProfile);
    app.put('/profile/:userId', updateProfile);
    app.post('/fav', postFav);
    app.get('/fav', getFav);
    app.get('/mypage', getMyPage);

    app.listen(3000, () => {
        console.log("start server");
    });

}).catch(error => console.log(error));
