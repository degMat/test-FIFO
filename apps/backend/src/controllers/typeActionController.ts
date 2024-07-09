import { NextFunction, Request, Response } from "express";
import {getAllTypeActions} from "../services/typeActionService";
 export async function  all(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try {
      const result   = await getAllTypeActions();
      if(result){
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'typeAction is empty' });
      }
    } catch (error) {
      next(error);
    }
}
