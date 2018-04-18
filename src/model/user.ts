import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, Generated} from "typeorm";

@Entity()
export class User{
    
    @PrimaryColumn({name: "UserId", nullable:false, unique:true})
    @Generated("uuid")
    //@PrimaryGeneratedColumn("uuid")
    public userId: number;

    @Column({name: "FullName", nullable:true})
    public fullName: string;

    @Column({name: "PhoneNumber", nullable:true})
    public phoneNumber: string;

    @Column({name: "FbUrl", nullable:true})
    public fbUrl: string;
}