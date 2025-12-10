// Creo la ruta para products
import { Router } from 'express';
import { getProducts, getProductById, createNewProduct, deleteProductById, updateProductById } from '../controller/product.controller.js'; // Importo el controlador para products


const router = Router();

// Defino las rutas para products
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/create', createNewProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;