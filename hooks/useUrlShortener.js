import { useState } from "react";
import Swal from "sweetalert2";

export function useUrlShortener() {
  const [formState, setFormState] = useState({
    shortUrl: "",
    originalUrl: "",
    isReadOnly: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const showAlert = (title, html, icon = "success", timer = 2000) => {
    Swal.fire({ title, html, icon, timer, timerProgressBar: true });
  };

  const handleUrlShortening = async (originalUrlForm) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/v1/shortener/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ original_url: originalUrlForm }),
      });

      if (!response.ok) throw new Error("Failed to create short URL");

      const data = await response.json();
      if (data.short_code) {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "https://minimurl.com.br";
        setFormState({
          shortUrl: `${apiUrl}/${data.short_code}`,
          originalUrl: data.original_url,
          isReadOnly: true,
        });
      }
    } catch (error) {
      console.error(error);
      showAlert(
        "Erro",
        "Ocorreu um erro ao encurtar a URL. Tente novamente.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormState({ shortUrl: "", originalUrl: "", isReadOnly: false });
  };

  return {
    formState,
    isLoading,
    setFormState,
    handleUrlShortening,
    resetForm,
    showAlert,
  };
}
