import { Controller } from "./controller";
import { HttpServer } from "../server/httpServer";
import { userServiceImpl} from "../service/userServiceImpl";
import {Request, Response} from 'restify';

export class UserControllerImpl implements Controller{

    public initialize(httpServer: HttpServer): void{
        httpServer.get('/api/users', this.getAll.bind(this));     // get all customers
        httpServer.get('/api/user/:id', this.getById.bind(this)); // get a user by userId
        httpServer.post('/api/user', this.create.bind(this));     // create user
        httpServer.put('/api/user/:id', this.update.bind(this));  // update user
        httpServer.del('/api/user/:id', this.delete.bind(this));  // delete user 
    }

    private async getAll(req: Request, res: Response): Promise<void>{
        res.send(await userServiceImpl.getAll());
    }

    private async getById(req: Request, res: Response): Promise<void>{
        const user = await userServiceImpl.getById(req.params.id);
        res.send(user ? 200: 404, user);
    }

    private async create(req: Request, res: Response): Promise<void>{
        res.send(await userServiceImpl.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void>{
        res.send(await userServiceImpl.update({...req.body, userId: req.params.id}));
    }

    private async delete(req: Request, res: Response): Promise<void>{
        try{
            await userServiceImpl.delete(req.params.id);
            res.send(200);
        }
        catch(e) {
            res.send(500);
        }
    }
    
}