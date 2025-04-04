import { cn } from "@/lib/utils"
import { Heart, Loader2, CircleDollarSign, HeartHandshake } from "lucide-react"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  variant?: "default" | "primary" | "secondary" | "charity"
  type?: "circle" | "heart" | "donation" | "handshake"
  fullPage?: boolean
}

export function Spinner({
  size = "md",
  className,
  variant = "primary",
  type = "circle",
  fullPage = false,
}: SpinnerProps) {
  // Size mappings
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  }

  // Variant mappings for colors
  const variantClasses = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    charity: "text-rose-500", // Warm, charity-like color
  }

  // Render the appropriate spinner type
  const renderSpinner = () => {
    switch (type) {
      case "heart":
        return <Heart className={cn("animate-pulse", sizeClasses[size], variantClasses[variant], className)} />
      case "donation":
        return (
          <div className="relative">
            <CircleDollarSign
              className={cn("animate-spin-slow", sizeClasses[size], variantClasses[variant], className)}
            />
          </div>
        )
      case "handshake":
        return (
          <HeartHandshake
            className={cn("animate-bounce-gentle", sizeClasses[size], variantClasses[variant], className)}
          />
        )
      case "circle":
      default:
        return <Loader2 className={cn("animate-spin", sizeClasses[size], variantClasses[variant], className)} />
    }
  }

  // If fullPage is true, center the spinner on the page
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-2">
          {renderSpinner()}
          <span className="text-sm font-medium text-muted-foreground">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      {renderSpinner()}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Utility component for page-centered spinner
export function PageSpinner({
  size = "xl",
  variant = "charity",
  type = "heart",
  message = "Processing your donation...",
}: {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "primary" | "secondary" | "charity"
  type?: "circle" | "heart" | "donation" | "handshake"
  message?: string
}) {
  return (
    <div className="h-[50vh] w-full flex flex-col items-center justify-center gap-4">
      <Spinner size={size} variant={variant} type={type} />
      {message && <p className="text-muted-foreground text-center">{message}</p>}
    </div>
  )
}

