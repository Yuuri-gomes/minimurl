export default function URLResult({ formState, onReset }) {
  return (
    formState.shortUrl && (
      <div className="w-full">
        <p className="mt-4 text-lg text-gray-100 w-full h-auto">
          URL original:{" "}
          <a
            href={formState.shortUrl}
            className="text-blue-500 inline-block max-w-full whitespace-normal break-words no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {formState.originalUrl}
          </a>
        </p>
        <button
          onClick={onReset}
          className="mt-4 p-3 text-lg bg-gray-500 text-gray-100 rounded-full shadow-md hover:bg-gray-600 transition-all"
        >
          Encurtar outra URL
        </button>
      </div>
    )
  );
}
