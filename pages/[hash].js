export async function getServerSideProps({ params, req }) {
  const purposeHeader = req.headers["purpose"];
  const { hash } = params;

  if (shouldBlockRequest(purposeHeader, hash)) {
    return { props: {} };
  }

  const originalUrl = await fetchOriginalUrl(hash);

  return {
    redirect: {
      destination: originalUrl || "/",
      permanent: Boolean(originalUrl),
    },
  };
}

export default function Page() {
  return <div>Redirecionando...</div>;
}

function shouldBlockRequest(purposeHeader, hash) {
  return purposeHeader === "prefetch" || hash.length > 6;
}

async function fetchOriginalUrl(hash) {
  const API_URL = process.env.API_URL;
  if (!API_URL) {
    console.error("API_URL is not defined.");
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/shortener/${hash}`);

    if (!response.ok) {
      console.warn(
        `Fail to search URL by following hash ${hash}: ${response.status}`,
      );
      return null;
    }

    const { original_url } = await response.json();
    return original_url || null;
  } catch (error) {
    console.error("Error to search URL: ", error);
    return null;
  }
}
