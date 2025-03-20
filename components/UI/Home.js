import URLForm from "components/UI/Form/URLForm";
import URLResult from "components/UI/Form/URLResult";
import Benefits from "components/UI/Benefits";
import { useUrlShortener } from "hooks/useUrlShortener";

export default function Home() {
  const { formState, isLoading, setFormState, handleUrlShortening, resetForm } =
    useUrlShortener();

  const formAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await handleUrlShortening(formData.get("original_url"));
  };

  return (
    <div className="flex flex-col items-center justify-center dark:bg-gray-800 p-4">
      <div className="w-full max-w-md flex justify-center items-center flex-col p-4">
        <URLForm
          onFormSubmit={formAction}
          isLoading={isLoading}
          setFormState={setFormState}
          formState={formState}
          buttonMode="shorten"
        />
        <URLResult
          formState={formState}
          onReset={resetForm}
          buttonMode="shorten"
        />
      </div>
      <Benefits />
    </div>
  );
}
