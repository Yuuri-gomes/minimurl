import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error("Erro ao carregar AdSense", error);
    }
  }, []);

  return (
    <div className="my-4 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client=""
        data-ad-slot=""
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
