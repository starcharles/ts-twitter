import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {User} from "./User";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 140
    })
    comment: string;

    @Column({
        default: 0
    })
    fav: number;

    @ManyToOne(type => User, user => user.posts)
    user: User;
}
