import { useRef } from "react";
import { useUrlShortener } from "hooks/useUrlShortener";
import URLInput from "components/UI/Form/URLInput";
import ActionButton from "components/UI/Form/ActionButtonForm";

export default function URLForm({
  onFormSubmit,
  isLoading,
  setFormState,
  formState,
  buttonMode,
}) {
  const formRef = useRef();
  const { showAlert } = useUrlShortener();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        buttonMode === "shorten" ? formState.shortUrl : formState.originalUrl,
      );
      showAlert("Sucesso", "URL copiada para a área de transferência");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setFormState((prev) => ({ ...prev, originalUrl: event.target.value }));
  };

  return (
    <form onSubmit={onFormSubmit} ref={formRef} className="w-full">
      <URLInput
        value={
          formState.isReadOnly && buttonMode === "shorten"
            ? formState.shortUrl
            : formState.originalUrl
        }
        isReadOnly={formState.isReadOnly}
        onChange={handleInputChange}
        placeholder={
          buttonMode === "shorten"
            ? "Cole a URL para encurtar..."
            : "Cole a URL encurtada para expandir..."
        }
        name={buttonMode === "shorten" ? "original_url" : "short_url"}
      />

      <ActionButton
        isReadOnly={formState.isReadOnly}
        isLoading={isLoading}
        onClick={formState.isReadOnly ? handleCopy : undefined}
        mode={buttonMode}
      />
    </form>
  );
}
