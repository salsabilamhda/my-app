import { useSession } from "next-auth/react";
import styles from "./profile.module.css";

const HalamanProfile = () => {
  const { data, status }: any = useSession();

  // Loading state jika session sedang dicek
  if (status === "loading") {
    return <div className={styles.container}>Memuat data...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        {/* Inisial Nama untuk Avatar */}
        <div className={styles.avatar}>
          {data?.user?.fullname ? data.user.fullname.charAt(0) : "U"}
        </div>

        <p className={styles.title}>User Profile</p>
        <h1 className={styles.welcomeText}>
          {data?.user?.fullname || "Pengguna"}
        </h1>
        <p className={styles.emailText}>{data?.user?.email}</p>

        <span className={styles.badge}>Akun Terverifikasi</span>

        <div className={styles.divider}></div>

        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Terima kasih telah bergabung dengan aplikasi kami.
        </p>
      </div>
    </div>
  );
};

export default HalamanProfile;