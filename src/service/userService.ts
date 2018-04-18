import { User } from "../model/user";

export interface UserService{
    
    getAll(): Promise<User[]>;
    
    getById(userId : number): Promise<User>;

    create(user : User): Promise<User>;

    update(user : User): Promise<User>;

    delete(userId : number): Promise<void>;


}