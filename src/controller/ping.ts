import { Controller } from "./controller";
import { HttpServer } from "../server/httpServer";

export class PingController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/api/ping', (req, res) => res.send(200, 'hello'));
    }
}