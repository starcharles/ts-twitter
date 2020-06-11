import {Request, Response} from "express";
import {createQueryBuilder, getManager} from "typeorm";
import {User} from "../entity/User";
import {UserMetadata} from "../entity/UserMetadata";

export async function getProfile(request: Request, response: Response) {
    const id = request.params.id;
    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne(id, {relations: ["metadata"]});

    response.render('profile.ejs', {user});
}

export async function updateProfile(request: Request, response: Response) {
    const profile = request.body.profile;
    const userId = request.params.userId;

    await createQueryBuilder()
            .update(UserMetadata)
            .set({profile: profile})
            .where('user_metadata.userId = :id', {id: +userId})
            .execute();

    response.redirect('/mypage');
}
