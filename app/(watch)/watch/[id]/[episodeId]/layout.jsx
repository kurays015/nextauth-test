import EpisodesAndChaptersContainer from "@/components/infos/episodes-and-chapters/EpisodesAndChaptersContainer";
import EpisodesAndChaptersSkeleton from "@/components/skeletons/EpisodesAndChaptersSkeleton";
import Link from "next/link";
import { Suspense } from "react";

export default async function layout({ children, params }) {
  return (
    <div className="max-w-7xl mx-auto">
      {children}
      <Suspense fallback={<EpisodesAndChaptersSkeleton />}>
        <EpisodesAndChaptersContainer params={params} />
      </Suspense>
      <p className="text-slate-300 text-center text-sm mt-16">
        Not working?{" "}
        <Link
          className="text-blue-500 "
          href={`/embedded?id=${params.id}&episodeId=${params.episodeId}`}
        >
          Click here
        </Link>
      </p>
    </div>
  );
}
