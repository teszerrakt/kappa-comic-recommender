import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StarRatingProps {
  rating?: number
  totalStars?: number
  size?: "sm" | "md" | "lg"
  readOnly?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  ({ 
    rating = 0, 
    totalStars = 5, 
    size = "md", 
    readOnly = false, 
    onRatingChange,
    className,
    ...props 
  }, ref) => {
    const [hoverRating, setHoverRating] = React.useState(0)
    const [currentRating, setCurrentRating] = React.useState(rating)

    React.useEffect(() => {
      setCurrentRating(rating)
    }, [rating])

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6", 
      lg: "h-8 w-8"
    }

    const handleStarClick = (starValue: number) => {
      if (readOnly) return
      
      const newRating = starValue === currentRating ? 0 : starValue
      setCurrentRating(newRating)
      onRatingChange?.(newRating)
    }

    const handleStarHover = (starValue: number) => {
      if (readOnly) return
      setHoverRating(starValue)
    }

    const handleMouseLeave = () => {
      if (readOnly) return
      setHoverRating(0)
    }

    const getStarState = (starIndex: number) => {
      const starValue = starIndex + 1
      const activeRating = hoverRating || currentRating
      
      if (starValue <= activeRating) {
        return "filled"
      }
      return "empty"
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {Array.from({ length: totalStars }, (_, i) => {
          const starState = getStarState(i)
          const starValue = i + 1
          
          return (
            <button
              key={i}
              type="button"
              className={cn(
                "transition-colors focus:outline-none disabled:pointer-events-none",
                !readOnly && "hover:scale-110 transform transition-transform duration-150"
              )}
              disabled={readOnly}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              aria-label={`Rate ${starValue} star${starValue !== 1 ? 's' : ''}`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "transition-colors duration-150",
                  starState === "filled" 
                    ? "fill-kappa-green stroke-kappa-green" 
                    : "fill-transparent stroke-kappa-gray hover:stroke-kappa-green",
                  !readOnly && "cursor-pointer"
                )}
              />
            </button>
          )
        })}
      </div>
    )
  }
)

StarRating.displayName = "StarRating"

export { StarRating }