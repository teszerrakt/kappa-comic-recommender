import { useState } from "react";
import fallbackImage from "../Assets/fallback-image.png";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleError = (): void => {
    setIsError(true);
  };

  if (isError) {
    return <img src={fallbackImage} alt={alt} {...props} />;
  }

  return (
    <img src={src} alt={alt} onError={handleError} {...props} />
  );
};

export default Image;
