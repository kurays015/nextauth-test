import WatchAndInfoError from "@/components/WatchAndInfoError";
import MainInfoContent from "@/components/infos/MainInfoContent";
import { providerUrl } from "@/lib/infoUrl";

async function getInfo(id, searchParams) {
  const { providerId, tmdbParams } = searchParams;
  const tmdb = `?type=${tmdbParams}`;
  const anilistManga = "?provider=mangadex";
  const params = providerId === "tmdb" ? tmdb : anilistManga;

  try {
    const res = await fetch(
      `${process.env.SOURCE_URL6}${providerUrl(providerId, id, params)}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Error fetching anime/manga/movie/series info.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function AllInfo({ params, searchParams }) {
  const allInfo = await getInfo(params.id, searchParams);
  // console.log(allInfo);
  if (!allInfo) return <WatchAndInfoError />;

  return <MainInfoContent infoData={allInfo} id={params.id} />;
}
