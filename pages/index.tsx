import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { notionClient } from "services/notionClient";
import type { PartialRecipe } from "types";

type HomeProps = {
  recipes: PartialRecipe[];
};

export default function Home({ recipes }: HomeProps) {
  return (
    <div>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="List of Recipes in spanish" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Check-out the amazing recipes available for you!!</h1>
        <ul>
          {recipes.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/recipe/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  let recipes: PartialRecipe[] = [];

  try {
    const response = await notionClient.blocks.children.list({
      block_id: process.env.PAGE_ID,
    });

    response.results.forEach((block) => {
      if ("child_page" in block) {
        recipes.push({ title: block.child_page.title, id: block.id });
      }
    });
  } catch (error: unknown) {
    console.error(
      "Something went wrong fetching the list of recipes titles",
      error
    );
  }

  return {
    props: {
      recipes,
    },
  };
};
