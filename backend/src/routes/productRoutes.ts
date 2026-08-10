// backend/src/routes/productRoutes.ts
import { Router } from 'express';
import { getAllProducts, createProduct } from '../handlers/productHandler';

const router = Router();

router.get('/', getAllProducts);
router.post('/', createProduct); // برای ادمین جهت اضافه کردن محصول

export default router;
