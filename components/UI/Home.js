import Logo from "components/UI/Logo";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import dotEnv from "dotenv";
dotEnv.config();

export default function Home() {
  const [formState, setFormState] = useState({
    shortUrl: "",
    originalUrl: "",
    isReadOnly: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const showAlert = (title, html, icon = "success", timer = 2000) => {
    Swal.fire({ title, html, icon, timer, timerProgressBar: true });
  };

  const formAction = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const originalUrlForm = formData.get("original_url");

    try {
      const response = await fetch("/api/v1/shortener/create", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ original_url: originalUrlForm }),
      });

      if (!response.ok) throw new Error("Failed to create short URL");

      const data = await response.json();
      if (data.short_code) {
        setFormState({
          shortUrl: process.env.NEXT_PUBLIC_API_URL
            ? `${process.env.NEXT_PUBLIC_API_URL}/${data.short_code}`
            : `https://minimurl.com.br/${data.short_code}`,
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formState.shortUrl);
      showAlert("Sucesso", "URL copiada para a área de transferência");
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    formRef.current?.reset();
    setFormState({ shortUrl: "", originalUrl: "", isReadOnly: false });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 p-4">
      <Logo />
      <div className="w-full max-w-md">
        <form onSubmit={formAction} ref={formRef}>
          <input
            type="url"
            required
            value={
              formState.isReadOnly ? formState.shortUrl : formState.originalUrl
            }
            readOnly={formState.isReadOnly}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                originalUrl: event.target.value,
              }))
            }
            placeholder="Cole sua URL aqui..."
            name="original_url"
            aria-label="URL original"
            className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type={formState.isReadOnly ? "button" : "submit"}
            onClick={formState.isReadOnly ? handleCopy : undefined}
            disabled={isLoading}
            className="w-full mt-4 p-3 text-lg bg-blue-500 text-gray-100 rounded-full shadow-md hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {isLoading
              ? "Processando..."
              : formState.isReadOnly
                ? "Copiar"
                : "Encurtar"}
          </button>
        </form>
        {formState.shortUrl && (
          <div className="w-full">
            <p className="mt-4 text-lg text-gray-100 w-full h-auto">
              URL original:{" "}
              <a
                href={formState.shortUrl}
                className="text-blue-500 inline-block max-w-full whitespace-normal break-words no-underline"
                target="_blank"
              >
                {formState.originalUrl}
              </a>
            </p>
            <button
              onClick={resetForm}
              className="mt-4 p-3 text-lg bg-gray-500 text-gray-100 rounded-full shadow-md hover:bg-gray-600 transition-all"
            >
              Encurtar outra URL
            </button>
          </div>
        )}
      </div>
      <footer className="mt-10 text-gray-300 text-xs">
        <p>
          © {new Date().getFullYear()} minimurl.com.br - Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
}
