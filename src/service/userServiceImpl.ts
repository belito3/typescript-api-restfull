import { User } from "../model/user";
import { DatabaseProvider } from "../database/index";
import { UserService } from "./userService";
import { getConnection } from "typeorm";
import * as uuid from "uuid/v4";

export class UserServiceImpl implements UserService{
    

    /** 
     * Get all user
     */
    public async getAll(): Promise<User[]>{
       
        const connection = await DatabaseProvider.getConnection();
        let list : User[];
        list = await connection.query("CALL sp_user_list()");
       
        return list;
    }

    /**  
     * Get a user by userId 
     */
    public async getById(userId: number): Promise<User>{
       
        const connection = await DatabaseProvider.getConnection();
        let user: User;
        user = await connection.query("CALL sp_user_get(?)",[userId]);
        return user[0][0];
    }

    
    /**  
     * Create a user
     */ 
    public async create(user: User): Promise<User>{
        // Normally DTO !== DB-Entity, so we "simulate" a mapping of both
       
        const connection = await DatabaseProvider.getConnection();

        
        let user2;
        let userId;
        
        // Create userId unique
        do{
         userId = uuid();
         user2 = await connection.query('CALL sp_user_get(?)',[userId]);
        }
        while(user2[0].length!=0);
       
        console.log(userId);
        
        let p_in = [userId, user.fullName, user.phoneNumber, user.fbUrl];
        
        let user3: User;
        user3 = await connection.query('CALL sp_user_save(?,?,?,?)', p_in);
        return user3;
    }    

    /**  
     * Update a user 
     */
    public async update(user: User): Promise<User>{
        

        const connection = await DatabaseProvider.getConnection();
        const repository = connection.getRepository(User);
        const entity = await repository.findOneById(user.userId); 
        entity.fullName = user.fullName;
        entity.phoneNumber = user.phoneNumber;
        entity.fbUrl = user.fbUrl;

        let user2: User;
        let p_in = [entity.userId, entity.fullName, entity.phoneNumber, entity.fbUrl];
        user2 = await connection.query('CALL sp_user_save(?,?,?,?)', p_in);

       return user2; 
    }

    /** 
     *  Delete user 
     */
    public async delete(userId: number): Promise<void>{
        const connection = await DatabaseProvider.getConnection();
        return await connection.query('CALL sp_user_delete(?)', [userId]);
    }
}

export const userServiceImpl = new UserServiceImpl();