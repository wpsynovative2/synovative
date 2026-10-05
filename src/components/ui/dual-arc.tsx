import { cn } from "@/lib/utils";

/**
 * Brand loader: two arcs of a ring spinning. Takes its colour from
 * `currentColor` (e.g. `text-brand`) and its size from `size-*`; set
 * `--duration` in `style` to change the speed.
 */
function DualArc({
  className,
  style,
  "aria-label": label = "Loading…",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
      <style>{`
        @keyframes loading-ui-dual-arc-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div
        role="status"
        aria-label={label}
        className={cn(
          "rounded-full border-[5px] border-transparent border-y-current",
          className,
        )}
        style={{
          animationName: "loading-ui-dual-arc-spin",
          animationDuration: "var(--duration, 1s)",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          ...style,
        }}
        {...props}
      />
    </>
  );
}

export { DualArc };

export default DualArc;
