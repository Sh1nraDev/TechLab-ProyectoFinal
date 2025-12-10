import { db } from '../firebase/config.js';
import { ProductModel } from '../models/product.model.js';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';

const collectionName = 'products';

export const getAllProducts = async () => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => new ProductModel({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
    const docRef = doc(db, collectionName, id);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      return null;
    }
    return new ProductModel({ id: docSnapshot.id, ...docSnapshot.data() });
};

export const createNewProduct = async (productData) => {
    if (!productData.name || !productData.price) {
      throw new Error('Faltan datos obligatorios: name o price');
    }
    const productCol = collection(db, collectionName);
    const docRef = await addDoc(productCol, {
        name: productData.name,
        description: productData.description || "",
        stock: Number(productData.stock) || 0,
        price: Number(productData.price),
        category: productData.category || "General"   
    })
    
    return new ProductModel({ id: docRef.id, ...productData });
}

export const deleteProductById = async (id) => {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    return null;
  }
  await deleteDoc(docRef);
  return true;
};  

export const updateProductById = async (id, productData) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, productData);
  const updatedDoc = await getDoc(docRef);
  return new ProductModel({ id: updatedDoc.id, ...updatedDoc.data() });
};  

