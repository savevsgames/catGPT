import express from 'express';
import { chatWithCat } from '../../controllers/gpt-controller.js';

const router = express.Router();

router.post('/chat', chatWithCat);

export default router;