import { Router } from 'express';
import { createCollection, getAll, getByUser, remove, getById } from '../controllers/collection.controller';
import passport from 'passport';

const router = Router();

router.post('/create', passport.authenticate('jwt', { session: false }), createCollection);
router.get('/get', getAll);
router.get('/get/user/:id', getByUser);
router.get('/get/:id', getById);
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), remove);

export default router;
