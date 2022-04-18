import { Router } from 'express';
import { create, getByCollection, filter } from '../controllers/art.controller';
import passport from 'passport';

const router = Router();

router.post('/create', passport.authenticate('jwt', { session: false }), create);
router.get('/get/collection/:id', getByCollection);
router.post('/filter', filter);

export default router;
