import { InfinityLoader } from "@/components/ui/infinity-loader";

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <InfinityLoader size={56} />
    </div>
  );
}
