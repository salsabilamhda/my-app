import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EditorPage = () => {
  const { data, status }: any = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      push("/auth/login");
    } else if (status === "authenticated" && data.user.role !== "editor" && data.user.role !== "admin") {
      push("/"); // Redirect jika bukan editor/admin
    }
  }, [data, status, push]);

  if (status === "loading") return <p>Checking permissions...</p>;

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Dashboard Editor</h1>
      <p>Selamat datang, <strong>{data?.user?.fullname}</strong>!</p>
      <div style={{ border: "1px dashed #333", padding: "20px", marginTop: "20px" }}>
        <p>Halaman ini khusus untuk manajemen konten.</p>
      </div>
    </div>
  );
};

export default EditorPage;