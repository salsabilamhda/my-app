import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

// --- FUNGSI TAMBAHAN SESUAI GAMBAR (Line 25-38) ---
export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data) {
    return data[0];
  } else {
    return null;
  }
}
// --------------------------------------------------

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

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data();
}