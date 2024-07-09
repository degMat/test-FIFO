import { Router } from 'express';
import {add, all} from "../controllers/actionController";
const routerAction = Router();

routerAction.get('/', all);
routerAction.post('/', add);

export default routerAction;
