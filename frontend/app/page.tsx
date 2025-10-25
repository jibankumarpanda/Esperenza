
import { Marquee3D } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <Hero />
      <div className="bg-slate-50">
        <Features />
      </div>
      <Impact />
      <Marquee3D/>
    </main>
  );
}
