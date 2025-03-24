export default function ActionButton({ isReadOnly, isLoading, onClick, mode }) {
  const buttonTexts = {
    loading: "Processando...",
    copy: "Copiar",
    shorten: "Encurtar",
    unshorten: "Desencurtar",
  };

  const getButtonText = () => {
    if (isLoading) return buttonTexts.loading;
    if (isReadOnly) return buttonTexts.copy;
    return buttonTexts[mode];
  };

  return (
    <button
      type={isReadOnly ? "button" : "submit"}
      onClick={onClick}
      disabled={isLoading}
      className="w-full mt-4 p-3 text-lg bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
      aria-live={isLoading ? "polite" : "off"}
      aria-disabled={isLoading}
    >
      {isLoading ? "Carregando..." : getButtonText()}
    </button>
  );
}
