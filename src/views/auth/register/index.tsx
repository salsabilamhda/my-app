import Link from "next/link";
import styles from "./register.module.css";

const TampilanRegister = () => {
  return (
    <div className={styles.register}>
      <div className={styles.card}>
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input type="text" className={styles.inputField} placeholder="Username" />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input type="email" className={styles.inputField} placeholder="Email" />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input type="password" className={styles.inputField} placeholder="Password" />
        </div>

        <button className={styles.buttonRegister}>Daftar</button>

        <p className="text-center text-sm mt-4">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;