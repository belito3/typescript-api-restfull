import { HttpServer } from "../server/httpServer";

export interface Controller{
    initialize(httpSever: HttpServer): void;
}