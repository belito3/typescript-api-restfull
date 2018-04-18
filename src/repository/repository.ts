import { ObjectLiteral } from "typeorm";

export declare interface CustomRepository<Entity extends ObjectLiteral>{
    
    /**
     * Finds all entities 
     */
    find();
    
    /**
     * Finds entity by given id.
     */
    findOneById(id : any);

    /**
     * Saves a given entity in the database.
     * If entity does not exist in the database then inserts, otherwise updates.
     */
    save(entity: Entity): Promise<Entity>;

    /** 
     * Save all given entities in the database
     * If entities dose not exit in the database then inserts, otherwise updates.
     */
    save(entity: Entity[]): Promise<Entity[]>;

    /**
     * Remove entity by a given entity id
     */
    removeById(id: any): Promise<void>;

}