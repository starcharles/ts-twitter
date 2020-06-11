import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Post} from "../entity/Post";
import {User} from "../entity/User";

export async function PostController(request: Request, response: Response) {
    const body = request.body;
    const post = new Post();
    const user = new User();
    post.comment = body.text;
    user.id = body.id;
    user.name = body.name;
    post.user = user;

    const savedPost = await getManager().getRepository(Post).save(post);

    response.redirect('/');
}
