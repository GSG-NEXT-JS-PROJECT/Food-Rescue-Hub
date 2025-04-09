import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Lock className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Authentication Required
        </h1>
        <p className="max-w-[500px] text-muted-foreground">
          You need to be logged in to access this page. Please sign in or create
          an account to continue.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/sign-in">Log In</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
