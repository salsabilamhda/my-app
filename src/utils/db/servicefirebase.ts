import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc, // Penambahan updateDoc (Gambar 1)
  serverTimestamp,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

// --- FUNGSI TAMBAHAN SESUAI GAMBAR ---
export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    callback({
      status: "error",
      message: "Email already exists",
    });
  } else {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      userData.role = "member";

      const dataToSave = {
        ...userData,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "users"), dataToSave);

      callback({
        status: "success",
        message: "Register sukses",
      });
    } catch (error: any) {
      callback({
        status: "error",
        message: error.message,
      });
    }
  }
}

// --- PENAMBAHAN FUNGSI signInWithGoogle (Gambar 2) ---
// Ganti nama signInWithGoogle menjadi loginWithOAuth agar reusable
export async function loginWithOAuth(userData: any, callback: any) {
  try {
    const q = query(collection(db, "users"), where("email", "==", userData.email));
    const querySnapshot = await getDocs(q);
    const data: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      // User lama: update profil (termasuk avatar terbaru)
      userData.role = data[0].role;
      userData.updatedAt = serverTimestamp();
      await updateDoc(doc(db, "users", data[0].id), userData);
      callback({ status: true, data: userData });
    } else {
      // User baru
      userData.role = "member";
      userData.createdAt = serverTimestamp();
      await addDoc(collection(db, "users"), userData);
      callback({ status: true, data: userData });
    }
  } catch (error: any) {
    callback({ status: false });
  }
}

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data();
}