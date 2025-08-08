import { createClient } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import Main from "components/UI/Main";

const POSTS_PER_PAGE = 6;

export default function Posts({ posts, currentPage, totalPages }) {
  return (
    <Main>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Blog
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.uid}
              href={`/posts/${post.uid}`}
              className="block rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 hover:no-underline"
            >
              <div className="text-xl font-semibold text-blue-600 mb-2 line-clamp-2">
                <PrismicRichText field={post.data.title} />
              </div>
              <p className="text-sm text-gray-500">
                Publicado em:{" "}
                {new Date(post.first_publication_date).toLocaleDateString(
                  "pt-BR",
                )}
              </p>
            </Link>
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-center gap-2 mt-12 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`/posts?page=${i + 1}`}
              className={`px-4 py-2 border text-sm font-medium rounded-lg transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page || "1", 10);

  const client = createClient(process.env.NEXT_PUBLIC_PRISMIC_REPO_NAME, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  const response = await client.getByType("post", {
    page,
    pageSize: POSTS_PER_PAGE,
    orderings: {
      field: "document.first_publication_date",
      direction: "desc",
    },
  });

  return {
    props: {
      posts: response.results,
      currentPage: page,
      totalPages: response.total_pages,
    },
  };
}
