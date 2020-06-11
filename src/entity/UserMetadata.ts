import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class UserMetadata {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    profile: string;

    @Column({nullable: true})
    picture: string;

    @OneToOne(type => User, user => user.metadata)
    @JoinColumn()
    user: User;
}
