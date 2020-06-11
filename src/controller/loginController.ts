import {Request, Response} from "express";

const bcrypt = require('bcrypt');

import {Strategy as LocalStrategy} from "passport-local";
import {User} from "../entity/User";
import {getManager} from "typeorm";
import {UserMetadata} from "../entity/UserMetadata";

export async function getLogin(request: Request, response: Response) {
    if (request.session.user) {
        response.redirect('/');
    }
    response.render('login.ejs', {message: null});
}

export async function postLogin(request: Request, response: Response) {
    const name = request.body.name;
    const password = request.body.password;
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({where: {name: name}});
    if (!user) {
        response.render('login.ejs', {message: "そのユーザーは存在しません。"});
    }

    bcrypt.hash(password, Number(process.env.salt), async (err, hash) => {
        if (hash === user.password) {
            response.redirect('/');
            return;
        }
        response.render('login.ejs', {message: "パスワードが違います"});
    });
    request.session.user = user;
    response.redirect('/');
}

export async function getSignup(request: Request, response: Response) {

    response.render('signup.ejs', {message: null});
}


export async function postSignup(request: Request, response: Response) {
    const name = request.body.name;
    const password = request.body.password;
    const confirm_password = request.body.confirm_password;
    const userRepository = getManager().getRepository(User);

    if (password !== confirm_password) {
        response.render('signup.ejs', {message: "パスワードが一致しません。"});
    }
    const user = await userRepository.findOne({where: {name: name}});
    if (user) {
        response.render('signup.ejs', {message: "そのユーザー名はすでに存在します。"});
    }

    bcrypt.hash(password, Number(process.env.salt), async (err, hash) => {
        const user = new User();
        const userMetadata = new UserMetadata();
        user.password = hash;
        user.name = name;
        userMetadata.profile = null;
        userMetadata.picture = null;
        user.metadata = userMetadata;
        const savedUser = await userRepository.save(user);
        request.session.user = savedUser;
        response.redirect('/');
    });
}

export async function getLogout(request: Request, response: Response) {
    request.session.destroy((err) => {
    });
    response.redirect('/');
}
