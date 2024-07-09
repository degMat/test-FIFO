import {NextFunction, Request, Response} from "express";
import {addAction, getAllActions} from "../services/actionService";
export async function all(req: Request, res: Response, next: NextFunction) : Promise<void> {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const { actions, pagination } = await getAllActions(Number(page), Number(pageSize));

    res.status(200).json({
      data: actions,
      pagination,
    });
  } catch (error) {
    next(error);
  }
}

export async function add(req: Request, res: Response, next: NextFunction) : Promise<void> {
  try {
    const typeActionId = Number(req.body.typeActionId);
    const createAction = await addAction(typeActionId)
    if (createAction) {
      res.status(200).json({message : "Action ajouté avec succès."});
    } else {
      res.status(404).json({error: 'typeAction is empty'});
    }
  } catch (error) {
    next(error);
  }
}
