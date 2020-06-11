import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";

export async function getMyPage(request: Request, response: Response) {
    const user = request.session.user;
    const userRepository = getManager().getRepository(User);
    const findUser = await userRepository.findOne(user.id, {relations: ["metadata"]});
    response.render('mypage.ejs', {user: findUser});
}
