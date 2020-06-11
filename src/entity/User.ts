import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinTable} from "typeorm";
import {UserMetadata} from "./UserMetadata";
import {Post} from "./Post";
import {Follow} from "./Follow";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToOne(type => UserMetadata, userMetadata => userMetadata.user, {
        cascade: true
    })
    metadata: UserMetadata;

    @OneToMany(type => Post, post => post.user)
    @JoinTable()
    posts: Post[];
}
