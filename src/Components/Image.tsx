import { useState } from "react";
import fallbackImage from "../Assets/fallback-image.png";
import { cn } from "../lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className, ...props }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleError = (): void => {
    setIsError(true);
  };

  if (isError) {
    return <img src={fallbackImage} alt={alt} loading="lazy" className={className} {...props} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        className,
      )}
      {...props}
    />
  );
};

export default Image;
