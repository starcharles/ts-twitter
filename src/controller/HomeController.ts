import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Post} from "../entity/Post";

export async function HomeController(request: Request, response: Response) {
    // get a post repository to perform operations with post
    const postRepository = getManager().getRepository(Post);

    // load a post by a given post id
    const posts = await postRepository.find({relations: ["user"]});

    if(request.session.user){
        response.render('home.ejs', {posts, user: request.session.user});
        return;
    }

    // return loaded posts
    response.render('home.ejs', {posts, user: undefined});
}
