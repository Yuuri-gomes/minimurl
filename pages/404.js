// pages/404.js
import Head from "next/head";
import Link from "next/link";
import Main from "components/UI/Main";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 | Página não encontrada</title>
      </Head>

      <Main>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <p className="text-lg mt-4 text-gray-600 dark:text-gray-300">
            Ops! Não encontramos a página que você procurava.
          </p>
          <Link
            href="/"
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:no-underline transition no-underline"
          >
            Voltar para a Home
          </Link>
        </div>
      </Main>
    </>
  );
}
