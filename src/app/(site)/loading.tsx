import { InfinityLoader } from "@/components/ui/infinity-loader";

/** Shown while a page's server data (Firebase, reviews) streams in. */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <InfinityLoader size={72} />
    </div>
  );
}
