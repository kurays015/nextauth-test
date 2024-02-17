import watchUrl from "@/lib/watchUrl";
import Link from "next/link";
import EpisodeNumber from "./EpisodeNumber";

export default function FilteredEpisodes({ filteredEpisodes, info }) {
  return (
    <div className="grid grid-cols-5 gap-2 my-5 max-h-96 overflow-auto scrollbar-gray customSm:grid-cols-5 customSemiMd:grid-cols-6 customSemiMd2:grid-cols-7 md:grid-cols-8 lg:grid-cols-9 xl:grid-cols-12">
      {filteredEpisodes.map(episode => (
        <EpisodeNumber key={episode.id} {...episode} info={info} />
      ))}
    </div>
  );
}
