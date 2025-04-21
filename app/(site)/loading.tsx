import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Loader2 className="h-16 w-16 animate-spin text-green-600" />
        <h1 className="text-2xl font-medium">Loading...</h1>
        <p className="max-w-[500px] text-muted-foreground">
          Please wait while we prepare your Food Rescue Hub experience.
        </p>
      </div>
    </div>
  )
}
