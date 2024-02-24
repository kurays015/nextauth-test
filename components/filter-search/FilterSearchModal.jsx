import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { filters } from "@/lib/advance-search";
import { FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import FilterOptions from "./FilterOptions";
import { useState } from "react";
import { useMetaContext } from "@/app/hooks/useMetaContext";
import Link from "next/link";

export default function FilterSearchModal() {
  const [open, setOpen] = useState(false);
  const [isRadioSelected, setIsRadioSelected] = useState(false);
  const { params } = useMetaContext();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="self-center">
        <Button onClick={() => setIsRadioSelected(false)}>
          <FaFilter className="text-slate-300 cursor-pointer text-3xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-700">
        <DialogHeader>
          <DialogTitle className="text-center text-amber-300 customSm:mt-2 customSemiMd:my-0">
            Anime filter advance search
          </DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <form>
              {filters.map(filter => (
                <FilterOptions
                  key={filter.title}
                  {...filter}
                  params={params}
                  setIsRadioSelected={setIsRadioSelected}
                />
              ))}
            </form>
          </div>
        </div>
        <Link
          onClick={() => setOpen(false)}
          href={params.toString() && "/search"}
          className="font-semibold text-slate-300 tracking-wider text-center text-sm"
        >
          Clear filter
        </Link>
        <DialogFooter>
          <Button
            className="font-semibold text-white tracking-wider"
            disabled={!isRadioSelected}
            type="submit"
            variant="outline"
            onClick={() => {
              setOpen(false);
              params.delete("query");
              router.push(`?${params}`);
            }}
          >
            Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
