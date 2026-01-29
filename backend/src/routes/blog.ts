/**
 * Blog API routes: list, get one, create (admin).
 */

import { Router } from 'express';
import * as blogController from '../controllers/blogController';
import { requireAuth, requireAdmin } from '../middlewares/auth';

const router = Router();

router.get('/', blogController.listPosts);
router.get('/:id', blogController.getPost);
router.post('/', requireAuth, requireAdmin, blogController.createPost);

export default router;