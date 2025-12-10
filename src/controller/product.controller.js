import { doc } from 'firebase/firestore';
import * as productService from '../services/product.service.js';

export const getProducts = async (req, res) => {
  try {
    // Lógica para obtener todos los productos
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

export const getProductById = async (req, res) => {
    try {
      const {productId} = req.params;
      // Lógica para obtener un producto por ID
        const product = await productService.getProductById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

export const createNewProduct = async (req, res) => {
    try {
        const newProduct = await productService.createNewProduct(req.body);
        res.status(201).json({msj: 'Producto creado exitosamente', product: newProduct});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const {productId} = req.params;
        const deleted = await productService.deleteProductById(productId);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({msj: 'Producto eliminado exitosamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
}

export const updateProductById = async(req, res) => {
    try {
        const {productId} = req.params;
        const updatedProduct = await productService.updateProductById(productId, req.body);
        
        if(!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
    }
        res.status(200).json({msj: 'Producto actualizado exitosamente', product: updatedProduct});
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
}