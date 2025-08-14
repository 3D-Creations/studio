
"use server";

import { revalidatePath } from "next/cache";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";

export async function addCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
   if (!name || !description) {
    throw new Error("Missing required form fields.");
  }
  await addDoc(collection(db, "productCategories"), {
    name,
    description,
  });
  revalidatePath("/admin/manage-products");
  revalidatePath("/products");
}


export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const hint = formData.get("hint") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const image = formData.get("image") as File;

  if (!name || !hint || !description || !categoryId || !image || !price) {
    throw new Error("Missing required form fields.");
  }
  
  const uniqueFileName = `${Date.now()}-${image.name}`;
  const imageRef = ref(storage, `products/${uniqueFileName}`);
  await uploadBytes(imageRef, image);

  const imageUrl = await getDownloadURL(imageRef);

  const productsCollectionRef = collection(db, `productCategories/${categoryId}/products`);
  await addDoc(productsCollectionRef, {
    name: name,
    hint: hint,
    description: description,
    price: price,
    image: imageUrl,
  });

  revalidatePath("/products");
  revalidatePath("/admin/manage-products");
}

export async function updateProduct(categoryId: string, productId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const hint = formData.get("hint") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const image = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existingImageUrl") as string;

  if (!name || !hint || !description || !categoryId || !productId || !price) {
    throw new Error("Missing required form fields.");
  }

  const productDocRef = doc(db, `productCategories/${categoryId}/products/${productId}`);
  let imageUrl = existingImageUrl;

  if (image && image.size > 0) {
    // A new image has been uploaded
    // 1. Upload new image
    const uniqueFileName = `${Date.now()}-${image.name}`;
    const newImageRef = ref(storage, `products/${uniqueFileName}`);
    await uploadBytes(newImageRef, image);
    imageUrl = await getDownloadURL(newImageRef);

    // 2. Delete old image if it exists
    if (existingImageUrl) {
      try {
        const oldImageRef = ref(storage, existingImageUrl);
        await deleteObject(oldImageRef);
      } catch (error: any) {
        if (error.code !== 'storage/object-not-found') {
          console.warn("Could not delete old product image:", error);
        }
      }
    }
  }

  // 3. Update Firestore document
  await updateDoc(productDocRef, {
    name,
    hint,
    description,
    price,
    image: imageUrl,
  });

  // 4. Revalidate paths
  revalidatePath("/products");
  revalidatePath("/admin/manage-products");
}


export async function deleteProduct(categoryId: string, productId: string, imageUrl?: string) {
    if (!categoryId || !productId) {
        throw new Error("Missing category or product ID.");
    }
    
    const productDocRef = doc(db, `productCategories/${categoryId}/products/${productId}`);
    await deleteDoc(productDocRef);

    // Delete the image from storage if a URL is provided
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error: any) {
         if (error.code !== 'storage/object-not-found') {
            console.error("Error deleting image from storage:", error);
            // We don't re-throw, just log it. Deleting the DB entry is more critical.
        }
      }
    }
    
    revalidatePath("/products");
    revalidatePath("/admin/manage-products");
}

