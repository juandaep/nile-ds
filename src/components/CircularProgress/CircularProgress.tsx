import type { CircularProgressProps } from "./CircularProgress.types"
import classes from "./circularprogress.module.css"

export const CircularProgress = ({
  size = "md",
  colorScheme = "Default",
  className = "",
}: CircularProgressProps) => {

    const config = {
        sm: { dimension: 16, strokeWidth: 2, radius: 5.5 }, // (5.5*2)+2 = 13 (Aman di 16)
        md: { dimension: 24, strokeWidth: 3, radius: 8 },   // (8*2)+3 = 19 (Aman di 24)
        lg: { dimension: 32, strokeWidth: 4, radius: 11 },  // (11*2)+4 = 26 (Aman di 32)
        xl: { dimension: 40, strokeWidth: 5, radius: 14 },  // (14*2)+5 = 33 (Aman di 40)
    }[size] || { dimension: 24, strokeWidth: 3, radius: 8 }

    const center = config.dimension / 2
    const circumference = 2 * Math.PI * config.radius
    const dashArray = `${circumference * 0.25} ${circumference * 0.75}`

  const combinedClasses = [
    classes.container,
    classes[colorScheme],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      role="progressbar"
      aria-busy="true"
      className={combinedClasses}>
        <svg
        width={config.dimension}
        height={config.dimension}
        viewBox={`0 0 ${config.dimension} ${config.dimension}`}
        className={classes.spinner}
        shapeRendering="geometricPrecision">
            <circle
            className={classes.track}
            cx={center}
            cy={center}
            r={config.radius}
            fill="none"
            strokeWidth={config.strokeWidth} 
            />

            <circle
            className={classes.thumb}
            cx={center}
            cy={center}
            r={config.radius}
            fill="none"
            strokeWidth={config.strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap="round"
            />
        </svg>
      </div>
  )
}

export default CircularProgress
