import Link from "next/link";
import style from "../../auth/login/login.module.scss"; 
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react"; 

const Tampilanlogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter(); 

  const callbackUrl: any = query.callbackUrl || "/"; 
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };

  return (
    <div className={style.login}>
      {error && <p className={style.login__error}>{error}</p>}
      
      <h1 className={style.login__title}>Halaman login</h1>
      <div className={style.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={style.login__form__item}>
            <label htmlFor="email" className={style.login__form__item__label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.login__form__item__input}
            />
          </div>

          <div className={style.login__form__item}>
            <label htmlFor="Password" className={style.login__form__item__label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={style.login__form__item__input}
            />
          </div>

          {/* Tombol Login Utama */}
          <button 
            type="submit" 
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

          <br />
          <br />

          {/* Tombol Sign in with Google */}
          <button
            type="button" 
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            Sign in with Google
          </button>

          {/* --- TOMBOL GITHUB (Opsional) --- */}
          <button
            type="button" 
            onClick={() => signIn("github", { callbackUrl, redirect: false })}
            className={style.login__form__item__button}
            style={{ marginTop: "10px", backgroundColor: "#333" }} 
            disabled={isLoading}
          >
            Sign in with GitHub
          </button>

        </form>

        <br />
        <p className={style.login_form__item_text}>
          tidak punya akun? {" "}
          <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Tampilanlogin;