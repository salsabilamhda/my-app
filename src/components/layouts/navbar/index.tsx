import Image from "next/image"; // Import komponen Image
import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data }: any = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__brand}>MyApp</div>

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}
              
              {/* --- MODIFIKASI: Menampilkan foto profil Google --- */}
              {data.user?.image && (
                <Image
                  width={32}
                  height={32}
                  src={data.user.image}
                  alt={data.user.fullname}
                  className={styles.navbar__user__image}
                />
              )}
              {/* -------------------------------------------------- */}
            </div>
            
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;