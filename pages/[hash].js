const PURPOSE_HEADER = "purpose";
const PROTOCOL_HEADER = "x-forwarded-proto";
const DEFAULT_PROTOCOL = "https";
const PREFETCH_VALUE = "prefetch";
const MIN_HASH_LENGTH = 6;
const DEFAULT_REDIRECT = "/";

export async function getServerSideProps({ params, req }) {
  const headers = req.headers;
  const purposeHeader = headers[PURPOSE_HEADER];
  const { hash } = params;

  if (!hash || hash.length < MIN_HASH_LENGTH) {
    return redirectToDefault();
  }

  if (shouldBlockRequest(purposeHeader, hash)) {
    return redirectToDefault();
  }

  const originalUrl = await fetchOriginalUrl(hash, headers);

  return {
    redirect: {
      destination: originalUrl || DEFAULT_REDIRECT,
      permanent: Boolean(originalUrl),
    },
  };
}

export default function Page() {
  return <div>Redirecionando...</div>;
}

function redirectToDefault() {
  return {
    redirect: {
      destination: DEFAULT_REDIRECT,
      permanent: false,
    },
  };
}

function shouldBlockRequest(purposeHeader, hash) {
  return purposeHeader === PREFETCH_VALUE || hash.length > MIN_HASH_LENGTH;
}

async function fetchOriginalUrl(hash, headers) {
  try {
    const response = await fetch(buildServiceEndpoint(hash, headers));

    if (!response.ok) {
      console.warn(`Fail to search URL for hash ${hash}: ${response.status}`);
      return null;
    }

    const { original_url } = await response.json();
    return original_url || null;
  } catch (error) {
    console.error("Error searching for URL:", error);
    return null;
  }
}

function buildServiceEndpoint(hash, headers) {
  const protocol = headers[PROTOCOL_HEADER] || DEFAULT_PROTOCOL;
  const host = headers.host;
  return `${protocol}://${host}/api/v1/shortener/${hash}`;
}
