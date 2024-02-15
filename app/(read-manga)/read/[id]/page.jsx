import ChaptersButton from "@/components/ChaptersButton";
import ChaptersContent from "@/components/ChaptersContent";

async function getChaptersPages(id, searchParams, comickChapters) {
  const { chapter, readId } = searchParams;
  const firstChapterReadId = comickChapters.chapters[0].id;
  try {
    const res = await fetch(
      `${process.env.ANIFY_URL}/pages/${id}/${chapter ? chapter : 1}/comick/${
        readId ? readId : firstChapterReadId
      }`
    );
    if (!res.ok) {
      throw new Error("Error fetching chapter pages.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getChapters(id) {
  try {
    const res = await fetch(`${process.env.ANIFY_URL}/chapters/${id}`);
    if (!res.ok) {
      throw new Error("Error fetching chapters.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function MangaMainContent({ params, searchParams }) {
  const providers = await getChapters(params.id);
  const comickChapters = providers.find(
    provider => provider.providerId === "comick"
  );
  const chaptersPages = await getChaptersPages(
    params.id,
    searchParams,
    comickChapters
  );

  return (
    <div className="text-white">
      <ChaptersButton chapters={comickChapters.chapters} />
      {chaptersPages ? (
        <ChaptersContent chaptersContent={chaptersPages} />
      ) : (
        <h1>No content available at the moment, try again later.</h1>
      )}
      <ChaptersButton chapters={comickChapters.chapters} />
    </div>
  );
}
