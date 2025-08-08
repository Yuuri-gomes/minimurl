import Head from "next/head";
import Main from "components/UI/Main";
import { client, toHtml, toPlainText } from "infra/config/prismic/prismic";

export default function Post({ post }) {
  const title = toPlainText(post.data.title);
  const subtitle = toPlainText(post.data.subtitle);
  const content = toHtml(post.data.content);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subtitle} />
      </Head>

      <Main>
        <div className="flex flex-col items-center justify-center dark:bg-gray-900 p-4 max-w-5xl w-11/12 rounded-lg text-gray-100">
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="italic text-gray-500 text-base mt-2 mb-4">
                {subtitle}
              </p>
            )}
          </header>

          <section
            className="prose prose-lg prose-invert dark:prose-invert max-w-none w-full text-left prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-p:text-gray-700 dark:prose-p:text-gray-300"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </Main>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await client.getAllByType("post", { pageSize: 100 });
  const paths = posts.map((post) => ({ params: { uid: post.uid } }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const options = preview ? { ...previewData } : {};

  try {
    const post = await client.getByUID("post", params.uid, options);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
