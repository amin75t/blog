import { ShowArticle } from "./(show_blogs)/showArticle"

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  return <ShowArticle searchParams={searchParams} />
}