
"use server";

import { revalidatePath } from "next/cache";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, doc, deleteDoc, updateDoc, serverTimestamp, query, where, getDocs, writeBatch, limit } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { ProductMedia } from "./page";

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

async function uploadFile(file: File, folder: string): Promise<ProductMedia> {
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const fileRef = ref(storage, `${folder}/${uniqueFileName}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    return { url, type };
}


export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const hint = formData.get("hint") as string;
  const description = formData.get("description") as string;
  const categoryId = formData.get("categoryId") as string;
  const price = formData.get("price") as string;
  const size = formData.get("size") as string;
  const isFeatured = formData.get("isFeatured") === "true";
  const files = formData.getAll("files") as File[];

  if (!name || !hint || !description || !categoryId || files.length === 0 || !price) {
    throw new Error("Missing required form fields.");
  }
  
  if (isFeatured) {
    const featuredQuery = query(collection(db, `productCategories/${categoryId}/products`), where("isFeatured", "==", true), limit(10));
    const featuredSnapshot = await getDocs(featuredQuery);
    if (featuredSnapshot.size >= 10) {
      throw new Error("You can only feature a maximum of 10 products.");
    }
  }

  const uploadPromises = files.map(file => uploadFile(file, 'products'));
  const media = await Promise.all(uploadPromises);

  const productsCollectionRef = collection(db, `productCategories/${categoryId}/products`);
  await addDoc(productsCollectionRef, {
    name: name,
    hint: hint,
    description: description,
    price: price,
    size: size,
    isFeatured: isFeatured,
    media: media,
    createdAt: serverTimestamp(),
  });

  revalidatePath("/products");
  revalidatePath("/admin/manage-products");
}

export async function updateProduct(categoryId: string, productId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const hint = formData.get("hint") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const size = formData.get("size") as string;
  const isFeatured = formData.get("isFeatured") === "true";
  const newFiles = formData.getAll("files") as File[];
  const existingMediaString = formData.get("existingMedia") as string;

  if (!name || !hint || !description || !categoryId || !productId || !price) {
    throw new Error("Missing required form fields.");
  }

  const productDocRef = doc(db, `productCategories/${categoryId}/products/${productId}`);
  
  if (isFeatured) {
    const featuredQuery = query(collection(db, `productCategories/${categoryId}/products`), where("isFeatured", "==", true), limit(10));
    const featuredSnapshot = await getDocs(featuredQuery);
    const isCurrentlyFeatured = featuredSnapshot.docs.some(doc => doc.id === productId);
    if (featuredSnapshot.size >= 10 && !isCurrentlyFeatured) {
      throw new Error("You can only feature a maximum of 10 products.");
    }
  }

  let existingMedia: ProductMedia[] = [];
  if (existingMediaString) {
      try {
        existingMedia = JSON.parse(existingMediaString);
      } catch (e) {
        console.error("Failed to parse existing media", e);
      }
  }

  // Upload new files
  const uploadPromises = newFiles.map(file => uploadFile(file, 'products'));
  const newMedia = await Promise.all(uploadPromises);

  const finalMedia = [...existingMedia, ...newMedia];

  await updateDoc(productDocRef, {
    name,
    hint,
    description,
    price,
    size,
    isFeatured,
    media: finalMedia,
  });

  revalidatePath("/products");
  revalidatePath("/admin/manage-products");
}


export async function deleteProduct(categoryId: string, productId: string, mediaJson?: string) {
    if (!categoryId || !productId) {
        throw new Error("Missing category or product ID.");
    }
    
    const productDocRef = doc(db, `productCategories/${categoryId}/products/${productId}`);
    await deleteDoc(productDocRef);

    if (mediaJson) {
        try {
            const media: ProductMedia[] = JSON.parse(mediaJson);
            const deletePromises = media.map(async (m) => {
                try {
                    const imageRef = ref(storage, m.url);
                    await deleteObject(imageRef);
                } catch (error: any) {
                    if (error.code !== 'storage/object-not-found') {
                        console.error("Error deleting a media file from storage:", error);
                    }
                }
            });
            await Promise.all(deletePromises);
        } catch(e) {
            console.error("Could not parse media for deletion", e)
        }
    }
    
    revalidatePath("/products");
    revalidatePath("/admin/manage-products");
}



