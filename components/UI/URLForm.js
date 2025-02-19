import { useRef } from "react";
import { useUrlShortener } from "hooks/useUrlShortener";

export default function URLForm({
  onFormSubmit,
  isLoading,
  setFormState,
  formState,
}) {
  const formRef = useRef();

  const { showAlert } = useUrlShortener();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formState.shortUrl);
      showAlert("Sucesso", `URL copiada para a área de transferência`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setFormState((prev) => ({ ...prev, originalUrl: event.target.value }));
  };

  return (
    <form onSubmit={onFormSubmit} ref={formRef} className="w-full">
      <input
        type="url"
        required
        value={
          formState.isReadOnly ? formState.shortUrl : formState.originalUrl
        }
        readOnly={formState.isReadOnly}
        onChange={handleInputChange}
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
  );
}
