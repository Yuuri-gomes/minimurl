import Main from "components/UI/Main";
import URLForm from "components/UI/Form/URLForm";
import URLResult from "components/UI/Form/URLResult";
import { useUrlShortener } from "hooks/useUrlShortener";

export default function UnshortenURLPage() {
  const { formState, isLoading, setFormState, handleOriginalUrl, resetForm } =
    useUrlShortener();

  const formAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await handleOriginalUrl(formData.get("short_url"));
  };

  return (
    <Main>
      <div className="flex flex-col items-center justify-center dark:bg-gray-900 p-4 max-w-5xl w-11/12 rounded-lg text-gray-100">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-3xl font-semibold">Desencurtar URL</h2>
        </div>
        <p className="text-gray-300 mb-6">
          Digite a URL encurtada para verificar a página de destino.
        </p>
        <div className="w-full max-w-md flex justify-center items-center flex-col p-4">
          <URLForm
            onFormSubmit={formAction}
            isLoading={isLoading}
            setFormState={setFormState}
            formState={formState}
            buttonMode="unshorten"
          />
          <URLResult
            formState={formState}
            onReset={resetForm}
            buttonMode="unshorten"
          />
        </div>
      </div>
    </Main>
  );
}
