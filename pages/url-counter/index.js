import { useRef, useState } from "react";
import Main from "components/UI/Main";
import { useUrlShortener } from "hooks/useUrlShortener";

export default function UrlClickCounter() {
  const { handleUrlClickCounter, isLoading } = useUrlShortener();
  const formRef = useRef();
  const [url, setUrl] = useState("");
  const [clicks, setClicks] = useState(null);

  const handleCheckClicks = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const urlClickCounter = await handleUrlClickCounter(
      formData.get("short_url"),
    );
    setClicks(urlClickCounter);
  };

  return (
    <Main>
      <div className="flex flex-col bg-gray-900 p-6 rounded-lg text-gray-100 max-w-5xl mx-auto w-11/12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-3xl font-semibold">Contador de Cliques da URL</h2>
        </div>
        <p className="text-gray-300 mb-6">
          Digite a URL curta abaixo para acompanhar quantos cliques ela recebeu.
        </p>
        <div className="flex flex-col gap-2 mb-4">
          <form onSubmit={handleCheckClicks} ref={formRef}>
            <input
              type="url"
              placeholder="Digite aqui sua URL encurtada"
              value={url}
              required
              name="short_url"
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-4  border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
            <button
              type="submit"
              className="w-full mt-4 p-3 text-lg bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
            >
              {isLoading ? "Processando..." : "Contar Cliques"}
            </button>
          </form>
        </div>
        {clicks && (
          <p className="text-xl font-bold mt-4">
            Total de Cliques: <span className="text-blue-400">{clicks}</span>
          </p>
        )}
        <p className="text-gray-500 text-sm mt-4">
          Exemplo: https://minimurl.com.br/qAsx8
        </p>
      </div>
    </Main>
  );
}
