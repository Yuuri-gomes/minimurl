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

  async function handleUrlShortening(originalUrlForm) {
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
      resetForm();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOriginalUrl(shortUrlForm) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/v1/shortener/unshorten-url?short_url=${encodeURIComponent(extractShortCode(shortUrlForm))}`,
      );

      if (!response.ok) throw new Error("Failed to unshorten URL");

      const data = await response.json();

      if (data.original_url) {
        setFormState({
          shortUrl: shortUrlForm,
          originalUrl: data.original_url,
          isReadOnly: true,
        });
      }
    } catch (error) {
      console.error(error);
      resetForm();
      showAlert(
        "Erro",
        "Ocorreu um erro ao desencurtar a URL. Tente novamente.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUrlClickCounter(shortUrl) {
    setIsLoading(true);
    shortUrl = extractShortCode(shortUrl);
    try {
      const response = await fetch(
        `/api/v1/shortener/clicks-counter?shortUrl=${encodeURIComponent(shortUrl)}`,
      );

      if (!response.ok) throw new Error("Failed to get url counter clicks!");
      const data = await response.json();
      return data.clicks;
    } catch (error) {
      console.error(error);
      showAlert(
        "Erro",
        "A URL informada não existe. Verifique e tente novamente.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setFormState({ shortUrl: "", originalUrl: "", isReadOnly: false });
  }

  function extractShortCode(url) {
    const match = url.match(/minimurl\.com\.br\/?(.*)/);
    return match ? match[1] : null;
  }

  return {
    formState,
    isLoading,
    setFormState,
    handleUrlShortening,
    handleOriginalUrl,
    handleUrlClickCounter,
    resetForm,
    showAlert,
  };
}
