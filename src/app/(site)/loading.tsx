import { DualArc } from "@/components/ui/dual-arc";

/** Shown while a page's server data (Firebase, reviews) streams in. */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <DualArc className="size-14 text-brand" />
    </div>
  );
}
