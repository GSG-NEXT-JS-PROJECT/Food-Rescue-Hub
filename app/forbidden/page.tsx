import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <ShieldAlert className="h-10 w-10 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          Access Forbidden
        </h1>
        <p className="max-w-[500px] text-muted-foreground">
          Sorry, you don&apos;t have permission to access this page. If you believe
          this is an error, please contact support.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
