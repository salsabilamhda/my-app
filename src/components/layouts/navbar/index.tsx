import styles from './navbar.module.css'; // Menggunakan alias styles

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      {/* Menggunakan class global .big dari globals.css */}
      <div className="big">
        Navbar
      </div>
    </div>
  );
};

export default Navbar;