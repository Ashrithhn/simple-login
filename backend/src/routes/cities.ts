/**
 * City API routes.
 */

import { Router } from 'express';
import { listCities, getCity } from '../controllers/citiesController';

const router = Router();

router.get('/', listCities);
router.get('/:id', getCity);

export default router;
