function getUrlInfo(formState, buttonMode) {
  const { originalUrl, shortUrl } = formState;

  const isShortenMode = buttonMode === "shorten";

  return {
    redirectUrl: isShortenMode ? originalUrl : shortUrl,
    buttonTitle: isShortenMode ? "Encurtar outra URL" : "Desencurtar outra URL",
    resultTitle: isShortenMode ? "URL original" : "URL curta",
    resultValue: isShortenMode ? originalUrl : shortUrl,
  };
}

export default function URLResult({ formState, onReset, buttonMode }) {
  if (!formState.shortUrl) return null;

  const { redirectUrl, buttonTitle, resultTitle, resultValue } = getUrlInfo(
    formState,
    buttonMode,
  );

  return (
    <div className="w-full">
      <p className="mt-4 text-lg text-gray-100 w-full h-auto">
        {resultTitle}:{" "}
        <a
          href={redirectUrl}
          className="text-blue-500 inline-block max-w-full whitespace-normal break-words no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {resultValue}
        </a>
      </p>
      <button
        onClick={onReset}
        className="mt-4 p-3 text-lg bg-gray-500 text-gray-100 rounded-full shadow-md hover:bg-gray-600 transition-all"
      >
        {buttonTitle}
      </button>
    </div>
  );
}
