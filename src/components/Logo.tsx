export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display ${className}`}>
      <span aria-hidden className="text-[1.4em] leading-none">
        #
      </span>
      <span className="tracking-[0.15em]">HASH</span>
    </span>
  );
}
