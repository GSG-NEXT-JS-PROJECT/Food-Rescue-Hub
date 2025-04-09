import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <AlertCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Page Not Found</h1>
        <p className="max-w-[500px] text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/donations">Browse Donations</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
