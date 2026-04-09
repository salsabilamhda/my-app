import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  serverTimestamp, // Gunakan serverTimestamp untuk createdAt yang akurat
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function,
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email),
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Jika data ditemukan, berarti email sudah terdaftar
    callback({
      status: "error",
      message: "Email already exists",
    });
  } else {
    // Email belum ada -> Proses pendaftaran
    try {
      // 1. Enkripsi password (Tugas Poin 2)
      userData.password = await bcrypt.hash(userData.password, 10);
      
      // 2. Tambahkan Role default "member" (Tugas Poin 3)
      userData.role = "member";
      
      // 3. Tambahkan field tambahan sesuai Struktur Database
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

// Fungsi pembantu lainnya tetap ada
export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data();
}