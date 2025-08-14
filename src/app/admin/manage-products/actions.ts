
"use server";

import { revalidatePath } from "next/cache";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const hint = formData.get("hint") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const image = formData.get("image") as File;

  if (!name || !hint || !description || !categoryId || !image) {
    throw new Error("Missing required form fields.");
  }
  
  // 1. Upload image to Firebase Storage
  const uniqueFileName = `${Date.now()}-${image.name}`;
  const imageRef = ref(storage, `products/${uniqueFileName}`);
  await uploadBytes(imageRef, image);

  // 2. Get the public URL of the uploaded image
  const imageUrl = await getDownloadURL(imageRef);

  // 3. Add product data to Firestore
  const productsCollectionRef = collection(db, `productCategories/${categoryId}/products`);
  await addDoc(productsCollectionRef, {
    name: name,
    hint: hint,
    description: description,
    image: imageUrl,
  });

  // 4. Revalidate the paths to show the new product
  revalidatePath("/products");
  revalidatePath("/admin/manage-products");
}

export async function deleteProduct(categoryId: string, productId: string) {
    if (!categoryId || !productId) {
        throw new Error("Missing category or product ID.");
    }
    const productDocRef = doc(db, `productCategories/${categoryId}/products/${productId}`);
    await deleteDoc(productDocRef);

    // Note: This does not delete the image from storage to avoid complexity.
    // A production system might have a cloud function to handle this.
    
    revalidatePath("/products");
    revalidatePath("/admin/manage-products");
}
