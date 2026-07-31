export default function LoadingHash({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 font-display ${className}`}>
      <span className="animate-spin-slow inline-block text-4xl leading-none sm:text-5xl">#</span>
      <span className="text-4xl tracking-wide sm:text-5xl">ash</span>
    </div>
  );
}
