import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({subsets: ['latin'], weight: ['600']})

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-sky-600 from sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", poppins.className)}>🔐 Auth</h1>
        <p className="text-white text-lg">Authentication Service</p>
        <div>
          <LoginButton>
            <Button variant='secondary' size='lg' >Sign In</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
