import { Router } from 'express';
import {all} from '../controllers/typeActionController';
const router = Router();

router.get('/', all);

export default router;
