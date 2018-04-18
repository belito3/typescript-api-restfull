import { UserControllerImpl } from "./userControllerImpl";
import { PingController } from "./ping";

export const CONTROLLERS = [
    new UserControllerImpl(),
    new PingController()
];