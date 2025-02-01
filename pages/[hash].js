import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HashPage() {
  const router = useRouter();
  const { hash } = router.query;

  useEffect(() => {
    if (typeof hash === "string") {
      fetch(`api/v1/shortener/${hash}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.originalUrl) {
            window.location.href = data.originalUrl;
          } else {
            router.replace("/404");
          }
        });
    }
  }, [hash, router]);

  return (
    <>
      <p>Redirecionando...</p>;
    </>
  );
}
