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
export async function signInWithGoogle(userData: any, callback: any) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email)
    );

    const querySnapshot = await getDocs(q);
    const data: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      // USER SUDAH ADA: Kita tambahkan updatedAt untuk mencatat login terakhir
      userData.role = data[0].role;
      userData.updatedAt = serverTimestamp(); // Tambahkan login terakhir
      
      await updateDoc(doc(db, "users", data[0].id), userData);
      callback({
        status: true,
        message: "User updated and logged in with Google",
        data: userData,
      });
    } else {
      // USER BARU: Kita tambahkan createdAt seperti pada fungsi signUp
      userData.role = "member";
      userData.createdAt = serverTimestamp(); // Tambahkan tanggal buat akun
      
      await addDoc(collection(db, "users"), userData);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: userData,
      });
    }
  } catch (error: any) {
    callback({
      status: false,
      message: "Failed to register user with Google",
    });
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