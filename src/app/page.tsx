import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className=" w-screen h-screen flex justify-center items-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
  from-[#202020] to-[#061c2d] "
    >
      <Link href="/dashboard">
        <Button size="lg" variant="outline">
          Go to Dashboard
        </Button>
      </Link>
    </main>
  );
}
