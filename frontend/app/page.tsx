import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <Hero />
     <Features/>
     <Impact/>
    </div>
  );
}
