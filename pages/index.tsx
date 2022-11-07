import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { recipesClient } from "services/recipesClient";
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
  const recipes = await recipesClient.getPartialRecipes();

  return {
    props: {
      recipes,
    },
  };
};
