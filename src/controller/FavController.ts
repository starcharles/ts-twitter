import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Post} from "../entity/Post";

export async function postFav(request: Request, response: Response) {
    const postId = request.body.postId;
    const postRepository = getManager().getRepository(Post);
    const post = await postRepository.findOne(postId);
    post.fav++;
    await postRepository.save(post);
    response.json({
        success: true,
    });
    // response.redirect('/');
}

export async function getFav(request: Request, response: Response) {
    // response.json({
    //     count: 100
    // });
}
