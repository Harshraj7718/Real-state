import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-16 text-white sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Logo className="text-3xl" />
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HASH Real Estate. All rights reserved.</p>
          <p className="font-accent text-sm text-white/70 italic">Invest. Live. Earn. Scale.</p>
        </div>
        <p className="mt-6 font-body text-xs text-white/40">
          Created and designed by Harsh Raj
        </p>
      </div>
    </footer>
  );
}
