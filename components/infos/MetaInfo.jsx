import MainInfoContent from "./MainInfoContent";
import WatchAndInfoError from "../WatchAndInfoError";

export async function getInfoData(id, searchParams) {
  const { type } = searchParams;

  if (!type) return;

  const url =
    type === "anime"
      ? `${process.env.SOURCE_URL8}/meta/anilist/info/${id}`
      : `${process.env.TMDB_BASE_URL}/3/${type}/${id}?api_key=${process.env.API_KEY}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("Error fetching info.");

    return res.json();
  } catch (error) {
    console.log(error);
  }
}
export default async function MetaInfo({ id, searchParams }) {
  const info = await getInfoData(id, searchParams);

  if (!info) return <WatchAndInfoError />;

  return <MainInfoContent info={info} searchParams={searchParams} />;
}
