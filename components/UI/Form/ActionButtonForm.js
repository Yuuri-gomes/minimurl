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
      className="w-full mt-4 p-3 text-lg bg-blue-500 text-gray-100 rounded-full shadow-md hover:bg-blue-600 transition-all disabled:opacity-50"
    >
      {getButtonText()}
    </button>
  );
}
